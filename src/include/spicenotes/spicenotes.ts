/**
 * @module ModuleSpiceNotes
 */
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";

import {DirectivesModule} from "../../directives/directives";

import {ObjectFields} from "../../objectfields/objectfields";
import {GlobalComponents} from "../../globalcomponents/globalcomponents";
import {ObjectComponents} from "../../objectcomponents/objectcomponents";
import {SystemComponents} from "../../systemcomponents/systemcomponents";
import /*embed*/ {SpiceNotes} from "./components/spicenotes";
import /*embed*/ {SpiceNote} from "./components/spicenote";
import /*embed*/ {SpiceNotesPanelHeader} from "./components/spicenotespanelheader";

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
        SpiceNotes,
        SpiceNote,
        SpiceNotesPanelHeader
    ]
})
export class ModuleSpiceNotes {

}
