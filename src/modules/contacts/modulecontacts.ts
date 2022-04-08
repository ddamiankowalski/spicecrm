/**
 * @module ModuleContacts
 */
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";

import {DirectivesModule} from "../../directives/directives";

import {ObjectFields} from "../../objectfields/objectfields";
import {GlobalComponents} from "../../globalcomponents/globalcomponents";
import {ObjectComponents} from "../../objectcomponents/objectcomponents";
import {SystemComponents} from "../../systemcomponents/systemcomponents";

import /*embed*/ {ContactNewslettersButton} from "./components/contactnewslettersbutton";
import /*embed*/ {ContactNewsletters} from "./components/contactnewsletters";
import /*embed*/ {ContactPortalButton} from "./components/contactportalbutton";
import /*embed*/ {ContactPortalDetails} from "./components/contactportaldetails";
import /*embed*/ {ContactExchangeSyncButton} from "./components/contactexchangesyncbutton";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ObjectFields,
        GlobalComponents,
        ObjectComponents,
        SystemComponents,
        DirectivesModule,
    ],
    declarations: [
        ContactNewslettersButton,
        ContactNewsletters,
        ContactPortalButton,
        ContactPortalDetails,
        ContactExchangeSyncButton
    ]
})
export class ModuleContacts {}
