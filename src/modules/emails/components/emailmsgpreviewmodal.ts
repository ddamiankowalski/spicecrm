/**
 * @module SystemComponents
 */
import {Component, Input} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {language} from '../../../services/language.service';
import {libloader} from '../../../services/libloader.service';

declare var MSGReader: any;

/**
 * a modal that renders and provides a preview for an object
 */
@Component({
    templateUrl: '../templates/emailmsgpreviewmodal.html'
})
export class EmailMSGPreviewModal {

    /**
     * reference to the modal itself
     */
    public self: any = {};

    /**
     * the type of the object that will be passed in
     */
    @Input() public type: string = '';

    /**
     * the name of the object. This is displayed in the header
     */
    @Input() public name: string = '';

    public libsloaded: boolean = false;

    /**
     * the blobURL. This is handled internally. When the data is sent this is created so the object can be rendered in the modal
     */
    public blobUrl: any;

    public msgData: any;

    constructor(public language: language, public sanitizer: DomSanitizer, public libloader: libloader) {

    }

    /**
     * handles closing the modal
     */
    public closeModal() {
        this.self.destroy();
    }

    /**
     * a setter for the data
     *
     * @param data the raw data of the object being passed in. When the data is pased in the bloburl is created
     */
    set data(data) {
        this.libloader.loadLib('msgreader').subscribe(loaded => {
            // let msgReader = new MSGReader(Uint8Array.from(data, c => c.charCodeAt(0)));
            // this.msgData = msgReader.getFileData();
        });
    }

    get subject() {
        if (this.msgData) {
            return this.msgData.subject;
        } else {
            return '';
        }
    }

    get body() {
        if (this.msgData) {
            return this.sanitizer.bypassSecurityTrustHtml(this.msgData.body.replace(/\n/g, "<br/>"));
        } else {
            return '';
        }
    }

    /**
     * translates the type passed in into the proper obejcttype
     */
    get objecttype() {
        if (!this.type) return '';

        let typeArray = this.type.split("/");
        switch (typeArray[0]) {
            case 'audio':
            case 'video':
                return typeArray[0];
            default:
                return 'object';
        }
    }

    /**
     * a download option in teh window that triggers creation of a link elekent and simulates a click. This will prompt the download in the UI
     */
    public download() {
        let a = document.createElement("a");
        document.body.appendChild(a);
        a.href = this.blobUrl;
        a.download = this.name;
        a.click();
        a.remove();
    }

    /**
     * internal function to translate the data to a BLOL URL
     *
     * @param byteCharacters the file data
     * @param contentType the type
     * @param sliceSize optional parameter to change performance
     */
    public datatoBlob(byteCharacters, contentType = '', sliceSize = 512) {
        let byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            let slice = byteCharacters.slice(offset, offset + sliceSize);

            let byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            let byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        let blob = new Blob(byteArrays, {type: contentType});
        return blob;
    }
}
