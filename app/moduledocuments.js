/*!
 * 
 *                     aacService
 *
 *                     release: 2022.02.001
 *
 *                     date: 2022-08-27 19:36:04
 *
 *                     build: 2022.02.001.1661621764544
 *
 */
"use strict";(self.webpackChunkcore=self.webpackChunkcore||[]).push([["src_modules_documents_moduledocuments_ts"],{6340:(e,t,s)=>{s.r(t),s.d(t,{ModuleDocuments:()=>z});var i=s(6895),n=s(3121),o=s(3283),l=s(4518),a=s(5478),d=s(4357),c=s(433),u=s(7040),r=s(1571),m=s(5710),p=s(2032),h=s(2294),g=s(5329),f=s(4154),b=s(7774),v=s(4044),_=s(6040),y=s(4505),C=s(6367),D=s(3208),Y=s(2656);function Z(e,t){if(1&e&&r._UZ(0,"field-label",4),2&e){const e=r.oxw();r.Q6J("fieldname",e.fieldname)("fieldconfig",e.fieldconfig)}}function R(e,t){if(1&e){const e=r.EpF();r.TgZ(0,"button",5),r.NdJ("click",(function(){r.CHM(e);const t=r.oxw();return r.KtG(t.activateRevision())})),r._UZ(1,"system-button-icon",6),r.qZA()}}let M=(()=>{class fieldDocumentRevisionStatus extends u.O{constructor(e,t,s,i,n,o,l,a,d){super(e,s,i,n,o),this.model=e,this.navigation=t,this.language=i,this.metadata=n,this.router=o,this.modal=l,this.relatedmodels=a,this.backend=d}ngOnInit(){super.ngOnInit(),this.parent=this.navigation.getRegisteredModel(this.model.getField("document_id"),"Documents"),this.subscriptions.add(this.parent.observeFieldChanges("status_id").subscribe((e=>{"Expired"==e&&(this.value="a")})))}getValue(){return this.language.getFieldDisplayOptionValue(this.model.module,this.fieldname,this.value)}get canActivate(){return!this.model.isEditing&&"c"==this.value&&this.model.checkAccess("edit")&&"Expired"!=this.parent.getField("status_id")}activateRevision(){this.modal.prompt("confirm",this.language.getLabel("MSG_ACTIVATE_REVISION","","long")).subscribe((e=>{e&&(this.model.startEdit(),this.value="r",this.model.save().subscribe((e=>{this.parent&&this.parent.setField("revision",this.model.getField("revision"))})))}))}}return fieldDocumentRevisionStatus.ɵfac=function(e){return new(e||fieldDocumentRevisionStatus)(r.Y36(m.o),r.Y36(p.G),r.Y36(h.e),r.Y36(g.d),r.Y36(f.Pu),r.Y36(b.F0),r.Y36(v.o),r.Y36(_.j),r.Y36(y.y))},fieldDocumentRevisionStatus.ɵcmp=r.Xpm({type:fieldDocumentRevisionStatus,selectors:[["ng-component"]],features:[r.qOj],decls:6,vars:7,consts:[[3,"fieldname","fieldconfig",4,"ngIf"],[3,"fielddisplayclass","editable","fieldconfig","fieldid"],[1,"slds-grid","slds-grid--vertical-align-center"],["class","slds-button slds-button--icon slds-theme--warning slds-m-left--x-small",3,"click",4,"ngIf"],[3,"fieldname","fieldconfig"],[1,"slds-button","slds-button--icon","slds-theme--warning","slds-m-left--x-small",3,"click"],["icon","light_bulb"]],template:function(e,t){1&e&&(r.YNc(0,Z,1,2,"field-label",0),r.TgZ(1,"field-generic-display",1)(2,"div",2)(3,"span"),r._uU(4),r.qZA(),r.YNc(5,R,2,0,"button",3),r.qZA()()),2&e&&(r.Q6J("ngIf",t.displayLabel),r.xp6(1),r.Q6J("fielddisplayclass",t.fielddisplayclass)("editable",t.isEditable())("fieldconfig",t.fieldconfig)("fieldid",t.fieldid),r.xp6(3),r.Oqu(t.getValue()),r.xp6(1),r.Q6J("ngIf",t.canActivate))},dependencies:[i.O5,C.q,D.D,Y.J],encapsulation:2}),fieldDocumentRevisionStatus})();var T=s(727),J=s(6625),O=s(3463);let x=(()=>{class DocumentCreateRevisionButton{constructor(e,t,s,i,n,o,l){this.language=e,this.model=t,this.modal=s,this.backend=i,this.configuration=n,this.viewContainerRef=o,this.relatedmodels=l,this.templates=[],this.subscriptions=new T.w0}openOutput(){this.templates.length>0?(this.templates.sort(((e,t)=>e.name>t.name?1:-1)),this.modal.openModal("DocumentCreateRevisionModal",!0,this.viewContainerRef.injector).subscribe((e=>{let t=new r.vpe;e.instance.templates=this.templates,e.instance.modalTitle="LBL_CREATE_REVISION",e.instance.handBack=t,this.subscriptions.add(t.subscribe((e=>{this.backend.postRequest(`module/Documents/${this.model.id}/revisionfrombase64`,"",{file_name:e.name+".pdf",file:e.content,file_mime_type:"application/pdf",documentrevisionstatus:"r"}).subscribe((e=>{this.relatedmodels.getData()}))})))}))):this.modal.info("No Templates Found","there are no Output templates defined for the Module")}ngOnDestroy(){this.subscriptions.unsubscribe()}execute(){let e=this.configuration.getData("OutputTemplates");e&&e[this.model.module]?(this.templates=e[this.model.module],this.openOutput()):(e={},this.modal.openModal("SystemLoadingModal",!1).subscribe((e=>{e.instance.messagelabel="Loading Templates",this.backend.getRequest("module/OutputTemplates/formodule/"+this.model.module,{}).subscribe((t=>{e.instance.self.destroy(),this.configuration.setData("OutputTemplates",t),this.templates=t,this.openOutput()}),(t=>{e.instance.self.destroy()}))})))}}return DocumentCreateRevisionButton.ɵfac=function(e){return new(e||DocumentCreateRevisionButton)(r.Y36(g.d),r.Y36(m.o),r.Y36(v.o),r.Y36(y.y),r.Y36(J.C),r.Y36(r.s_b),r.Y36(_.j))},DocumentCreateRevisionButton.ɵcmp=r.Xpm({type:DocumentCreateRevisionButton,selectors:[["document-create-revision-button"]],decls:1,vars:0,consts:[["label","LBL_CREATE_REVISION"]],template:function(e,t){1&e&&r._UZ(0,"system-label",0)},dependencies:[O._],encapsulation:2}),DocumentCreateRevisionButton})();var w=s(2486),A=s(1481),E=s(3507),k=s(6163),I=s(9621),L=s(3499),B=s(5767),q=s(1916),N=s(4664);function Q(e,t){if(1&e&&(r.TgZ(0,"option",20),r._uU(1),r.qZA()),2&e){const e=t.$implicit;r.Q6J("ngValue",e),r.xp6(1),r.AsE("",e.name," (",e.language,")")}}function S(e,t){if(1&e&&r._UZ(0,"iframe",21),2&e){const e=r.oxw();r.Q6J("srcdoc",e.sanitizedTemplated,r.oJD)}}function F(e,t){if(1&e&&r._UZ(0,"object",22),2&e){const e=r.oxw();r.Q6J("data",e.blobUrl,r.uOi)}}function U(e,t){1&e&&(r.TgZ(0,"div",23),r._UZ(1,"system-spinner"),r.qZA())}function j(e,t){1&e&&(r.TgZ(0,"div",23),r._UZ(1,"system-label",24),r.qZA())}let V=(()=>{class DocumentCreateRevisionModal extends w.s{constructor(e,t,s,i,n,o,l,a,d,c){super(e,t,s,i,n,o,d,l,a,c),this.language=e,this.model=t,this.metadata=s,this.modal=i,this.view=n,this.backend=o,this.sanitizer=l,this.viewContainerRef=a,this.outputModalService=d,this.modelutilities=c}create(){this.handBack.emit({name:this.selected_template.name,content:this.contentForHandBack}),this.close()}}return DocumentCreateRevisionModal.ɵfac=function(e){return new(e||DocumentCreateRevisionModal)(r.Y36(g.d),r.Y36(m.o),r.Y36(f.Pu),r.Y36(v.o),r.Y36(h.e),r.Y36(y.y),r.Y36(A.H7),r.Y36(r.s_b),r.Y36(E.w),r.Y36(k.A))},DocumentCreateRevisionModal.ɵcmp=r.Xpm({type:DocumentCreateRevisionModal,selectors:[["object-action-output-bean-modal"]],features:[r._Bn([h.e]),r.qOj],decls:22,vars:10,consts:[["size","large"],[3,"close"],[3,"label"],["margin","none"],[1,"slds-modal__content"],[1,"slds-form-element__control","slds-grid","slds-grid--vertical-align-center","slds-p-around--small"],[1,"slds-col","slds-p-right--x-small"],["label","LBL_TEMPLATE"],[1,"slds-col","slds-select","slds-grow",3,"ngModel","disabled","ngModelChange"],[3,"ngValue",4,"ngFor","ngForOf"],[1,"slds-grid",2,"height","70vh"],[1,"slds-p-around--small",2,"height","100%","width","200%"],[1,"slds-m-top--small","slds-border--top","slds-border--right","slds-border--left","slds-border--bottom",2,"width","100%","height","calc(100% - 50px)"],["frameBorder","0","style","width: 100%;height: 100%;",3,"srcdoc",4,"ngIf"],["type","application/pdf","width","100%","height","100%",3,"data",4,"ngIf"],["class","slds-align--absolute-center","style","height: 100%;",4,"ngIf"],[1,"slds-button","slds-button--neutral",3,"click"],["label","LBL_CANCEL"],[1,"slds-button","slds-button--brand",3,"disabled","click"],["label","LBL_CREATE"],[3,"ngValue"],["frameBorder","0",2,"width","100%","height","100%",3,"srcdoc"],["type","application/pdf","width","100%","height","100%",3,"data"],[1,"slds-align--absolute-center",2,"height","100%"],["label","LBL_SELECT_TEMPLATE"]],template:function(e,t){1&e&&(r.TgZ(0,"system-modal",0)(1,"system-modal-header",1),r.NdJ("close",(function(){return t.close()})),r._UZ(2,"system-label",2),r.qZA(),r.TgZ(3,"system-modal-content",3)(4,"div",4)(5,"div",5)(6,"label",6),r._UZ(7,"system-label",7),r.qZA(),r.TgZ(8,"select",8),r.NdJ("ngModelChange",(function(e){return t.selected_template=e})),r.YNc(9,Q,2,3,"option",9),r.qZA()(),r.TgZ(10,"div",10)(11,"div",11)(12,"div",12),r.YNc(13,S,1,1,"iframe",13),r.YNc(14,F,1,1,"object",14),r.YNc(15,U,2,0,"div",15),r.YNc(16,j,2,0,"div",15),r.qZA()()()()(),r.TgZ(17,"system-modal-footer")(18,"button",16),r.NdJ("click",(function(){return t.close()})),r._UZ(19,"system-label",17),r.qZA(),r.TgZ(20,"button",18),r.NdJ("click",(function(){return t.create()})),r._UZ(21,"system-label",19),r.qZA()()()),2&e&&(r.xp6(2),r.Q6J("label",t.modalTitle),r.xp6(6),r.Q6J("ngModel",t.selected_template)("disabled",0==t.templates.length),r.xp6(1),r.Q6J("ngForOf",t.templates),r.xp6(2),r.Q6J("@slideInOut",t.expanded?"open":"closed"),r.xp6(2),r.Q6J("ngIf","html"===t.selected_format&&!t.loading_output&&t.selected_template),r.xp6(1),r.Q6J("ngIf","pdf"===t.selected_format&&!t.loading_output&&t.blobUrl),r.xp6(1),r.Q6J("ngIf",t.loading_output),r.xp6(1),r.Q6J("ngIf",!t.selected_template&&!t.loading_output),r.xp6(4),r.Q6J("disabled",!t.selected_template||t.loading_output))},dependencies:[i.sg,i.O5,c.YN,c.Kr,c.EJ,c.JJ,c.On,O._,I.j,L.x,B.p,q.y,N.W],encapsulation:2}),DocumentCreateRevisionModal})(),z=(()=>{class ModuleDocuments{}return ModuleDocuments.ɵfac=function(e){return new(e||ModuleDocuments)},ModuleDocuments.ɵmod=r.oAB({type:ModuleDocuments}),ModuleDocuments.ɵinj=r.cJS({imports:[i.ez,c.u5,n.ObjectFields,o.GlobalComponents,l.ObjectComponents,a.SystemComponents,d.o]}),ModuleDocuments})();("undefined"==typeof ngJitMode||ngJitMode)&&r.kYT(z,{declarations:[M,x,V],imports:[i.ez,c.u5,n.ObjectFields,o.GlobalComponents,l.ObjectComponents,a.SystemComponents,d.o]})}}]);