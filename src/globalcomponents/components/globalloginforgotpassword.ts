/**
 * @module GlobalComponents
 */
import {Component, EventEmitter, Output} from '@angular/core';
import {configurationService} from '../../services/configuration.service';
import {toast} from '../../services/toast.service';
import {HttpClient} from "@angular/common/http";


@Component({
    selector: 'global-login-forgot-password',
    templateUrl: '../templates/globalloginforgotpassword.html'
})
export class GlobalLoginForgotPassword {
    /**
     * the users email address
     *
     * @private
     */
   public email: string = '';

    /**
     * the token the user sends
     *
     * @private
     */
   public token: string = '';

    /**
     * the password entered by the user
     * @private
     */
   public password: string = undefined;

    /**
     * holds the repeated password
     * @private
     */
   public repeatPassword: string = undefined;

    /**
     * the regex to match the password requirements
     * @private
     */
   public pwdCheck: RegExp = new RegExp('//');

    /**
     * the text for the password requriements
     * @private
     */
   public pwdGuideline: string;

    /**
     * defines the legth of the toekn that is either the minimum password length
     * defaults to 6 if not set
     *
     * @private
     */
   public tokenLength: number = 6;

    /**
     * indicates that we are sending and thus closes the various inputs and disables the buttons
     *
     * @private
     */
   public sending: boolean = false;

    /**
     * set to display the
     * @private
     */
   public display: 'email'|'token' = 'email';


    /**
     * emit true to close the reset window
     *
     * @private
     */
    @Output()public close: EventEmitter<boolean> = new EventEmitter<boolean>();

    /**
     * keep the active toast if we have one
     *
     * @private
     */
   public activeToast: string;

    constructor(
       public http: HttpClient,
       public configuration: configurationService,
       public toast: toast,
    ) {
        this.getInfo();
    }

    /*
    * retrieve password guideline
    */
   public getInfo() {
        let extConf = this.configuration.getCapabilityConfig('userpassword');
        this.pwdCheck = new RegExp(extConf.regex);

        let requArray = [];

        if (extConf.onelower) requArray.push('one lower case');
        if (extConf.oneupper) requArray.push('one upper case');
        if (extConf.onenumber) requArray.push('one number');
        if (extConf.onespecial) requArray.push('one special');
        if (extConf.minpwdlength) {
            requArray.push('minimum length ' + extConf.minpwdlength);
            this.tokenLength = parseInt(extConf.minpwdlength, 10);
        }

        this.pwdGuideline = requArray.join(', ');
    }

    get pwderror() {
        return this.password && !this.pwdCheck.test(this.password) ? 'Password does not match the Guideline.' : false;
    }

    get pwdreperror() {
        return this.password == this.repeatPassword ? false : 'Inputs for the new Password does not match.'; // does not match password
    }

    /**
     * regex for the email address validation
     *
     * @private
     */
   public emailValidation = new RegExp('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');


    /**
     * returns
     */
    get emailValid() {
        return this.email && this.email.length > 0 && this.emailValidation.test(this.email);
    }

    /**
     * request the token via email
     *
     * @private
     */
   public sendEmail() {
        if (this.emailValid) {
            // clear an error toast if we have one
            if(this.activeToast){
                this.toast.clearToast(this.activeToast);
            }

            // set to sending and send the request
            this.sending = true;
            this.http.get(this.configuration.getBackendUrl() + `/authentication/passwordtoken/email/${this.email}`).subscribe(
                (res: any) => {
                    this.display = 'token';
                    this.toast.sendToast('Successfully sent, check your inbox to get the token code', 'success');
                    this.sending = false;
                },
                (err: any) => {
                    this.activeToast = this.toast.sendToast('there was an error sending the token', 'error', 'Please verify that the mail is correect or contact a system administrator');
                    this.sending = false;
                }
            );
        }
    }

    /**
     * checks if we have a valid token and a valid password
     */
    get canSendToken() {
        return this.token.length == this.tokenLength && !this.pwderror && !this.pwdreperror;
    }

    /**
     * resets the password with the token
     *
     * @private
     */
   public resetPassword() {
        if (this.canSendToken) {
            // clear an error toast if we have one
            if(this.activeToast){
                this.toast.clearToast(this.activeToast);
            }

            // submit the request
            this.sending = true;
            this.http.post(
                this.configuration.getBackendUrl() + `/authentication/passwordtoken/token/${this.token}`,
                {
                    newPassword: this.password
                }
            ).subscribe(
                (res: any) => {
                    this.close.emit(true);
                    this.sending = false;
                },
                (err: any) => {
                    this.activeToast = this.toast.sendToast('there was an error resetting your password', 'error', 'please contact a system administrator');
                    this.sending = false;
                }
            );
        }
    }

}
