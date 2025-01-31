/**
 * @module services
 */
import {EventEmitter, Injectable} from '@angular/core';
import {Observable, Subject, of} from 'rxjs';
import {backend} from './backend.service';
import {toast} from './toast.service';
import {language} from './language.service';
import {broadcast} from './broadcast.service';
import {configurationService} from './configuration.service';
import {modal} from './modal.service';
import {session} from './session.service';
import {metadata} from "./metadata.service";

/**
 * @ignore
 */
declare var moment: any;
/**
 * @ignore
 */
declare var _: any;

@Injectable()
export class userpreferences {

    public preferences: any = {
        global: {}
    };
    // toUse is a "shortcut" to preferences.global. For easier code.
    // The user preferences in toUse (like preferences.global) will be available anytime, even when the user hasn´t set the preferences yet.
    // Use toUse, if you need any preference, for example "toUse.dec_sep".
    public toUse: any;

    // unchangedPreferences stores the preferences as they are delivered by the KREST api. Don´t use this, when you need any value (use "toUse" instead).
    // Use this object when the user edits the preferences (record detail view of module "users").
    public unchangedPreferences: any = {
        global: {}
    };

    public preferencesComplete = true; // When false, indicates the need to ask the user for the preferences.

    public defaults = {
        calendar_day_start_hour: '7',
        calendar_day_end_hour: '22',
        currency: -99,
        datef: 'm/d/Y',
        // default_currency_significant_digits: 2,
        currency_significant_digits: 2,
        // default_export_charset: 'UTF-8',
        export_charset: 'UTF-8',
        // default_locale_name_format: 's f l',
        locale_name_format: 's f l',
        dec_sep: '.',
        distance_unit_system: 'METRIC',
        export_delimiter: ',',
        help_icon: 'visible',
        home_assistant: 'visible',
        num_grp_sep: ',',
        reminder_time: -1,
        timef: 'H:i',
        timezone: 'Europe/Vienna',
        week_day_start: 0,
        week_days_count: 5,
    };

    public formats = {nameFormats: [], loaded: false};

    /**
     * an emitter allowing to subscribe to prference changes
     */
    public preferences$: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        public backend: backend,
        public toast: toast,
        public configuration: configurationService,
        public language: language,
        public broadcast: broadcast,
        public modalservice: modal,
        public session: session,
        public metadata: metadata
    ) {
        this.toUse = this.preferences.global;
        // this.retrievePrefsFromConfigService();
        this.broadcast.message$.subscribe(msg => {
            if (msg.messagetype === 'loader.completed' && msg.messagedata === 'loadUserData') {
                this.retrievePrefsFromConfigService()
            };
        });
    }

    public retrievePrefsFromConfigService() {
        let prefs = this.configuration.getData('globaluserpreferences').global;
        this.preferences.global = _.extendOwn(this.preferences.global, prefs);
        this.unchangedPreferences.global = _.clone(prefs);
        this.defaults = _.extendOwn(this.defaults, this.configuration.getData('defaultuserpreferences'));
        if ( !this.unchangedPreferences.global.timezone ) {
            let guessedTimezone = moment.tz.guess();
            this.setPreference('timezone', guessedTimezone, true).subscribe((data: any) => {
                this.toast.sendToast( this.language.getLabel('LBL_TIMEZONE_WAS_SET_TO')+': '+data.timezone, 'success', null,10 );
                this.session.setTimezone( guessedTimezone ); // Let the UI together with all the models and components know about the new configured timezone.
            });
        }

        this.completePreferencesWithDefaults();
        this.session.setTimezone(this.toUse.timezone); // Tell the UI the current time zone.

        // if we have a role set it
        if(this.preferences.global.userrole){
            this.metadata.setActiveRole(this.preferences.global.userrole);
        }
    }

    public getPreferences(loadhandler: Subject<string>) {
        this.loadPreferences().subscribe((ret) => {
            loadhandler.next('getPreferences');
        });
    }

    public loadPreferences(category = 'global'): Observable<any> {
        return of(this.configuration.getData('globaluserpreferences')[category]);

        /*
        let retSubject: Subject<any> = new Subject<any>();
        this.backend.getRequest('module/Users/' + this.session.authData.userId + '/preferences/' + category).subscribe((prefs) => {
            this.preferences[category] = _.extendOwn(this.preferences[category], prefs);
            if (category === 'global') {
                this.unchangedPreferences.global = _.clone(prefs);
                this.completePreferencesWithDefaults();
                this.session.setTimezone(this.toUse.timezone); // Tell the UI the current time zone.
            } else {
                this.unchangedPreferences[category] = _.clone(prefs);
            }
            retSubject.next(prefs);
        });

        return retSubject.asObservable();
        */
    }

    // Completes the global preferences with default values.
    // This case shouldn´t happen, the global preferences of a user should always be set (by the user).
    // Just in case it´s not and to ensure proper work of the UI:
    public completePreferencesWithDefaults() {
        let uncomplete = false;
        _.each(this.defaults, (value, key) => {
            if (typeof this.preferences.global[key] === 'string') {
                if (!this.preferences.global[key]) {
                    this.preferences.global[key] = value;
                    uncomplete = true;
                }
            } else {
                if (this.preferences.global[key] === undefined || this.preferences.global[key] === null) {
                    this.preferences.global[key] = value;
                    uncomplete = true;
                }
            }
        });
        this.preferencesComplete = !uncomplete; // When false, indicates the need to ask the user for the preferences.
    }

    public getPreference(name, category = 'global') {
        try {
            return this.preferences[category][name];
        } catch (e) {
            return false;
        }
    }

    public setPreference(name, value, save = true, category = 'global') {
        if (save) {
            let prefs = {};
            prefs[name] = value;
            const saved = new Subject();
            this.backend.postRequest('module/Users/' + this.session.authData.userId + '/preferences/' + category, {}, prefs).subscribe(response => {

                // set the preference
                if (!this.preferences[category]) this.preferences[category] = {};
                this.preferences[category][name] = value;

                // ToDo: check what this is for
                if (!this.unchangedPreferences[category]) this.unchangedPreferences[category] = {};
                this.unchangedPreferences[category][name] = value;

                this.completePreferencesWithDefaults();
                if (category === 'global' && name === 'timezone') this.session.setTimezone(this.toUse.timezone); // Tell the UI the current time zone.
                saved.next(response);

                // emit the changes
                this.preferences$.emit(prefs);

            }, error => {
                saved.error(error);
            });
            return saved;
        } else {
            if (!this.preferences[category]) this.preferences[category] = {};
            this.preferences[category][name] = value;
            this.completePreferencesWithDefaults();
            if (category === 'global' && name === 'timezone') this.session.setTimezone(this.toUse.timezone); // Tell the UI the current time zone.
        }
        return null;
    }

    public setPreferences(prefs, category = 'global') {
        const saved = new Subject();
        this.backend.postRequest('module/Users/' + this.session.authData.userId + '/preferences/' + category, {}, prefs).subscribe(
            (savedprefs) => {
                for (let prop in this.preferences[category]) {
                    if (savedprefs.hasOwnProperty(prop)) this.preferences[category][prop] = savedprefs[prop];
                    else delete this.preferences[category][prop];
                }
                this.unchangedPreferences[category] = savedprefs;
                this.completePreferencesWithDefaults();
                this.session.setTimezone(this.toUse.timezone); // Tell the UI the current time zone. It might got changed.
                saved.next(true);

                // emit the changes
                this.preferences$.emit(prefs);
            },
            (error) => {
                saved.error(error);
            }
        );
        return saved;
    }

    public getDateFormat() {
        if (this.toUse.datef) {
            let dateFormat: string = this.toUse.datef;
            return this.jsDateFormat2momentDateFormat(dateFormat);
        } else {
            return 'YYYY-MM-DD';
        }
    }

    public jsDateFormat2momentDateFormat(format) {
        return format.replace('Y', 'YYYY').replace('m', 'MM').replace('d', 'DD');
    }

    public getTimeFormat() {
        if (this.toUse.timef) {
            let timeFormat: string = this.toUse.timef;
            return this.jsTimeFormat2momentTimeFormat(timeFormat);
        } else {
            return 'hh:mm';
        }
    }

    public jsTimeFormat2momentTimeFormat(format) {
        return format.replace('H', 'HH').replace('h', 'hh').replace('i', 'mm');
    }

    public needFormats() {
        if (!this.formats.loaded) {
            this.loadFormats();
        }
    }

    public loadFormats(): Observable<any> {
        let retSubject: Subject<boolean> = new Subject<boolean>();

        this.formats.nameFormats.length = 0;
        this.formats.loaded = false;
        this.backend.getRequest('module/Users/preferencesformats').subscribe((formats) => {
            if (Array.isArray(formats.nameFormats)) {
                for (let item of formats.nameFormats) {
                    this.formats.nameFormats.push({name: item, example: this.translateNameFormat(item)});
                }
            }
            this.formats.loaded = true;
            retSubject.next(true);
        });

        return retSubject.asObservable();
    }

    public translateNameFormat(format: string): string {
        let translation = '';
        for (let i = 0; i < format.length; i++) {
            switch (format.charAt(i)) {
                case 't':
                    translation += this.language.getLabel('LBL_LOCALE_NAME_EXAMPLE_TITLE');
                    break;
                case 'f':
                    translation += this.language.getLabel('LBL_LOCALE_NAME_EXAMPLE_FIRST');
                    break;
                case 'l':
                    translation += this.language.getLabel('LBL_LOCALE_NAME_EXAMPLE_LAST');
                    break;
                case 's':
                    translation += this.language.getLabel('LBL_LOCALE_NAME_EXAMPLE_SALUTATION');
                    break;
                default:
                    translation += format.charAt(i);
            }
        }
        return translation;
    }

    /*
     * formatting functions
     * http://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-money-in-javascript
     */
    // public formatMoney(i, n = this.toUse.currency_significant_digits, x = 3, grpSep = this.toUse.num_grp_sep, decSep = this.toUse.dec_sep) {
    public formatMoney(i, n = this.toUse.currency_significant_digits, x = 3, grpSep = this.toUse.num_grp_sep, decSep = this.toUse.dec_sep) {
        let re = '\\d(?=(\\d{' + x + '})+' + (n > 0 ? '\\D' : '$') + ')';
        /* tslint:disable:no-bitwise */
        let num = i.toFixed(Math.max(0, ~~n));
        /* tslint:enable:no-bitwise */
        return num.replace('.', decSep).replace(new RegExp(re, 'g'), '$&' + grpSep);
    }

    /**
     * format a moment object or a string as date in teh users date format
     *
     * @param d
     */
    public formatDate(d) {
        if (moment.isMoment(d)) {
            return d.format(this.getDateFormat());
        }
        let datem = moment(d);
        return datem.isValid() ? datem.format(this.getDateFormat()) : d;
    }

    /**
     * format a string or moment object in the users preference as date time
     *
     * @param d
     */
    public formatDateTime(d) {
        if (moment.isMoment(d)) {
            return d.format(this.getDateFormat()) + ' ' + d.format(this.getTimeFormat());
        }
        return moment.utc(d).format(this.getDateFormat()) + ' ' + moment.utc(d).format(this.getTimeFormat());
    }

    public getPossibleDateFormats(): object[] {
        return [
            {name: moment().format(this.jsDateFormat2momentDateFormat("Y-m-d")), value: "Y-m-d"},
            {name: moment().format(this.jsDateFormat2momentDateFormat("m-d-Y")), value: "m-d-Y"},
            {name: moment().format(this.jsDateFormat2momentDateFormat("d-m-Y")), value: "d-m-Y"},
            {name: moment().format(this.jsDateFormat2momentDateFormat("Y/m/d")), value: "Y/m/d"},
            {name: moment().format(this.jsDateFormat2momentDateFormat("m/d/Y")), value: "m/d/Y"},
            {name: moment().format(this.jsDateFormat2momentDateFormat("d/m/Y")), value: "d/m/Y"},
            {name: moment().format(this.jsDateFormat2momentDateFormat("Y.m.d")), value: "Y.m.d"},
            {name: moment().format(this.jsDateFormat2momentDateFormat("d.m.Y")), value: "d.m.Y"},
            {name: moment().format(this.jsDateFormat2momentDateFormat("m.d.Y")), value: "m.d.Y"}
        ];
    }

    public getPossibleTimeFormats(): object[] {
        return [
            {name: moment().format(this.jsTimeFormat2momentTimeFormat("H:i")), value: "H:i"},
            {name: moment().format(this.jsTimeFormat2momentTimeFormat("h:ia")), value: "h:ia"},
            {name: moment().format(this.jsTimeFormat2momentTimeFormat("h:iA")), value: "h:iA"},
            {name: moment().format(this.jsTimeFormat2momentTimeFormat("h:i a")), value: "h:i a"},
            {name: moment().format(this.jsTimeFormat2momentTimeFormat("h:i A")), value: "h:i A"},
            {name: moment().format(this.jsTimeFormat2momentTimeFormat("H.i")), value: "H.i"},
            {name: moment().format(this.jsTimeFormat2momentTimeFormat("h.ia")), value: "h.ia"},
            {name: moment().format(this.jsTimeFormat2momentTimeFormat("h.iA")), value: "h.iA"},
            {name: moment().format(this.jsTimeFormat2momentTimeFormat("h.i a")), value: "h.i a"},
            {name: moment().format(this.jsTimeFormat2momentTimeFormat("h.i A")), value: "h.i A"}
        ];
    }

    /**
     * returns the users default company code
     *
     * does not actually come from the user preferences but fromt eh user itself but routes this throug here via the session
     */
    get companyCodeId() {
        return this.session.authData.companycode_id;
    }

}
