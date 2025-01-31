/**
 * @module services
 */
import {EventEmitter, Injectable, Injector} from "@angular/core";
import {metadata} from "./metadata.service";
import {Observable, Subject, of} from "rxjs";
import {footer} from "./footer.service";
import {toast} from "./toast.service";
import {language} from "./language.service";

/**
 * handles the modals in the system
 */
@Injectable()
export class modal {

    /**
     * keeps an array of modals that are currently open
     */
    public modalsArray: any[] = [];

    /**
     * keeps an array of the objects rendered as modals
     */
    public modalsObject = {};

    constructor(public metadata: metadata, public footer: footer, public toast: toast, public language: language) {
        window.addEventListener("keyup", (event) => {
            if (event.keyCode === 27 && this.modalsArray.length) {
                event.stopImmediatePropagation();
                let wrapperComponent = this.modalsArray[this.modalsArray.length - 1].wrapper;
                if (wrapperComponent.instance.escKey && (!wrapperComponent.instance.childComponent.instance.onModalEscX || wrapperComponent.instance.childComponent.instance.onModalEscX() !== false)) {
                    wrapperComponent.destroy();
                }
            }
        });
    }

    /*
    * tries to open a modal and if the component is not found or no componentfactory is found returns an error as the subject and prompts a toast.
    */
    public openModal(componentName, escKey = true, injector?: Injector, blurBackdrop?: boolean) {
        // SPICEUI-35
        if (this.metadata.checkComponent(componentName)) {
            let retSubjectXY = new Subject<any>();
            this.metadata.addComponentDirect("SystemModalWrapper", this.footer.modalcontainer).subscribe(wrapperComponent => {
                let newModal: any = {};
                newModal.wrapper = wrapperComponent;
                newModal.blurBackdrop = blurBackdrop;
                wrapperComponent.instance.escKey = escKey;
                this.modalsArray.push(newModal);
                this.modalsObject[newModal.modalId] = newModal;
                this.metadata.addComponentDirect(componentName, wrapperComponent.instance.target, injector).subscribe(
                    component => {
                        component.instance.self = wrapperComponent;
                        newModal.component = component;
                        wrapperComponent.instance.childComponent = component;
                        retSubjectXY.next(component);
                        retSubjectXY.complete();
                    },
                    e => {
                        // remove the wrapper
                        this.removeModal(wrapperComponent);
                        // send a toast
                        this.sendError(componentName);
                        retSubjectXY.error(e);
                        retSubjectXY.complete();
                    });
                wrapperComponent.instance.zIndex = this.modalsArray.length * 2 + 1;
            });
            return retSubjectXY.asObservable();
        } else {
            this.sendError(componentName);
            return of(false);
        }
    }



    /**
     * sends an error toast if the modal compopnent that shoudk be rendered is not defined int he repository
     *
     * @param componentName the name of the component hat was intended to be rendered in the modal
     */
    public sendError(componentName) {
        this.toast.sendToast('Component "' + componentName + '" not found.', "error", "Misconfiguration on the system as the component should have been opened in a modal but is not avilable. Please contact your system administrator.");
    }

    /**
     * Removes a modal from the modals array.
     *
     * @param modalToClose the modal that shoudl be removed from the stack of modals
     */
    public removeModal(modalToClose) { // modalToClose is a reference to angular component
        for (let i = 0; i < this.modalsArray.length; i++) {
            if (this.modalsArray[i].wrapper === modalToClose) {
                this.modalsArray.splice(i, 1);
                break;
            }
        }
    }

    /**
     * Destroys the modal wrapper component. Thereby ngOnDestroy() of the modal wrapper component will be triggered and this will call removeModal()
     *
     * @param modalToClose the modal that should be removed from the stack of modals
     */
    public closeModal(modalToClose) { // modalToClose can be the index in the modal array or the reference to the wrapper component
        if (typeof modalToClose === "number") {
            if (this.modalsArray[modalToClose]) {
                this.modalsArray[modalToClose].wrapper.destroy();
            }
        } else {
            for (let i = 0; i < this.modalsArray.length; i++) {
                if (this.modalsArray[i].wrapper === modalToClose) {
                    this.modalsArray.splice(i, 1);
                    break;
                }
            }
        }
    }

    /**
     * close all open modals
     */
    public closeAllModals() {
        for (let i = this.modalsArray.length - 1; i >= 0; i--) {
            this.modalsArray[i].wrapper.destroy();
        }
    }

    /**
     * a simple getter to check if the backdrop shoudl be displayed
     */
    get backdropVisible() {
        return this.modalsArray.length !== 0;
    }

    /**
     * a simple getter to get the z-index for the backdrop. The backdrop shoudl alwys be rendered right underneath the last visible modal int eh stack
     */
    get backdropZindex() {
        return this.modalsArray.length * 2;
    }

    /**
     * returns a style for the last backdrop
     * used to blur a backdrop if the user is logged out
     */
    get backdropBlurred() {
        if (this.modalsArray.length > 0 && this.modalsArray[this.modalsArray.length - 1].blurBackdrop === true) {
            return 'blur(4px)';
        }
        return 'none';
    }

    /**
     * prompts a dialog
     *
     * @param type the type of the prompts
     * @param text the text in the prompts
     * @param headertext the text for the header
     * @param theme a theme as per slds definition
     * @param defaultvalue ??
     * @param options options to be presented to the user
     * @param optionsAsRadio
     */
    public prompt(type: 'info'|'input'|'input_text'|'input_date'|'confirm', text: string, headertext: string = null, theme: string = 'shade', defaultvalue: string | number = null, options: { value: string, display: string}[] = null, optionsAsRadio?: boolean, regex?: string): Observable<any> {
        let responseSubject = new Subject();
        this.openModal("SystemPrompt").subscribe(component => {
            component.instance.type = type;
            component.instance.text = text;
            component.instance.headertext = headertext;
            component.instance.theme = theme;
            component.instance.value = defaultvalue;
            component.instance.options = options;
            component.instance.regex = regex;
            component.instance.optionsAsRadio = optionsAsRadio;
            component.instance.answer.subscribe(answervalue => {
                responseSubject.next(answervalue); // return the answer
                responseSubject.complete();
            });
        });
        return responseSubject.asObservable();
    }

    /**
     * a shortcut to prompt for a confirm dialog
     *
     * @param textLabel
     * @param headertextLabel
     * @param theme
     */
    public confirm(textLabel: string, headertextLabel: string = null, theme: string = null): Observable<any> {
        return this.prompt('confirm', textLabel, headertextLabel, theme);
    }

    /**
     * a shortcut to prompt for a confirm to delete Record dialog
     *
     * @param text
     * @param headertext
     * @param theme
     */
    public confirmDeleteRecord(): Observable<any> {
        return this.prompt('confirm', this.language.getLabel('LBL_DELETE_RECORD', '', 'long'), this.language.getLabel('LBL_DELETE_RECORD'));
    }

    /**
     * a shortcut to prompt for an input dialog
     *
     * @param text
     * @param headertext
     * @param defaultvalue
     * @param theme
     */
    public input(text: string, headertext: string = null, theme: string = null, defaultvalue: string = null): Observable<any> {
        return this.prompt('input', text, headertext, theme, defaultvalue);
    }

    /**
     * a shortcut to prompt for an info dialog
     *
     * @param text
     * @param headertext
     * @param theme
     */
    public info(text: string, headertext: string = null, theme: string = null): Observable<any> {
        return this.prompt('info', text, headertext, theme);
    }

    /**
     * renders a loading modal if the user is supposed to wait until an async operation completes
     *
     * @param messagelabel
     */
    public await(messagelabel: string = null): EventEmitter<boolean> {
        let stopper = new EventEmitter<boolean>();
        this.openModal('SystemLoadingModal', false).subscribe(component => {
            component.instance.messagelabel = messagelabel;
            stopper.subscribe(() => {
                component.instance.self.destroy();
            });
        });
        return stopper;
    }

}
