/**
 * @module WorkbenchModule
 */
import {
    Component
} from '@angular/core';
import {metadata} from '../../services/metadata.service';
import {modelutilities} from '../../services/modelutilities.service';
import {dictionarymanager} from '../services/dictionarymanager.service';
import {DictionaryDefinition, DictionaryManagerMessage} from "../interfaces/dictionarymanager.interfaces";

@Component({
    templateUrl: '../templates/dictionarymanageradddefinitionmodal.html',
})
export class DictionaryManagerAddDefinitionModal {

    /**
     * reference to the modal self
     */
    public self: any;

    /**
     * the domain definition
     */
    public dictionarydefinition: DictionaryDefinition;

    /**
     * messages collected
     * @private
     */
    public messages: DictionaryManagerMessage[] = [];

    constructor(public dictionarymanager: dictionarymanager, public metadata: metadata, public modelutilities: modelutilities) {
        this.dictionarydefinition = {
            id: this.modelutilities.generateGuid(),
            name: '',
            tablename: '',
            sysdictionary_type: 'module',
            scope: this.dictionarymanager.defaultScope,
            deleted: 0,
            status: 'd'
        };
    }

    /**
     * close the modal
     */
    public close() {
        this.self.destroy();
    }

    /**
     * returns the messages for a specific field
     * @param field
     * @private
     */
    public getMessages(field) {
        return this.messages.filter(m => m.field == field);
    }

    /**
     * check if we can save
     *
     * name and fieldtype are defined and name does not exists yet
     *
     */
    get canSave() {
        this.messages = [];

        if (!this.dictionarydefinition.name) {
            this.messages.push({field: 'name', message: 'name must be entered'});
        }

        if (!this.dictionarydefinition.sysdictionary_type) {
            this.messages.push({field: 'sysdictionary_type', message: 'type must be specified'});
        }

        if (this.dictionarydefinition.sysdictionary_type != 'template' && !this.dictionarydefinition.tablename) {
            this.messages.push({field: 'tablename', message: 'tablename must be entered'});
        }

        if (this.dictionarymanager.dictionarydefinitions.find(d => d.name == this.dictionarydefinition.name)) {
            this.messages.push({field: 'name', message: 'name exists already'});
        }

        if (this.dictionarydefinition.tablename && this.dictionarymanager.dictionarydefinitions.find(d => d.tablename == this.dictionarydefinition.tablename)) {
            this.messages.push({field: 'tablename', message: 'table exists already'});
        }

        if (this.dictionarydefinition.tablename && this.dictionarymanager.reservedwords && this.dictionarymanager.reservedwords.indexOf(this.dictionarydefinition.tablename.toUpperCase()) >= 0) {
            this.messages.push({field: 'tablename', message: 'tablename cannot be used (reserved word)'});
        }

        return this.messages.length == 0;
    }

    /**
     * saves the modal
     */
    public save() {
        if (this.canSave) {
            this.dictionarydefinition.id = this.modelutilities.generateGuid();
            this.dictionarymanager.dictionarydefinitions.push(this.dictionarydefinition);
            this.close();
        }
    }


}
