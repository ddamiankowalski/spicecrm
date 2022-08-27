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
"use strict";(self.webpackChunkcore=self.webpackChunkcore||[]).push([["src_include_spicepath_spicepath_ts"],{3264:(t,e,s)=>{s.r(e),s.d(e,{ModuleSpicePath:()=>Qt});var i=s(6895),a=s(433),l=s(2563),n=s(4357),o=s(3121),d=s(3283),c=s(4518),r=s(5478),g=s(1571),u=s(6625),p=s(2644);let h=(()=>{class SpiceKanbanStagePipe{constructor(t,e){this.configuration=t,this.modellist=e}transform(t,e){let s=[],i=this.getStageData(e);for(let a of t)a[i.statusfield]&&a[i.statusfield]==e&&s.push(a);return s}get stages(){return this.configuration.getData("spicebeanguides")?this.configuration.getData("spicebeanguides")[this.modellist.module].stages:[]}getStageData(t){let e=[];return this.stages.some((s=>{t!=s.stage||(e=s.stagedata)})),e}}return SpiceKanbanStagePipe.ɵfac=function(t){return new(t||SpiceKanbanStagePipe)(g.Y36(u.C,16),g.Y36(p.t,16))},SpiceKanbanStagePipe.ɵpipe=g.Yjl({name:"spicekanbanstagepipe",type:SpiceKanbanStagePipe,pure:!1}),SpiceKanbanStagePipe})();var m=s(5710),f=s(5329),b=s(8859);function x(t,e){if(1&t){const t=g.EpF();g.TgZ(0,"li",5)(1,"a",6),g.NdJ("click",(function(){const e=g.CHM(t).$implicit,s=g.oxw();return g.KtG(s.setActiveStage(e.stage))})),g.TgZ(2,"span",7),g._UZ(3,"system-utility-icon",8),g.qZA(),g.TgZ(4,"span",9),g._uU(5),g.qZA()()()}if(2&t){const t=e.$implicit,s=g.oxw();g.Q6J("ngClass",s.stageClass(t)),g.xp6(5),g.Oqu(s.getStageLabel(t.stagedata))}}let S=(()=>{class SpicePathTrack{constructor(t,e,s){this.configuration=t,this.model=e,this.language=s,this.beanGuideStatus="open",this._stages=[],this.activeStage$=new g.vpe}ngOnInit(){this.model.data$.subscribe((t=>{this.buildstages(),this._modelstage!=this.model.getField(this.statusfield)&&(this._modelstage=this.model.getField(this.statusfield),this.activeStage=this._modelstage,this.activeStage$.emit(this._modelstage))}))}buildstages(){let t=[],e=this.configuration.getData("spicebeanguides")?this.configuration.getData("spicebeanguides")[this.model.module].stages:[],s=this.model.getField(this.statusfield);this.beanGuideStatus="open";for(let i of e)if(i.stagedata.stage_bucket){let e=t.findIndex((t=>t.stagedata.stage_bucket==i.stagedata.stage_bucket));if(e>=0)i.stage==s&&(t[e]={stage:i.stage,stagedata:_.clone(i.stagedata)},i.stagedata.spicebeanguide_status&&(this.beanGuideStatus=i.stagedata.spicebeanguide_status));else if(i.stage==s)t.push({stage:i.stage,stagedata:_.clone(i.stagedata)}),i.stagedata.spicebeanguide_status&&(this.beanGuideStatus=i.stagedata.spicebeanguide_status);else{let e={stage:i.stage,stagedata:_.clone(i.stagedata)};e.stagedata.stage_label=i.stagedata.stage_bucket,t.push(e)}}else t.push({stage:i.stage,stagedata:_.clone(i.stagedata)});this._stages=t}get stages(){return this._stages}get statusfield(){return this.configuration.getData("spicebeanguides")[this.model.module].statusfield}stageClass(t){let e=[],s=this.model.getField(this.statusfield);if("won"==this.beanGuideStatus&&"won"==t.stagedata.spicebeanguide_status?e.push("slds-is-won"):"won"==this.beanGuideStatus&&e.push("slds-is-complete"),"lost"==this.beanGuideStatus&&"lost"==t.stagedata.spicebeanguide_status?e.push("slds-is-lost"):"lost"==this.beanGuideStatus&&e.push("slds-is-incomplete"),(this.activeStage&&this.activeStage==t.stage||!this.activeStage&&s==t.stage)&&("lost"==this.beanGuideStatus?e.push("slds-is-current"):e.push("slds-is-active")),"open"==this.beanGuideStatus&&s){let i=this.stages.findIndex((e=>e.stage==t.stage)),a=this.stages.findIndex((t=>t.stage==s));i<a&&e.push("slds-is-complete"),i>a&&e.push("slds-is-incomplete"),i==a&&-1==e.indexOf("slds-is-active")&&e.push("slds-is-current")}return s||e.push("slds-is-incomplete"),e.join(" ")}setActiveStage(t){this.activeStage=t,this.activeStage$.emit(t)}getStageLabel(t){return t.stage_label?this.language.getLabel(t.stage_label):t.stage_name}}return SpicePathTrack.ɵfac=function(t){return new(t||SpicePathTrack)(g.Y36(u.C),g.Y36(m.o),g.Y36(f.d))},SpicePathTrack.ɵcmp=g.Xpm({type:SpicePathTrack,selectors:[["spice-path-track"]],outputs:{activeStage$:"activeStage$"},decls:5,vars:1,consts:[[1,"slds-grid","slds-path__scroller-container"],["role","application",1,"slds-path__scroller"],[1,"slds-path__scroller_inner"],["role","listbox","aria-orientation","horizontal",1,"slds-path__nav"],["class","slds-path__item","role","presentation",3,"ngClass",4,"ngFor","ngForOf"],["role","presentation",1,"slds-path__item",3,"ngClass"],["aria-selected","false","href","javascript:void(0);","role","option",1,"slds-path__link",3,"click"],[1,"slds-path__stage"],["icon","check","size","x-small"],[1,"slds-path__title"]],template:function(t,e){1&t&&(g.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"ul",3),g.YNc(4,x,6,2,"li",4),g.qZA()()()()),2&t&&(g.xp6(4),g.Q6J("ngForOf",e.stages))},dependencies:[i.mk,i.sg,b.r],encapsulation:2}),SpicePathTrack})(),v=(()=>{class SpicePathModel{}return SpicePathModel.ɵfac=function(t){return new(t||SpicePathModel)},SpicePathModel.ɵcmp=g.Xpm({type:SpicePathModel,selectors:[["spice-path-model"]],decls:2,vars:0,consts:[[1,"slds-path","slds-p-vertical--small","slds-scrollable--x"]],template:function(t,e){1&t&&(g.TgZ(0,"div",0),g._UZ(1,"spice-path-track"),g.qZA())},dependencies:[S],encapsulation:2}),SpicePathModel})();var y=s(7340),k=s(4505),Z=s(4154),D=s(2656),T=s(6951),C=s(3463);function F(t,e){if(1&t&&(g.ynx(0),g.TgZ(1,"dt",18),g._UZ(2,"system-utility-icon",19),g.qZA(),g.TgZ(3,"dd",20),g._uU(4),g.qZA(),g.BQk()),2&t){const t=e.$implicit,s=g.oxw(3);g.xp6(2),g.Q6J("icon",t.result?"check":"warning")("size","x-small"),g.xp6(2),g.Oqu(t.label?s.language.getLabel(t.label):t.name)}}function w(t,e){if(1&t&&(g.ynx(0),g.TgZ(1,"h2",14),g._UZ(2,"system-label",15),g.qZA(),g.TgZ(3,"dl",16),g.YNc(4,F,5,3,"ng-container",17),g.qZA(),g.BQk()),2&t){const t=g.oxw(2);g.xp6(4),g.Q6J("ngForOf",t.checks)}}function L(t,e){1&t&&(g.TgZ(0,"div",21),g._UZ(1,"system-label",22),g.qZA())}function J(t,e){if(1&t&&g._UZ(0,"system-componentset",23),2&t){const t=g.oxw(2);g.Q6J("componentset",t.stageComponentset)}}function A(t,e){if(1&t&&(g.TgZ(0,"div",6)(1,"div",7),g.YNc(2,w,5,1,"ng-container",8),g.YNc(3,L,2,0,"ng-template",null,9,g.W1O),g.qZA(),g.TgZ(5,"div",7)(6,"h2",10),g._UZ(7,"system-label",11),g.qZA(),g._UZ(8,"div",12),g.YNc(9,J,1,1,"system-componentset",13),g.qZA()()),2&t){const t=g.MAs(4),e=g.oxw();g.Q6J("@displaycoaching",void 0),g.xp6(2),g.Q6J("ngIf",e.checks.length>0)("ngIfElse",t),g.xp6(6),g.Q6J("innerHtml",e.stageDescription,g.oJD),g.xp6(1),g.Q6J("ngIf",e.stageComponentset)}}let Q=(()=>{class SpicePathWithCoaching{constructor(t,e,s,i,a){this.configuration=t,this.model=e,this.language=s,this.backend=i,this.metadata=a,this.coachingVisible=!1,this.componentconfig={},this.componentconfig=this.metadata.getComponentConfig("SpicePathWithCoaching",this.model.module),this.componentconfig&&this.componentconfig.coachingVisible&&(this.coachingVisible=this.componentconfig.coachingVisible)}ngOnInit(){this.backend.getRequest("common/spicebeanguide/"+this.model.module+"/"+this.model.id).subscribe((t=>{this.beanStagesChecksResults=t}))}get coachingIconStyle(){return this.coachingVisible?{transform:"rotate(90deg)"}:{}}get stages(){return this.configuration.getData("spicebeanguides")[this.model.module].stages}get statusfield(){return this.configuration.getData("spicebeanguides")[this.model.module].statusfield}get currentStage(){return this.model.getField(this.statusfield)}toggleCoaching(){this.coachingVisible=!this.coachingVisible}setActiveStage(t){this.activeStage=t}get displayStage(){return this.activeStage?this.activeStage:this.currentStage}get checks(){let t=[];return this.beanStagesChecksResults.some((e=>{if(e.stage===this.displayStage)return t=e.stagedata.checks,!0})),t}get stageDescription(){let t=this.stages.find((t=>t.stage==this.displayStage));return t?t.stagedata.stage_label?this.language.getLabel(t.stagedata.stage_label,"","long"):t.stagedata.stage_description:""}get stageComponentset(){let t=this.stages.find((t=>t.stage==this.displayStage));return t?t.stagedata.stage_componentset:""}}return SpicePathWithCoaching.ɵfac=function(t){return new(t||SpicePathWithCoaching)(g.Y36(u.C),g.Y36(m.o),g.Y36(f.d),g.Y36(k.y),g.Y36(Z.Pu))},SpicePathWithCoaching.ɵcmp=g.Xpm({type:SpicePathWithCoaching,selectors:[["spice-path-with-coaching"]],decls:6,vars:2,consts:[[1,"slds-path","slds-path_has-coaching","slds-p-around--small"],[1,"slds-grid","slds-path__scroller-container"],["aria-expanded","false",1,"slds-button","slds-button_icon","slds-button_icon-border-filled","slds-path__trigger",2,"box-shadow","none","border-radius","20px",3,"click"],["icon","chevronright"],[1,"slds-grow",3,"activeStage$"],["class","slds-grid slds-grid--align-spread slds-gutters_direct-xx-small slds-p-top--medium slds-p-horizontal--xxx-small",4,"ngIf"],[1,"slds-grid","slds-grid--align-spread","slds-gutters_direct-xx-small","slds-p-top--medium","slds-p-horizontal--xxx-small"],[1,"slds-col","slds-size--1-of-2"],[4,"ngIf","ngIfElse"],["nochecks",""],[1,"slds-text-title--caps","slds-p-bottom--small","slds-has-divider--bottom"],["label","LBL_DETAILS"],[1,"slds-has-divider--bottom","slds-p-vertical--xx-small","slds-text-align--justify",3,"innerHtml"],[3,"componentset",4,"ngIf"],[1,"slds-text-title--caps","slds-p-bottom--small"],["label","LBL_CHECKS"],[1,"slds-dl--horizontal"],[4,"ngFor","ngForOf"],[1,"slds-coach__item","slds-dl--horizontal__label"],[3,"icon","size"],[1,"slds-coach__value","slds-dl--horizontal__detail"],[1,"slds-height_full","slds-align--absolute-center"],["label","LBL_NO_CHECKS_DEFINED"],[3,"componentset"]],template:function(t,e){1&t&&(g.TgZ(0,"div",0)(1,"div",1)(2,"button",2),g.NdJ("click",(function(){return e.toggleCoaching()})),g._UZ(3,"system-button-icon",3),g.qZA(),g.TgZ(4,"spice-path-track",4),g.NdJ("activeStage$",(function(t){return e.setActiveStage(t)})),g.qZA()(),g.YNc(5,A,10,5,"div",5),g.qZA()),2&t&&(g.xp6(2),g.Q6J("@coachingicon",e.coachingVisible?"open":"closed"),g.xp6(3),g.Q6J("ngIf",e.coachingVisible))},dependencies:[i.sg,i.O5,D.J,T.E,C._,b.r,S],encapsulation:2,data:{animation:[(0,y.X$)("displaycoaching",[(0,y.eR)(":enter",[(0,y.oB)({opacity:0,height:"0px",overflow:"hidden"}),(0,y.jt)(".5s",(0,y.oB)({height:"*",opacity:1})),(0,y.oB)({overflow:"unset"})]),(0,y.eR)(":leave",[(0,y.oB)({overflow:"hidden"}),(0,y.jt)(".5s",(0,y.oB)({height:"0px",opacity:0}))])]),(0,y.X$)("coachingicon",[(0,y.SB)("open",(0,y.oB)({transform:"rotate(90deg)"})),(0,y.SB)("closed",(0,y.oB)({transform:"rotate(0deg)"})),(0,y.eR)("open => closed",[(0,y.jt)(".5s")]),(0,y.eR)("closed => open",[(0,y.jt)(".5s")])])]}}),SpicePathWithCoaching})();var N=s(3249),Y=s(6040),q=s(8652),P=s(4567),O=s(2294),I=s(586),U=s(4561),M=s(1790);function K(t,e){if(1&t&&g._UZ(0,"system-componentset",10),2&t){const t=g.oxw();g.Q6J("componentset",t.componentset)}}let z=(()=>{class SpicePathRelatedListTile{constructor(t,e,s,i,a){this.model=t,this.relatedmodels=e,this.view=s,this.language=i,this.metadata=a,this.module="",this.data={},this.componentset="",this.componentconfig={}}ngOnInit(){this.model.module=this.module,this.model.id=this.data.id,this.model.setData(this.data),this.componentconfig=this.metadata.getComponentConfig("SpicePathRelatedListTile",this.module)}get actionset(){return this.componentconfig.actionset}get componentSetLeft(){return this.componentconfig.left}get componentSetRight(){return this.componentconfig.right}}return SpicePathRelatedListTile.ɵfac=function(t){return new(t||SpicePathRelatedListTile)(g.Y36(m.o),g.Y36(Y.j),g.Y36(O.e),g.Y36(f.d),g.Y36(Z.Pu))},SpicePathRelatedListTile.ɵcmp=g.Xpm({type:SpicePathRelatedListTile,selectors:[["spice-path-related-list-tile"]],inputs:{module:"module",data:"data",componentset:"componentset"},features:[g._Bn([m.o,O.e])],decls:12,vars:8,consts:[[3,"module","size"],[1,"slds-media__body"],[1,"slds-grid","slds-grid--align-spread","slds-has-flexi-truncate"],["system-model-popover","",1,"slds-truncate","slds-text-heading--small","slds-p-top--xxx-small","slds-m-bottom--small"],[1,"slds-shrink-none","slds-show--medium"],[3,"buttonsize","actionset"],[1,"slds-tile__detail",2,"margin-left","-2rem"],[1,"slds-text-body--small"],[3,"componentset",4,"ngIf"],[1,"slds-hide--medium",3,"buttonsize","actionset"],[3,"componentset"]],template:function(t,e){1&t&&(g._UZ(0,"system-icon",0),g.TgZ(1,"div",1)(2,"div",2)(3,"h3",3),g._uU(4),g.qZA(),g.TgZ(5,"div",4),g._UZ(6,"object-action-menu",5),g.qZA()(),g.TgZ(7,"div",6),g._UZ(8,"spice-path-model"),g.TgZ(9,"div",7),g.YNc(10,K,1,1,"system-componentset",8),g.qZA()(),g._UZ(11,"object-action-menu",9),g.qZA()),2&t&&(g.Q6J("module",e.module)("size","small"),g.xp6(4),g.hij(" ",e.data.summary_text," "),g.xp6(2),g.Q6J("buttonsize","x-small")("actionset",e.actionset),g.xp6(4),g.Q6J("ngIf",e.componentset),g.xp6(1),g.Q6J("buttonsize","x-small")("actionset",e.actionset))},dependencies:[i.O5,I.g,T.E,U.f,M.g,v],encapsulation:2}),SpicePathRelatedListTile})();function E(t,e){if(1&t&&(g.TgZ(0,"div",4),g._UZ(1,"spice-path-related-list-tile",5),g.qZA()),2&t){const t=e.$implicit,s=g.oxw(2);g.xp6(1),g.Q6J("componentset",s.componentconfig.componentset)("data",t)("module",s.relatedmodels.relatedModule)}}function B(t,e){if(1&t&&(g.ynx(0),g.YNc(1,E,2,3,"div",3),g.BQk()),2&t){const t=g.oxw();g.xp6(1),g.Q6J("ngForOf",t.relatedmodels.items)}}function R(t,e){1&t&&g._UZ(0,"system-illustration-no-access")}let $=(()=>{class SpicePathRelatedListTiles extends N.s{}return SpicePathRelatedListTiles.ɵfac=function(){let t;return function(e){return(t||(t=g.n5z(SpicePathRelatedListTiles)))(e||SpicePathRelatedListTiles)}}(),SpicePathRelatedListTiles.ɵcmp=g.Xpm({type:SpicePathRelatedListTiles,selectors:[["ng-component"]],features:[g._Bn([Y.j]),g.qOj],decls:4,vars:3,consts:[[3,"componentconfig"],[4,"ngIf","ngIfElse"],["noaccess",""],["class","slds-p-around--xx-small slds-size--1-of-1",4,"ngFor","ngForOf"],[1,"slds-p-around--xx-small","slds-size--1-of-1"],[1,"slds-box","slds-box--x-small","slds-media","slds-card__tile",3,"componentset","data","module"]],template:function(t,e){if(1&t&&(g.TgZ(0,"object-related-card",0),g.YNc(1,B,2,1,"ng-container",1),g.YNc(2,R,1,0,"ng-template",null,2,g.W1O),g.qZA()),2&t){const t=g.MAs(3);g.Q6J("componentconfig",e.componentconfig),g.xp6(1),g.Q6J("ngIf",e.aclAccess)("ngIfElse",t)}},dependencies:[i.sg,i.O5,q.E,P.s,z],encapsulation:2}),SpicePathRelatedListTiles})();var j=s(5320);let G=(()=>{class SpiceKanbanSumField{get displayValue(){return!this.value||isNaN(this.value)?0:this.value}}return SpiceKanbanSumField.ɵfac=function(t){return new(t||SpiceKanbanSumField)},SpiceKanbanSumField.ɵcmp=g.Xpm({type:SpiceKanbanSumField,selectors:[["spice-kanban-sumfield"]],inputs:{value:"value",title:"title",symbol:"symbol"},decls:3,vars:3,consts:[[2,"cursor","default",3,"title","value"]],template:function(t,e){1&t&&(g.TgZ(0,"span"),g._uU(1),g.qZA(),g._UZ(2,"system-number-spinner",0)),2&t&&(g.xp6(1),g.Oqu(e.symbol),g.xp6(1),g.Q6J("title",e.title)("value",e.displayValue))},dependencies:[j.H],encapsulation:2}),SpiceKanbanSumField})();var H=s(5684),V=s(3369),W=s(2422),X=s(5547),tt=s(4730),et=s(7674),st=s(4664),it=s(1058),at=s(727),lt=s(6367),nt=s(3634),ot=s(5931),dt=s(4021);function ct(t,e){1&t&&(g.TgZ(0,"div",10),g._UZ(1,"system-utility-icon",11),g.qZA())}function rt(t,e){if(1&t&&(g.ynx(0),g._UZ(1,"object-record-fieldset-horizontal-list",12),g.BQk()),2&t){const t=g.oxw();g.xp6(1),g.Q6J("fieldset",t.headerFieldset)}}function gt(t,e){if(1&t){const t=g.EpF();g.TgZ(0,"h3",13),g.NdJ("click",(function(){g.CHM(t);const e=g.oxw();return g.KtG(e.goDetail())})),g.TgZ(1,"a",14),g._uU(2),g.qZA()()}if(2&t){const t=g.oxw();g.xp6(2),g.Oqu(t.model.getField("summary_text"))}}function ut(t,e){if(1&t&&(g.TgZ(0,"div",15),g._UZ(1,"field-container",16),g.qZA()),2&t){const t=g.oxw();g.xp6(1),g.Q6J("field",t.componentconfig.amount)("fielddisplayclass","slds-text-heading--medium")}}function pt(t,e){if(1&t&&g._UZ(0,"field-label",20),2&t){const t=g.oxw().$implicit;g.Q6J("fieldname",t.field)("fieldconfig",t.fieldconfig)}}const ht=function(t){return{"slds-size--1-of-1":t}};function mt(t,e){if(1&t&&(g.TgZ(0,"div",17),g.YNc(1,pt,1,2,"field-label",18),g._UZ(2,"field-container",19),g.qZA()),2&t){const t=e.$implicit;g.xp6(1),g.Q6J("ngIf",!t.fieldconfig.hidelabel),g.xp6(1),g.Q6J("ngClass",g.VKq(5,ht,t.fieldconfig.hidelabel))("field",t.field)("fieldconfig",t.fieldconfig)("fielddisplayclass","slds-truncate")}}let ft=(()=>{class SpiceKanbanTile{constructor(t,e,s,i,a,l){this.modellist=t,this.model=e,this.view=s,this.metadata=i,this.broadcast=a,this.changeDetectorRef=l,this.item={},this.componentconfig={},this.componentFields={},this.subscriptions=new at.w0,this.componentconfig=this.metadata.getComponentConfig("SpiceKanbanTile",this.modellist.module),this.componentFields=this.metadata.getFieldSetFields(this.componentconfig.fieldset),this.view.labels="short",this.view.displayLabels=!1}ngOnInit(){this.model.module=this.modellist.module,this.model.id=this.item.id,this.model.setData(_.clone(this.item)),this.model.initializeFieldsStati(),this.item._KanbanDrop?(this.model.setField(this.modellist.bucketfield,this.item._KanbanDrop.from),this.model.startEdit(),this.model.setField(this.modellist.bucketfield,this.item._KanbanDrop.to),this.model.validate()?this.model.save().subscribe((t=>{delete this.item._KanbanDrop,this.subscribeToSave()})):(this.model.edit().subscribe((t=>{!1===t&&(this.item[this.modellist.bucketfield]=this.item._KanbanDrop.from),delete this.item._KanbanDrop})),this.subscribeToSave())):this.subscribeToSave(),this.subscriptions.add(this.model.data$.subscribe((t=>{this.changeDetectorRef.detectChanges()})))}get hasNotification(){return this.model.getField("has_notification")}get headerFieldset(){return this.componentconfig.headerfieldset}subscribeToSave(){this.modelSubscription=this.model.saved$.subscribe((t=>{this.changeDetectorRef.detectChanges()}))}subscribeToBroadcast(){this.modelSubscription=this.model.saved$.subscribe((t=>{this.changeDetectorRef.detectChanges()}))}ngOnDestroy(){this.subscriptions.unsubscribe(),this.modelSubscription&&this.modelSubscription.unsubscribe()}goDetail(){this.model.goDetail()}}return SpiceKanbanTile.ɵfac=function(t){return new(t||SpiceKanbanTile)(g.Y36(p.t),g.Y36(m.o),g.Y36(O.e),g.Y36(Z.Pu),g.Y36(V.f),g.Y36(g.sBO))},SpiceKanbanTile.ɵcmp=g.Xpm({type:SpiceKanbanTile,selectors:[["spice-kanban-tile"]],hostVars:2,hostBindings:function(t,e){2&t&&g.Tol("slds-item")},inputs:{item:"item"},features:[g._Bn([m.o,O.e])],decls:11,vars:6,consts:[[1,"slds-tile","slds-box--border","slds-theme--default"],[1,"slds-p-around--x-small",3,"system-overlay-loading-spinner"],[1,"slds-grid","slds-grid--vertical-align-center"],["class","slds-p-right--x-small",4,"ngIf"],[4,"ngIf","ngIfElse"],["noheaderfieldset",""],["buttonsize","x-small",1,"slds-col_bump-left"],[1,"slds-tile__detail","slds-text-body--small"],["class","slds-p-vertical--x-small",4,"ngIf"],["class","slds-grid",4,"ngFor","ngForOf"],[1,"slds-p-right--x-small"],["icon","warning","addclasses","slds-icon-text-warning","size","x-small"],[1,"slds-truncate",3,"fieldset"],[1,"slds-truncate",3,"click"],["href","javascript:void(0);"],[1,"slds-p-vertical--x-small"],[3,"field","fielddisplayclass"],[1,"slds-grid"],["class","slds-truncate",3,"fieldname","fieldconfig",4,"ngIf"],[1,"slds-col--bump-left","slds-truncate",3,"ngClass","field","fieldconfig","fielddisplayclass"],[1,"slds-truncate",3,"fieldname","fieldconfig"]],template:function(t,e){if(1&t&&(g.TgZ(0,"div",0)(1,"div",1)(2,"div",2),g.YNc(3,ct,2,0,"div",3),g.YNc(4,rt,2,1,"ng-container",4),g.YNc(5,gt,3,1,"ng-template",null,5,g.W1O),g._UZ(7,"object-action-menu",6),g.qZA(),g.TgZ(8,"div",7),g.YNc(9,ut,2,2,"div",8),g.YNc(10,mt,3,7,"div",9),g.qZA()()()),2&t){const t=g.MAs(6);g.xp6(1),g.Q6J("system-overlay-loading-spinner",e.model.isSaving),g.xp6(2),g.Q6J("ngIf",e.hasNotification),g.xp6(1),g.Q6J("ngIf",e.headerFieldset)("ngIfElse",t),g.xp6(5),g.Q6J("ngIf",e.componentconfig.amount),g.xp6(1),g.Q6J("ngForOf",e.componentFields)}},dependencies:[i.mk,i.sg,i.O5,lt.q,nt.j,I.g,ot.Z,b.r,dt._],encapsulation:2,changeDetection:0}),SpiceKanbanTile})();const bt=["kanbanUtilityBar"];function _t(t,e){if(1&t&&(g.ynx(0),g.TgZ(1,"li",12)(2,"a",13)(3,"span",14),g._UZ(4,"system-utility-icon",15),g.qZA(),g.TgZ(5,"span",16),g._UZ(6,"system-label",17),g._uU(7),g.qZA()()(),g.BQk()),2&t){const t=e.$implicit,s=g.oxw();g.xp6(6),g.Q6J("label",s.getStageLabel(t.stagedata)),g.xp6(1),g.hij(" (",s.getStageCount(t.stagedata),")")}}function xt(t,e){if(1&t&&(g.TgZ(0,"li",24),g._UZ(1,"spice-kanban-sumfield",25),g.qZA()),2&t){const t=e.$implicit,s=g.oxw().$implicit,i=g.oxw(2);g.xp6(1),g.Q6J("symbol",i.getCurrencySymbol(t))("title",i.getTitle(t))("value",i.getStageSum(s.stagedata,t))}}const St=function(t){return{"slds-text-color--inverse-weak":t}};function vt(t,e){if(1&t&&(g.TgZ(0,"div",20)(1,"div",21)(2,"ul",22),g.YNc(3,xt,2,3,"li",23),g.qZA()()()),2&t){const t=g.oxw(2);g.Q6J("ngClass",t.sizeClass),g.xp6(1),g.Q6J("ngClass",g.VKq(3,St,t.modellist.isLoading)),g.xp6(2),g.Q6J("ngForOf",t.sumfields)}}function yt(t,e){if(1&t&&(g.TgZ(0,"div",18),g.YNc(1,vt,4,5,"div",19),g.qZA()),2&t){const t=g.oxw();g.xp6(1),g.Q6J("ngForOf",t.stages)}}function kt(t,e){if(1&t&&(g.TgZ(0,"div",28),g._UZ(1,"spice-kanban-tile",29),g.qZA()),2&t){const t=e.$implicit,s=g.oxw(2);g.Q6J("cdkDragDisabled",!s.allowDrag(t))("cdkDragData",t),g.xp6(1),g.Q6J("item",t)}}function Zt(t,e){if(1&t){const t=g.EpF();g.TgZ(0,"div",26),g.NdJ("cdkDropListDropped",(function(e){g.CHM(t);const s=g.oxw();return g.KtG(s.handleDrop(e))})),g.YNc(1,kt,2,3,"div",27),g.ALo(2,"spicekanbanstagepipe"),g.qZA()}if(2&t){const t=e.$implicit,s=g.oxw();g.Q6J("cdkDropListData",t)("cdkDropListEnterPredicate",s.dropEnterAllowed(t))("ngClass",s.sizeClass),g.xp6(1),g.Q6J("ngForOf",g.xi3(2,5,s.modellist.listData.list,t.stage))("ngForTrackBy",s.trackbyfn)}}function Dt(t,e){1&t&&g._UZ(0,"system-spinner")}function Tt(t,e){1&t&&(g.TgZ(0,"div",30)(1,"system-illustration-no-records"),g._UZ(2,"system-label",31),g.qZA()())}function Ct(t,e){if(1&t&&(g.TgZ(0,"option",51),g._UZ(1,"system-label-fieldname",52),g.qZA()),2&t){const t=e.$implicit,s=g.oxw(2);g.Q6J("value",t),g.xp6(1),g.Q6J("module",s.modellist.module)("field",t)}}function Ft(t,e){if(1&t&&(g.TgZ(0,"li",24),g._UZ(1,"spice-kanban-sumfield",25),g.qZA()),2&t){const t=e.$implicit,s=g.oxw().$implicit,i=g.oxw(2);g.xp6(1),g.Q6J("symbol",i.getCurrencySymbol(t))("title",i.getTitle(t))("value",i.getStageSum(s.stagedata,t))}}const wt=function(t){return{"slds-has-divider--right":t}};function Lt(t,e){if(1&t){const t=g.EpF();g.TgZ(0,"div",53),g.NdJ("cdkDropListDropped",(function(e){g.CHM(t);const s=g.oxw(2);return g.KtG(s.handleHiddenDrop(e))})),g.TgZ(1,"div",54)(2,"div",55),g._UZ(3,"system-label",17),g._uU(4),g.qZA(),g.TgZ(5,"ul",22),g.YNc(6,Ft,2,3,"li",23),g.qZA()()()}if(2&t){const t=e.$implicit,s=g.oxw(2);g.Q6J("cdkDropListData",t)("cdkDropListEnterPredicate",s.dropEnterAllowed(t)),g.xp6(2),g.Q6J("ngClass",g.VKq(6,wt,s.sumfields.length>0)),g.xp6(1),g.Q6J("label",s.getStageLabel(t.stagedata)),g.xp6(1),g.hij(" (",s.getStageCount(t.stagedata),")"),g.xp6(2),g.Q6J("ngForOf",s.sumfields)}}function Jt(t,e){if(1&t){const t=g.EpF();g.TgZ(0,"div",32)(1,"div",33,34)(3,"div",35)(4,"div",36)(5,"div",37)(6,"div",38)(7,"select",39),g.NdJ("ngModelChange",(function(e){g.CHM(t);const s=g.oxw();return g.KtG(s.sortField=e)}))("ngModelChange",(function(){g.CHM(t);const e=g.oxw();return g.KtG(e.modellist.reLoadList())})),g.TgZ(8,"option",40),g._UZ(9,"system-label",41),g.qZA(),g.YNc(10,Ct,2,3,"option",42),g.qZA()()(),g.TgZ(11,"div",43)(12,"div",38)(13,"select",44),g.NdJ("ngModelChange",(function(e){g.CHM(t);const s=g.oxw();return g.KtG(s.sortDirection=e)}))("ngModelChange",(function(){g.CHM(t);const e=g.oxw();return g.KtG(e.modellist.reLoadList())})),g.TgZ(14,"option",45),g._UZ(15,"system-label",46),g.qZA(),g.TgZ(16,"option",47),g._UZ(17,"system-label",48),g.qZA()()()()(),g.TgZ(18,"div",49),g.YNc(19,Lt,7,8,"div",50),g.qZA()()()()}if(2&t){const t=g.oxw();g.xp6(7),g.Q6J("ngModel",t.sortField),g.xp6(1),g.Q6J("selected",t.isDisabled)("hidden",""!=t.sortField),g.xp6(2),g.Q6J("ngForOf",t.sortfields),g.xp6(3),g.Q6J("disabled",t.isDisabled)("ngModel",t.sortDirection),g.xp6(6),g.Q6J("ngForOf",t.hiddenstages)}}let At=(()=>{class SpiceKanban{constructor(t,e,s,i,a,l,n,o,d){this.backend=t,this.broadcast=e,this.model=s,this.modellist=i,this.configuration=a,this.metadata=l,this.userpreferences=n,this.language=o,this.currency=d,this.componentconfig={},this.modellistsubscribe=void 0,this.stages=[],this.sumfields=[],this.hiddenstages=[],this.currencies=[],this.sortfields=[],this.loadLabel=!1,this.statusNetworkItems=[],this.statusField="",this.statusNetworkManaged=!1,this.componentconfig=this.metadata.getComponentConfig("SpiceKanban",this.modellist.module),this.currencies=this.currency.getCurrencies(),this.loadSortFields()}get sortField(){return _.isEmpty(this.modellist.sortArray)?"select":this.modellist.sortArray[0].sortfield}set sortField(t){_.isEmpty(this.modellist.sortArray)?this.modellist.sortArray.push({sortfield:t,sortdirection:this.sortDirection}):this.modellist.sortArray[0].sortfield=t}get isDisabled(){return"select"==this.sortField}get sortDirection(){return _.isEmpty(this.modellist.sortArray)?"ASC":this.modellist.sortArray[0].sortdirection}set sortDirection(t){this.modellist.sortArray[0].sortdirection=t}loadSortFields(){let t=this.metadata.getModuleDefs(this.modellist.module);t.ftssortable&&(this.sortfields=t.ftssortable.map((t=>t.field)))}loadStatusNetwork(){const t=this.metadata.checkStatusManaged(this.modellist.module);0!=t&&(this.statusField=t.statusField,this.statusNetworkItems=t.statusNetwork,this.statusNetworkManaged=!0)}ngOnInit(){this.loadStatusNetwork(),this.confdata=this.configuration.getData("spicebeanguides")[this.modellist.module];let t=this.confdata.stages,e=[];for(let s of t)"1"==s.stagedata.not_in_kanban?this.hiddenstages.push(s):this.stages.push(s),e.push({bucket:s.stagedata.secondary_stage?s.stagedata.stage+" "+s.stagedata.secondary_stage:s.stage,values:{},items:0,hidden:"1"==s.stagedata.not_in_kanban});if(this.componentconfig.sumfield){let t=this.componentconfig.sumfield.split(",");for(let e of t)e=e.trim(),e.includes(":")?this.sumfields.push({name:e.substr(0,e.indexOf(":")),function:e.substr(e.indexOf(":")+1)}):this.sumfields.push({name:e,function:"sum"})}_.isEmpty(this.modellist.buckets)&&(this.modellist.buckets={bucketfield:this.confdata.statusfield,buckettotal:this.sumfields,bucketitems:e},this.modellist.getListData()),this.modellist.loadlimit=25,this.modellistsubscribe=this.modellist.listType$.pipe((0,H.T)(1)).subscribe((t=>this.handleListTypeChange(t)))}ngOnDestroy(){this.modellistsubscribe.unsubscribe(),this.modellist.buckets={},this.modellist.setToSession()}handleListTypeChange(t){"SpiceKanban"==t.listcomponent&&this.modellist.reLoadList()}get draganddropenabled(){return!!this.componentconfig.draganddrop}trackbyfn(t,e){return e.id}getStageData(t){return this.stages.find((e=>t==e.stage)).stagedata}get sizeClass(){return"slds-size--1-of-"+this.stages.length}getStageCount(t){try{let e=t.secondary_stage?t.stage+" "+t.secondary_stage:t.stage,s=this.modellist.buckets.bucketitems.find((t=>t.bucket==e));return s?s.total:0}catch(t){return 0}}getStageSum(t,e){try{let s="_bucket_agg_"+e.name,i=t.secondary_stage?t.stage+" "+t.secondary_stage:t.stage,a=this.modellist.buckets.bucketitems.find((t=>t.bucket==i));for(let t in a.values){let e=a.values[t];if(t==s)return a.values?e:0}}catch(t){return 0}}getStageItems(t){let e=this.getStageData(t),s=[];for(let i of this.modellist.listData.list)i[e.statusfield]&&0==i[e.statusfield].indexOf(t)&&s.push(i);return s}getMoney(t){return this.userpreferences.formatMoney(parseFloat(t),0)}get hasVisibleItems(){let t=!1;if(this.modellist.buckets&&this.modellist.buckets.bucketitems)for(let e of this.modellist.buckets.bucketitems)if(this.stages.findIndex((t=>t.stage==e.bucket))>=0&&e.items>0){t=!0;break}return t}loadmore(){if(this.modellist.isLoading)return!1;let t=!1;for(let e of this.modellist.buckets.bucketitems)if(this.stages.findIndex((t=>t.stage==e.bucket))>=0&&e.total>e.items){t=!0;break}t&&this.modellist.loadMoreList()}getStageLabel(t){return t.stage_label?t.stage_label:t.stage_name}getCurrencySymbol(t){if("currency"==this.metadata.getFieldType(this.modellist.module,t.name)){let t,e=-99;return this.currencies.some((s=>{if(s.id==e)return t=s.symbol,!0})),t}}handleDrop(t){t.item.data[this.confdata.statusfield]!=t.container.data.stage&&(t.item.data._KanbanDrop={from:t.item.data[this.confdata.statusfield],to:t.container.data.stage},t.item.data[this.confdata.statusfield]=t.container.data.stage)}handleHiddenDrop(t){t.item.data[this.confdata.statusfield]!=t.container.data.stage&&(this.model.module=this.modellist.module,this.model.initialize(),this.model.id=t.item.data.id,this.model.setData(_.clone(t.item.data)),this.model.initializeFieldsStati(),this.model.startEdit(),this.model.setField(this.confdata.statusfield,t.container.data.stage),this.model.validate()?this.model.save():this.model.edit(),t.item.data[this.confdata.statusfield]=t.container.data.stage)}allowDrag(t){return this.draganddropenabled&&t.acl.edit&&(!this.statusNetworkManaged||this.statusNetworkItems.some((e=>t[this.statusField]==e.status_from)))}get containerStyle(){if(this.kanbanUtilityBar){return{"margin-bottom":this.kanbanUtilityBar.element.nativeElement.getBoundingClientRect().height+"px"}}return{}}getTitle(t){return this.language.getLabel("LBL_"+t.name.toUpperCase())}dropEnterAllowed(t){return e=>!this.statusNetworkManaged||this.statusNetworkItems.filter((e=>e.status_to==t.stage)).some((t=>t.status_from==e.data[this.statusField]))}}return SpiceKanban.ɵfac=function(t){return new(t||SpiceKanban)(g.Y36(k.y),g.Y36(V.f),g.Y36(m.o),g.Y36(p.t),g.Y36(u.C),g.Y36(Z.Pu),g.Y36(W.z),g.Y36(f.d),g.Y36(X.A))},SpiceKanban.ɵcmp=g.Xpm({type:SpiceKanban,selectors:[["spice-kanban"]],viewQuery:function(t,e){if(1&t&&g.Gf(bt,5,g.s_b),2&t){let t;g.iGM(t=g.CRH())&&(e.kanbanUtilityBar=t.first)}},features:[g._Bn([m.o])],decls:12,vars:7,consts:[[1,"slds-m-top--small","slds-m-horizontal--small"],["role","application",1,"slds-tabs--path"],["role","tablist",1,"slds-tabs--path__nav"],[4,"ngFor","ngForOf"],["class","slds-grid slds-border--bottom",4,"ngIf"],["cdkDropListGroup","",1,"slds-scrollable--y","kanbancontainer",3,"ngStyle","system-to-bottom"],[1,"slds-grid"],["cdkDropList","","class","slds-col slds-p-horizontal--xx-small slds-m-top--x-small",3,"cdkDropListData","cdkDropListEnterPredicate","ngClass","cdkDropListDropped",4,"ngFor","ngForOf"],[1,"slds-p-around--small"],[4,"ngIf"],["class","slds-height_full slds-align--absolute-center",4,"ngIf"],["class","slds-utility-bar_container","aria-label","Utility Bar",4,"ngIf"],["role","presentation",1,"slds-tabs--path__item","slds-is-incomplete"],["aria-selected","false","role","tab","href","javascript:void(0);","aria-live","assertive",1,"slds-tabs--path__link"],[1,"slds-tabs--path__stage"],["icon","check","size","x-small"],[1,"slds-tabs--path__title"],[3,"label"],[1,"slds-grid","slds-border--bottom"],["class","slds-col slds-p-horizontal--xx-small slds-m-top--x-small",3,"ngClass",4,"ngFor","ngForOf"],[1,"slds-col","slds-p-horizontal--xx-small","slds-m-top--x-small",3,"ngClass"],[1,"slds-text-heading--medium","slds-p-vertical--x-small",3,"ngClass"],[1,"slds-list_horizontal","slds-has-dividers_right","slds-align_absolute-center"],["class","slds-item",4,"ngFor","ngForOf"],[1,"slds-item"],[3,"symbol","title","value"],["cdkDropList","",1,"slds-col","slds-p-horizontal--xx-small","slds-m-top--x-small",3,"cdkDropListData","cdkDropListEnterPredicate","ngClass","cdkDropListDropped"],["cdkDrag","","class"," slds-m-vertical--xx-small slds-kanban-drag--preview ",3,"cdkDragDisabled","cdkDragData",4,"ngFor","ngForOf","ngForTrackBy"],["cdkDrag","",1,"slds-m-vertical--xx-small","slds-kanban-drag--preview",3,"cdkDragDisabled","cdkDragData"],[3,"item"],[1,"slds-height_full","slds-align--absolute-center"],["label","MSG_NO_RECORDS_FOUND"],["aria-label","Utility Bar",1,"slds-utility-bar_container"],[1,"slds-utility-bar",2,"height","3rem"],["kanbanUtilityBar",""],[1,"slds-grid","slds-size--1-of-1","slds-grid--align-spread"],[1,"slds-grid","slds-grid_vertical-align-center","slds-p-left--x-small"],[1,"slds-form-element__control","slds-col"],[1,"slds-select_container"],[1,"slds-select",3,"ngModel","ngModelChange"],["value","select",3,"selected","hidden"],["label","LBL_SELECT"],[3,"value",4,"ngFor","ngForOf"],[1,"slds-form-element__control","slds-col","slds-p-left--x-small"],[1,"slds-select",3,"disabled","ngModel","ngModelChange"],["value","ASC"],["label","LBL_ASCENDING"],["value","DESC"],["label","LBL_DESCENDING"],[1,"slds-utility-bar__item","slds-p-horizontal--x-small"],["cdkDropList","","class","slds-box--border slds-m-around--xxx-small slds-align--absolute-center slds-theme--info",3,"cdkDropListData","cdkDropListEnterPredicate","cdkDropListDropped",4,"ngFor","ngForOf"],[3,"value"],[3,"module","field"],["cdkDropList","",1,"slds-box--border","slds-m-around--xxx-small","slds-align--absolute-center","slds-theme--info",3,"cdkDropListData","cdkDropListEnterPredicate","cdkDropListDropped"],[1,"slds-p-horizontal--medium","slds-p-vertical--small","slds-grid"],[1,"slds-p-right--xx-small",3,"ngClass"]],template:function(t,e){1&t&&(g.TgZ(0,"div",0)(1,"div",1)(2,"ul",2),g.YNc(3,_t,8,2,"ng-container",3),g.qZA()(),g.YNc(4,yt,2,1,"div",4),g.TgZ(5,"div",5),g.NdJ("system-to-bottom",(function(){return e.loadmore()})),g.TgZ(6,"div",6),g.YNc(7,Zt,3,8,"div",7),g.qZA(),g.TgZ(8,"div",8),g.YNc(9,Dt,1,0,"system-spinner",9),g.qZA(),g.YNc(10,Tt,3,0,"div",10),g.YNc(11,Jt,20,7,"div",11),g.qZA()()),2&t&&(g.xp6(3),g.Q6J("ngForOf",e.stages),g.xp6(1),g.Q6J("ngIf",e.componentconfig.sumfield),g.xp6(1),g.Q6J("ngStyle",e.containerStyle),g.xp6(2),g.Q6J("ngForOf",e.stages),g.xp6(2),g.Q6J("ngIf",e.modellist.isLoading),g.xp6(1),g.Q6J("ngIf",!e.modellist.isLoading&&!e.hasVisibleItems),g.xp6(1),g.Q6J("ngIf",e.hiddenstages.length>0))},dependencies:[i.mk,i.sg,i.O5,i.PC,a.YN,a.Kr,a.EJ,a.JJ,a.On,tt.C,C._,et.h,st.W,b.r,it.H,l.Wj,l.Fd,l.Zt,G,ft,h],encapsulation:2}),SpiceKanban})(),Qt=(()=>{class ModuleSpicePath{}return ModuleSpicePath.ɵfac=function(t){return new(t||ModuleSpicePath)},ModuleSpicePath.ɵmod=g.oAB({type:ModuleSpicePath}),ModuleSpicePath.ɵinj=g.cJS({imports:[i.ez,a.u5,o.ObjectFields,d.GlobalComponents,c.ObjectComponents,r.SystemComponents,n.o,l._t]}),ModuleSpicePath})();("undefined"==typeof ngJitMode||ngJitMode)&&g.kYT(Qt,{declarations:[S,v,Q,$,z,h,G,At,ft],imports:[i.ez,a.u5,o.ObjectFields,d.GlobalComponents,c.ObjectComponents,r.SystemComponents,n.o,l._t]})}}]);