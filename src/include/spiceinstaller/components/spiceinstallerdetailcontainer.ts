/**
 * @module SpiceInstallerModule
 */

import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from '@angular/router';
import {configurationService} from '../../../services/configuration.service';
import {toast} from '../../../services/toast.service';
import {backend} from "../../../services/backend.service";
import {spiceinstaller} from "../services/spiceinstaller.service";


@Component({
    selector: 'spice-installer-detail-container',
    templateUrl: '../templates/spiceinstallerdetailcontainer.html',
})

export class SpiceInstallerDetailContainer {

    constructor(
        public toast: toast,
        public http: HttpClient,
        public router: Router,
        public configurationService: configurationService,
        public backend: backend,
        public spiceinstaller: spiceinstaller,
    ) {

    }


}
