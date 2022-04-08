import {Injectable} from "@angular/core";
import {CdkDropList} from "@angular/cdk/drag-drop";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {modal} from "../../../services/modal.service";
import {ColumnI, TagElementI, PanelElementI, SectionI} from "../interfaces/spicepagebuilder.interfaces";
import {InputRadioOptionI} from "../../../systemcomponents/interfaces/systemcomponents.interfaces";

/** @ignore */
declare var _;

@Injectable()
export class SpicePageBuilderService {
    /**
     * hold a response subject to emit the data to the page builder modal listener
     */
    public response = new BehaviorSubject<any>(null);
    /**
     * hold the unique dom id for the panel drop list
     */
    public contentListId: string;
    /**
     * hold the drag placeholder node to keep element in place while dragging
     */
    public dragPlaceholderNode: Node;
    /**
     * hold the drag placeholder node to keep element in place while dragging
     */
    public defaultPlaceholderHeight: number = 200;
    /**
     * hold the current hovered item type
     */
    public isMouseIn: 'section' | 'content';
    /**
     * page structure object
     */
    public page: TagElementI = {
        tagName: 'mjml',
        attributes: {},
        children: [
            {
                tagName: 'body',
                attributes: {
                    'background-color': '#ffffff',
                    'width': '550px'
                },
                children: []
            }
        ]
    };
    /**
     * hold the available content elements
     */
    public readonly panelElements: PanelElementI[] = [
        {
            tagName: 'text',
            label: 'LBL_TEXT',
            content: 'Write text here...',
            icon: 'text',
            attributes: {
                'font-size': '13px',
                'line-height': '14px',
                'padding': '4px',
                'container-background-color': '#ffffff'
            }
        },
        {
            tagName: 'image',
            label: 'LBL_IMAGE',
            icon: 'image',
            attributes: {
                align: 'center',
                padding: '4px',
                target: '_blank'
            }
        },
        {
            tagName: 'divider',
            label: 'LBL_DIVIDER',
            icon: 'dash',
            attributes: {
                'padding': '8px',
                'border-width': '2px',
                'width': '100%',
                'border-color': '#a2a2a2'
            }
        },
        {
            tagName: 'spacer',
            label: 'LBL_SPACER',
            icon: 'steps',
            attributes: {
                'height': '50px',
                'vertical-align': 'middle'
            }
        },
        {
            tagName: 'button',
            label: 'LBL_BUTTON',
            content: 'New Button',
            icon: 'link',
            attributes: {
                'border-radius': '4px',
                'background-color': '#ca1b21',
                'color': '#ffffff',
                'padding': '4px',
                'inner-padding': '4px',
                'width': '150px',
                'align': 'center',
                'font-size': '13px',
                'text-align': 'center',
                'line-height': '14px',
                'target': '_blank',
                'vertical-align': 'middle',
                'href': '#',
            }
        },
        {
            tagName: 'raw',
            label: 'LBL_HTML_CODE',
            content: 'Write code here...',
            icon: 'insert_tag_field',
            attributes: {}
        }

    ];
    /**
     * holds the panel default section
     */
    public readonly panelDefaultSection: SectionI = {
        tagName: 'section',
        children: [],
        attributes: {}
    };
    /**
     * holds the panel default column
     */
    public readonly panelDefaultColumn: ColumnI = {
        tagName: 'column',
        children: [],
        attributes: {}
    };
    /**
     * align radio options
     */
    public alignOptions: InputRadioOptionI[] = [
        {
            title: 'LBL_LEFT_ALIGN',
            icon: 'left_align_text',
            value: 'left',
        },
        {
            title: 'LBL_CENTER_ALIGN',
            icon: 'center_align_text',
            value: 'center',
        },
        {
            title: 'LBL_RIGHT_ALIGN',
            icon: 'right_align_text',
            value: 'right',
        }
    ];
    /**
     * holds the drop list group reference
     */
    public dropListGroup: any;
    /**
     * holds the default suffix
     */
    public defaultSuffix: 'px' | 'rem' = 'px';

    constructor(public modal: modal) {
        this.contentListId = _.uniqueId('panel-drop-list-');
    }

    /**
     * add drop list to group
     * @param dropList
     */
    public addDropListToGroup(dropList: CdkDropList) {
        if (this.dropListGroup && !this.dropListGroup._items.has(dropList)) {
            this.dropListGroup._items.add(dropList);
            this.dropListGroup._items.forEach(list => list._group = this.dropListGroup);
        }
    }

    /**
     * open media file picker modal and return the src of the image
     * @return src: string
     */
    public openMediaFilePicker(): Observable<string> {

        const response: Subject<string> = new Subject();

        this.modal.openModal('MediaFilePicker').subscribe(componentRef => {
            componentRef.instance.answer.subscribe(image => {

                if (!image) {
                    response.next(undefined);
                    response.complete();
                }

                if (image.upload) {
                    this.modal.openModal('MediaFileUploader').subscribe(uploadComponentRef => {
                        uploadComponentRef.instance.answer.subscribe(uploadimage => {
                            response.next(!uploadimage ? undefined : 'https://cdn.spicecrm.io/' + uploadimage);
                            response.complete();
                        });
                    });
                } else {
                    response.next(!image.id ? undefined : 'https://cdn.spicecrm.io/' + image.id);
                    response.complete();
                }
            });
        });

        return response.asObservable();
    }

    /**
     * emits the page data to the page builder listener
     */
    public emitData(isNull?: boolean) {
        this.response.next(!isNull ? this.page : null);
        this.response.complete();
    }
}
