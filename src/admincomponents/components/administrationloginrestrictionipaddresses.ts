/**
 * @module AdminComponentsModule
 */
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { backend } from '../../services/backend.service';
import { modal } from '../../services/modal.service';
import { toast } from '../../services/toast.service';
import { take } from 'rxjs/operators';
import { metadata } from '../../services/metadata.service';
import { language } from '../../services/language.service';

/**
 * @ignore
 */
declare var _: any;

@Component({
    selector: 'administration-login-restriction-ip-addresses',
    templateUrl: '../templates/administrationloginrestrictionipaddresses.html'
})
export class AdministrationLoginRestrictionIpAddresses implements OnInit {

    @Input() public color: string;
    @Input() public siblingComponent: AdministrationLoginRestrictionIpAddresses;

    @ViewChild('table', {static: true}) public table: ElementRef;

    public altColor: string;
    public ipAddresses = [];
    public isLoading = false;
    public isAltering = false;
    public isAdding = false;
    public newAddress = '';
    public newDescription = '';
    public addressError = '';

    constructor(public backend: backend, public modal: modal, public toast: toast, public metadata: metadata, public language: language ) { }

    public get isEditing(): boolean {
        return this.isAltering || this.isAdding;
    }

    public ngOnInit() {
        this.altColor = this.color === 'black' ? 'white':'black';
        this.loadIpAddresses();
    }

    public loadIpAddresses() {
        this.isLoading = true;
        this.backend.getRequest('authentication/ipAddresses/'+this.color)
            .pipe(take(1))
            .subscribe(data => {
                this.ipAddresses = data;
                this.sortIpAddresses();
                this.isLoading = false;
            },
            error => {
                this.toast.sendToast('Error loading '+this.color+' listed IP Addresses.', error.error.error.message, 'error');
            });
    }

    public sortIpAddresses() {
        this.ipAddresses = this.ipAddresses.sort((a, b) => this.compareIpAddresses( a, b ));
        this.ipAddresses = this.ipAddresses.sort((a, b) => this.compareIpAddresses( a, b ));
    }

    public compareIpAddresses( a, b ) {
        const num1 = Number(a.address.split(".").map((num) => (`000${num}`).slice(-3) ).join(""));
        const num2 = Number(b.address.split(".").map((num) => (`000${num}`).slice(-3) ).join(""));
        return num1-num2;
    }

    public deleteIpAddresses() {
        let addressesToDelete = [];
        let registeredToRemove: number[] = [];
        this.ipAddresses.forEach( (item, i) => { if ( item.selected ) addressesToDelete.push( i ); });
        if ( addressesToDelete.length ) {
            this.modal.confirm('Remove '+addressesToDelete.length+' IP Addresses? This can not be undone.', 'Remove IP Addresses?', null )
                .pipe(take(1))
                .subscribe( response => {
                    if ( response ) {
                        this.isLoading = true;
                        let numberOfToDo = addressesToDelete.length;
                        addressesToDelete.forEach( ( i ) => {
                            this.backend.deleteRequest( 'authentication/ipAddress/' + this.ipAddresses[i].address )
                                .pipe(take(1))
                                .subscribe( response => {
                                    if( response.success === true ) {
                                        registeredToRemove.push(i);
                                    }
                                    numberOfToDo--;
                                    if( numberOfToDo <= 0 ) {
                                        this._removeFromList(registeredToRemove);
                                        this.isLoading = false;
                                    }
                                },
                                error => () => {
                                    numberOfToDo--;
                                    if( numberOfToDo <= 0 ) {
                                        this._removeFromList(registeredToRemove);
                                        this.isLoading = false;
                                    }
                                    this.toast.sendToast('Error deleting IP Address '+this.ipAddresses[i].address+'.', error.error.error.message, 'error');
                                }
                            );
                        } );
                    } else this.isLoading = false;
                });
        }
    }

    public moveIpAddresses() {
        let addressesToMove = [];
        let registeredToRemove: number[] = [];
        this.ipAddresses.forEach( (item, i) => { if ( item.selected ) addressesToMove.push( i ); });
        if ( addressesToMove.length ) {
            this.modal.confirm( 'Move ' + addressesToMove.length + ' IP Addresses to '+this.altColor+' list?', 'Move IP Addresses?', null )
                .pipe( take( 1 ) )
                .subscribe( response => {
                    let destinationColor = this.color === 'black' ? 'white':'black';
                    this.isLoading = this.siblingComponent.isLoading = true;
                    let numberOfToDo = addressesToMove.length;
                    addressesToMove.forEach( ( i ) => {
                        this.backend.putRequest( 'authentication/ipAddress/' + this.ipAddresses[i].address + '/move/' + destinationColor )
                            .pipe(take(1))
                            .subscribe( response => {
                                if( response.success === true ) {
                                    this.siblingComponent.ipAddresses.push( this.ipAddresses[i] );
                                    this.ipAddresses[i].selected = false;
                                    registeredToRemove.push(i);
                                    this.siblingComponent.sortIpAddresses();
                                }
                                numberOfToDo--;
                                if( numberOfToDo <= 0 ) {
                                    this._removeFromList( registeredToRemove );
                                    this.isLoading = this.siblingComponent.isLoading = false;
                                }
                            },
                            error => () => {
                                numberOfToDo--;
                                if( numberOfToDo <= 0 ) {
                                    this._removeFromList( registeredToRemove );
                                    this.isLoading = this.siblingComponent.isLoading = false;
                                }
                                this.toast.sendToast('Error moving IP Address '+this.ipAddresses[i].address+'.', error.error.error.message, 'error');
                            }
                        );
                    });
                });
        }
    }

    public _removeFromList( registeredToRemove: number[] ): void {
        registeredToRemove = registeredToRemove.sort( (a, b) => a - b );
        for ( let i = registeredToRemove.length - 1; i >= 0; i-- ) {
            this.ipAddresses.splice( registeredToRemove[i], 1 );
        }
    }

    public get checkboxesUsed(): boolean {
        for ( let item of this.ipAddresses ) if ( item?.selected ) return true;
        return false;
    }

    public saveNewAddress() {
        this.checkAddressInput();
        if ( this.addressError ) return;
        this.isLoading = true;
        this.backend.postRequest( 'authentication/ipAddress/' + this.newAddress, null, { color: this.color[0], description: this.newDescription } )
            .pipe(take(1))
            .subscribe( response => {
                this.isLoading = false;
                this.ipAddresses.push(response.data);
                this.sortIpAddresses();
                this.toast.sendToast( 'IP Address ' + this.newAddress + ' added ('+this.color+' listed).', 'success' );
                this.newAddress = '';
                this.newDescription = '';
                this.isAdding = false;
            },
                error => {
                this.toast.sendToast( 'Error saving IP Address.','error', error.error.error.message );
                this.isLoading = false;
                this.isAdding = false;
            });
    }

    public checkAddressInput() {
        if ( !this.newAddress.length ) this.addressError = 'Missing.';
        else {
            this.newAddress = this.sanitizeIpAddress( this.newAddress );
            if( !this.checkIpAddress( this.newAddress ) ) this.addressError = 'Invalid.';
            else if( this.ipAddressIsListed( this.newAddress ) ) this.addressError = 'Already listed.';
            else this.addressError = '';
        }
    }

    public sanitizeIpAddress( ipAddress: string ): string {
        ipAddress = ipAddress.replace(/\s+/g, '');
        let octets = ipAddress.split('.');
        octets.forEach( (octet,i) => { octets[i] = octet.replace(/^0+(?!$)/,''); });
        return octets.join('.');
    }

    public checkIpAddress( ipAddress: string ): boolean {
        let octets = ipAddress.split('.');
        if ( octets.length !== 4 ) return false;
        return !octets.some( octet => {
            if ( !octet.match(/\d+/)) return true;
            if ( parseInt( octet, 10 ) > 255 ) return true;
            return false;
        });
    }

    public ipAddressIsListed( ipAddress: string ): boolean {
        if ( this.ipAddresses.some( item => {
            if ( item.address === ipAddress ) return true;
        }) === true ) return true;
        if ( this.siblingComponent.ipAddresses.some( item => {
            if ( item.address === ipAddress ) return true;
        }) === true ) return true;
        return false;
    }

    public startAdding() {
        this.isAdding = true;
        this.addressError = '';
        this.table.nativeElement.scrollTop = 0;
    }

    public cancelNewAddress() {
        this.isAdding = false;
        this.newAddress = '';
        this.newDescription = '';
    }

}
