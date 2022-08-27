/**
 * @module SpiceInstallerModule
 */

import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {toast} from '../../../services/toast.service';
import {spiceinstaller} from "../services/spiceinstaller.service";


@Component({
    selector: 'spice-installer-fts',
    templateUrl: '../templates/spiceinstallerfts.html'
})

export class SpiceInstallerFTS {
    /**
     * condition booleans
     */
    public serverCondition: boolean = true;
    public portCondition: boolean = true;
    public prefixCondition: boolean = true;
    /**
     * loading boolean
     */
    public loading: boolean = false;
    public protocolOptions: any = [{type: 'http', name: 'HTTP'}, {type: 'https', name: 'HTTPS'}];
    constructor(
        public toast: toast,
        public http: HttpClient,
        public spiceinstaller: spiceinstaller
    ) {
        if(!this.spiceinstaller.prefix) this.spiceinstaller.prefix = this.spiceinstaller.db_name + '_';
    }

    /**
     * checks if a connection with the fts server is possible, saves the configuration
     */
    public checkFTS() {

        let body = {
            server: this.spiceinstaller.server,
            port: this.spiceinstaller.port,
            prefix: this.spiceinstaller.prefix,
            loglevel: 1,
            schedulerpackagesize: 2500,
            protocol: this.spiceinstaller.transferProtocol
        };

        this.serverCondition = this.spiceinstaller.server.length > 0;
        this.portCondition = this.spiceinstaller.port.length > 0;
        this.prefixCondition = this.spiceinstaller.prefix.length > 0;

        if (this.serverCondition && this.portCondition && this.prefixCondition) {
            this.loading = true;
            this.http.post(`${this.spiceinstaller.systemurl}/install/checkfts`, body).subscribe(
                (response: any) => {
                    this.loading = false;
                    let res = response;
                    if (!res.success) {
                        for (let e in res.errors) {
                            this.toast.sendAlert('Error with: ' + res.errors[e], 'error');
                        }
                    } else {
                        this.spiceinstaller.selectedStep.completed = true;
                        this.spiceinstaller.configObject.fts = res.config;
                        this.spiceinstaller.steps[4] = this.spiceinstaller.selectedStep;
                        this.spiceinstaller.next(this.spiceinstaller.steps[4]);
                    }
                });
        }

    }
}
