/**
 * @module WorkbenchModule
 */
import {
    Component,
} from '@angular/core';
import {modelutilities} from '../../services/modelutilities.service';
import {backend} from '../../services/backend.service';
import {metadata} from '../../services/metadata.service';
import {language} from '../../services/language.service';
import {toast} from "../../services/toast.service";


@Component({
    selector: 'validation-rules-manager',
    templateUrl: '../templates/validationrulesmanager.html',
})
export class ValidationRulesManager {
    public rules: any[] = [];
    public _backup_rules: any[] = [];
    public _current_module: string;
    public _current_rule: string;
    public _current_rule_data: any = {};
    public logicoperator_options = [];
    public current_tab = 'details';

    constructor(
        public backend: backend,
        public metadata: metadata,
        public language: language,
        public utils: modelutilities,
        public toast: toast,
    ) {
        this.logicoperator_options = this.language.getDisplayOptions('logicoperators_dom', true);
    }

    get modules() {
        return this.metadata.getModules().sort();
    }

    set current_module(val: string) {
        this._current_module = val;
        this.rules = this.metadata.getModuleValidations(val);
        this.rules.sort((a, b) => a.name.localeCompare(b.name))
        this.copyRulesToBackup();
        this.current_rule = null;
    }

    get current_module() {
        return this._current_module;
    }

    get current_rule() {
        return this._current_rule;
    }

    set current_rule(val: string) {
        this._current_rule = val;
        this._current_rule_data = this.getCurrentRuleData();
    }

    get current_rule_data() {
        return this._current_rule_data;
    }

    public getCurrentRuleData() {
        if (this.rules) {
            const rule = this.rules.find((e) => {
                return e.id == this._current_rule;
            });
            if (!!rule?.onevents && typeof rule.onevents === "string") {
                rule.onevents = rule.onevents.split(',');
            }
            return rule;
        } else {
            return '';
        }
    }

    public removeCurrentValidationRule() {
        this.backend.deleteRequest('configuration/spiceui/core/modelvalidations/' + this.current_rule).subscribe(
            (success) => {
                // this.broadcast.broadcastMessage('metadata.updatefieldsets', data);
                this.toast.sendToast('rule removed');
                this.removeRule(this.current_rule);
                return true;
            },
            (error) => {
                this.toast.sendToast('removing rule failed!');
                console.error(error);
                return false;
            }
        );
    }

    public save() {
        let data = this.current_rule_data;

        if (Array.isArray(data.onevents)) {
            data.onevents = data.onevents.join(',');
        }

        this.backend.postRequest('configuration/spiceui/core/modelvalidations', {}, data).subscribe(
            (success) => {
                this.current_rule_data.isnewrecord = false;

                let idx = this._backup_rules.findIndex((e) => {
                    return e.id == this._current_rule;
                });
                this._backup_rules[idx] = {...data};

                this.rules.sort((a, b) => a.name.localeCompare(b.name));

                this.toast.sendToast('changes saved');
            },
            (error) => {
                this.toast.sendAlert('saving changes failed!');
                console.error(error);
            }
        );
    }

    public cancel() {
        if (this.current_rule_data.isnewrecord) {
            // remove it...
            this.removeRule(this.current_rule);
        } else {
            // reset changes...
            this.resetCurrentRuleData();
        }
    }

    public addValidationRule() {
        this.rules.push({
            id: this.utils.generateGuid(),
            module: this.current_module,
            active: 1,
            actions: [],
            conditions: [],
            isnewrecord: true,
        });
        this.current_rule = this.rules[this.rules.length - 1].id;
    }

    public removeRule(id: string = this.current_rule): boolean {
        let idx = this.rules.findIndex((e) => {
            return e.id == id;
        });
        this.rules.splice(idx, 1);
        if (this.current_rule == id) {
            this.current_rule = null;
        }
        return true;
    }

    public resetCurrentRuleData() {
        let data = this._backup_rules.find((e) => {
            return e.id == this._current_rule;
        });
        this._current_rule_data = {...data};
    }

    public copyRulesToBackup() {
        this._backup_rules = [];
        for (let r of this.rules) {
            this._backup_rules.push({...r});
        }
    }
}


import {Pipe} from '@angular/core';
import {JsonPipe} from '@angular/common';

// tslint:disable-next-line:max-classes-per-file
@Pipe({name: 'maybejson'})
export class MaybeJsonPipe extends JsonPipe {
    public transform(value): string {
        if (value instanceof Array || value instanceof Object) {
            return super.transform(value);
        } else {
            return value;
        }
    }
}
