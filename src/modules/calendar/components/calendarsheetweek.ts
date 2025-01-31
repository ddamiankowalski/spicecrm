/**
 * @module ModuleCalendar
 */
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnChanges,
    OnDestroy,
    QueryList,
    Renderer2,
    SimpleChanges,
    ViewChild,
    ViewChildren,
    ViewContainerRef
} from '@angular/core';
import {language} from '../../../services/language.service';
import {calendar} from '../services/calendar.service';
import {CdkDragEnd} from "@angular/cdk/drag-drop";
import {CalendarSheetDropTarget} from "./calendarsheetdroptarget";
import {Subscription} from "rxjs";

/**
 * @ignore
 */
declare var moment: any;

/**
 * Display calendar events in week view
 */
@Component({
    selector: 'calendar-sheet-week',
    templateUrl: '../templates/calendarsheetweek.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarSheetWeek implements OnChanges, OnDestroy {
    /**
     * holds the sheet days moment object
     */
    public sheetDays: any[] = [];
    /**
     * holds sheet hours
     */
    public sheetHours: any[] = [];
    /**
     * children reference of the drop targets
     */
    @ViewChildren(CalendarSheetDropTarget) public dropTargets: QueryList<CalendarSheetDropTarget>;
    /**
     * container reference for the main div
     */
    @ViewChild('sheetContainer', {read: ViewContainerRef, static: true}) public sheetContainer: ViewContainerRef;
    /**
     * element reference for the scrollbar
     */
    @ViewChild('scrollContainer', {read: ViewContainerRef, static: true}) public scrollContainer: ViewContainerRef;
    /**
     * the change date comes from the parent
     */
    @Input() public setdate: any = {};
    /**
     * holds a boolean of google events visibility
     */
    @Input() public groupwareVisible: boolean = true;
    /**
     * holds the owner multi events
     */
    public ownerMultiEvents: any[] = [];
    /**
     * holds the google multi events
     */
    public groupwareMultiEvents: any[] = [];
    /**
     * holds the owner events
     */
    public ownerEvents: any[] = [];
    /**
     * holds the users events
     */
    public userEvents: any[] = [];
    /**
     * holds the users multi events
     */
    public userMultiEvents: any[] = [];
    /**
     * holds the google events
     */
    public groupwareEvents: any[] = [];
    /**
     * subscription to handle unsubscribe
     */
    public subscription: Subscription = new Subscription();
    /**
     * holds the resize listener
     */
    public resizeListener: any;

    constructor(public language: language,
                public cdRef: ChangeDetectorRef,
                public renderer: Renderer2,
                public calendar: calendar) {
        this.buildHours();
        this.buildSheetDays();
        this.subscribeToChanges();
    }

    /**
     * @return moment.timeZone
     */
    get offset() {
        return moment.tz(this.calendar.timeZone).format('z Z');
    }

    /**
     * @return allEvents: [ownerEvents, userEvents, groupwareEvents]
     */
    get allEvents() {
        return this.calendar.arrangeEvents(this.ownerEvents.concat(this.userEvents, this.groupwareEvents));
    }

    /**
     * @return allEvents: [ownerMultiEvents, userMultiEvents, groupwareMultiEvents]
     */
    get allMultiEvents() {
        return this.ownerMultiEvents.concat(this.userMultiEvents, this.groupwareMultiEvents);
    }

    /**
     * @return sheetTimeWidth: number
     */
    get sheetTimeWidth() {
        return this.calendar.sheetTimeWidth;
    }

    /**
     * @return startDate: moment
     */
    get startDate() {
        return new moment(this.setdate).day(this.calendar.weekStartDay).hour(this.calendar.startHour).minute(0).second(0);
    }

    /**
     * @return endDate: moment
     */
    get endDate() {
        return new moment(this.startDate).add(moment.duration((this.calendar.weekDaysCount - 1), 'd')).hour(this.calendar.endHour);
    }

    /**
     * @return width: string
     */
    get dayWidthStyle() {
        return {width: `calc(100% / ${this.calendar.weekDaysCount})`};
    }

    /**
     * handle input changes to load events
     * @param changes
     */
    public ngOnChanges(changes: SimpleChanges) {
        this.buildSheetDays();
        if (changes.setdate) {
            this.getOwnerEvents();
            this.getUsersEvents();
        }
        if (changes.groupwareVisible || changes.setdate) {
            this.getGroupwareEvents();
        }
    }

    /**
     * unsubscribe from subscriptions
     */
    public ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    /**
     * A function that defines how to track changes for items in the iterable (ngForOf).
     * https://angular.io/api/common/NgForOf#properties
     * @param index
     * @param item
     * @return item.id
     */
    public trackByItemFn(index, item) {
        return item.id;
    }

    /**
     * A function that defines how to track changes for items in the iterable (ngForOf).
     * https://angular.io/api/common/NgForOf#properties
     * @param index
     * @param item
     * @return index
     */
    public trackByIndexFn(index, item) {
        return index;
    }

    /**
     * build sheet days
     */
    public buildSheetDays() {
        this.sheetDays = [];
        let d = 0;
        let dayIndex = this.calendar.weekStartDay;

        while (d < this.calendar.weekDaysCount) {
            let focDate = new moment(this.setdate);
            focDate.day(dayIndex);
            this.sheetDays.push({
                index: d,
                date: moment(focDate),
                day: dayIndex,
                color: this.isToday(moment(focDate)) ? this.calendar.todayColor : '#000000',
                dateTextDayShort: moment(focDate).format('ddd'),
                dateTextDayNumber: moment(focDate).format('D'),
                items: []
            });
            d++;
            dayIndex++;
        }
    }

    /**
     * set all events style
     */
    public setEventsStyle() {
        this.allEvents.forEach(event =>
            this.setEventStyle(event)
        );
        this.cdRef.detectChanges();
    }

    /**
     * @param event: object
     * @return style: object
     */
    public setEventStyle(event) {
        const startday = this.calendar.weekStartDay == 1 && event.start.day() == 0 ? 6 : event.start.day() - this.calendar.weekStartDay;
        const startminutes = (event.start.hour() - this.calendar.startHour) * 60 + event.start.minute();
        const endminutes = (event.end.hour() - this.calendar.startHour) * 60 + event.end.minute();
        const scrollOffset = this.scrollContainer.element.nativeElement.getBoundingClientRect().width;
        const sheetWidth = this.sheetContainer.element.nativeElement.clientWidth - scrollOffset;
        const itemWidth = ((sheetWidth - this.sheetTimeWidth) / this.calendar.weekDaysCount) / (event.maxOverlay > 0 ? event.maxOverlay : 1);
        const left = this.sheetTimeWidth + ((sheetWidth - this.sheetTimeWidth) / this.calendar.weekDaysCount * startday) + (itemWidth * event.displayIndex);
        const top = this.calendar.sheetHourHeight / 60 * startminutes;
        const height = this.calendar.sheetHourHeight / 60 * (endminutes - startminutes);

        event.style = {
            'left': left + 'px',
            'width': itemWidth + 'px',
            'top': top + 'px',
            'height': height + 'px',
            'min-height': this.calendar.multiEventHeight + 'px'
        };
    }

    /**
     * set all multi events style
     */
    public setMultiEventsStyle() {
        this.allMultiEvents.forEach(event =>
            this.setMultiEventStyle(event)
        );
        this.cdRef.detectChanges();
    }

    /**
     * set multi event style
     * @param event: object
     * @return style: object
     */
    public setMultiEventStyle(event): any {
        let eventI = null;
        const scrollOffset = this.scrollContainer.element.nativeElement.getBoundingClientRect().width;
        const sheetWidth = this.sheetContainer.element.nativeElement.clientWidth - scrollOffset;
        const multiEventsContainerWidth = (sheetWidth - this.sheetTimeWidth) / this.calendar.weekDaysCount;
        const weekStartDate = moment(moment(this.setdate).day(this.calendar.weekStartDay).hour(this.calendar.startHour).format('YYYY-MM-DD HH:00:00'));
        const weekEndDate = moment(moment(weekStartDate).add(moment.duration(this.calendar.weekDaysCount, 'd')).hour(this.calendar.endHour));
        const eventStart = event.start.isBefore(weekStartDate) ? weekStartDate : event.start;
        const eventEnd = event.end.isAfter(weekEndDate) ? weekEndDate : event.end;
        const startDateDifference = ((+event.start.diff(weekStartDate, 'days') > 0) ? +event.start.diff(weekStartDate, 'days') : 0);
        const left = startDateDifference * multiEventsContainerWidth;
        const max = this.calendar.weekDaysCount - startDateDifference;
        const eventLength = Math.abs(eventEnd.diff(eventStart, 'days')) + (eventEnd.hour() > eventStart.hour() || eventEnd.minute() > eventStart.minute() ? 1 : 0);
        const width = (eventLength > max ? max : eventLength) * multiEventsContainerWidth;

        this.sheetDays.some(day => {
            if (day.events.indexOf(event) > -1) {
                eventI = day.events.indexOf(event);
                return true;
            }
        });
        event.style = {
            width: width + "px",
            left: left + "px",
            height: this.calendar.multiEventHeight + "px",
            top: (this.calendar.multiEventHeight * eventI) + "px",
        };
    }

    /**
     * display date by input format
     * @param format
     * @param date
     * @return date formatted
     */
    public displayDate(format, date) {
        return date.format(format);
    }

    /**
     * @reset sheetHours
     * @build sheetHours
     * @set sheetHours
     */
    public buildHours() {
        this.sheetHours = [];
        let i = this.calendar.startHour;
        while (i <= this.calendar.endHour) {
            this.sheetHours.push(i);
            i++;
        }
    }

    /**
     * navigate to selected date
     * @param dayOfWeek: number
     */
    public gotoDay(dayOfWeek) {
        if (this.calendar.asPicker) return;
        this.calendar.gotToDayView(moment(dayOfWeek.format()));
    }

    /**
     * @param date: moment
     * @return color: string
     */
    public isToday(date: any) {
        let today = new moment();
        return today.year() === date.year() && today.month() === date.month() && today.date() == date.date();
    }

    /**
     * subscribe to user calendar changes
     * subscribe to resize event to reset the events style
     */
    public subscribeToChanges() {
        this.subscription.add(
            this.calendar.layoutChange$.subscribe(() => {
                this.buildSheetDays();
                this.arrangeMultiEvents();
                this.setEventsStyle();
                this.setMultiEventsStyle();
            })
        );
        this.subscription.add(this.calendar.userCalendarChange$.subscribe(calendar => {
                if (calendar.id == 'owner') {
                    this.getOwnerEvents();
                } else {
                    this.getUserEvents(calendar);
                }
            })
        );
        this.resizeListener = this.renderer.listen('window', 'resize', () => {
            this.setEventsStyle();
            this.setMultiEventsStyle();
        });
    }

    /**
     * sort allMultiEvents
     */
    public arrangeMultiEvents() {

        this.sheetDays.forEach(day => day.events = []);

        for (let event of this.allMultiEvents) {
            for (let day of this.sheetDays) {
                for (let eventDay = moment(event.start); eventDay.diff(event.end) <= 0; eventDay.add(1, 'days')) {
                    if (eventDay.date() == day.date.date() && !day.events.some(itemsEvent => itemsEvent.id == event.id)) {
                        day.events.push(event);
                    }
                }
            }
        }
        this.sheetDays.forEach(day => {
            day.events = day.events.filter(event => (event.hasOwnProperty("visible") && event.visible) || !event.hasOwnProperty("visible"));
            day.events.sort((a, b) => {
                if (a.start.isBefore(b.start)) {
                    return -1;
                } else if (a.start.diff(a.end, 'days') < b.start.diff(b.end, 'days')) {
                    return -1;
                }
                return 0;
            });
        });
        this.allMultiEvents.forEach(event => {
            let itemIdx = null;
            this.sheetDays.forEach(day => {
                day.events.forEach((item, idx) => {
                    if (item.id == event.id) {
                        if (itemIdx != null && event.end.diff(event.start, 'days') > 0) {
                            day.events.splice(idx, 1);
                            day.events.splice(itemIdx, 0, event);
                        } else {
                            itemIdx = idx;
                        }
                    }
                });
            });
        });

        this.cdRef.detectChanges();
    }

    /**
     * correct the start and end hours for the event preview
     * @return events
     */
    public correctHours(events) {
        events.map(event => {
            if (!event.isMulti) {
                let endInRange = event.end.hour() > this.calendar.startHour && event.start.hour() < this.calendar.startHour;
                let startInRange = event.start.hour() < this.calendar.endHour && event.end.hour() > this.calendar.endHour;
                if (endInRange) {
                    event.start = event.start.hour(this.calendar.startHour).minute(0);
                }
                if (startInRange) {
                    event.end = event.end.hour(this.calendar.endHour).minute(59);
                }
            }
        });
        return events;
    }

    /**
     * load owner events from service and rearrange the multi events
     */
    public getOwnerEvents() {
        this.ownerEvents = [];
        this.ownerMultiEvents = [];
        this.arrangeMultiEvents();

        if (!this.calendar.ownerCalendarVisible) return this.setEventsStyle();

        this.calendar.loadEvents(this.startDate, this.endDate)
            .subscribe(events => {
                if (events.length > 0) {
                    events = this.correctHours(events);
                    events = this.filterEvents(events);
                    this.ownerEvents = events.filter(event => !event.isMulti);
                    this.ownerMultiEvents = events.filter(event => event.isMulti);
                    this.arrangeMultiEvents();
                    this.setEventsStyle();
                    this.setMultiEventsStyle();
                }
            });
    }

    /**
     * load google events from service and rearrange the multi events
     */
    public getGroupwareEvents() {
        this.groupwareEvents = [];
        this.groupwareMultiEvents = [];
        this.arrangeMultiEvents();
        if (!this.groupwareVisible || this.calendar.isMobileView) {
            return this.setEventsStyle();
        }

        this.calendar.loadGroupwareEvents(this.startDate, this.endDate)
            .subscribe(events => {
                if (events.length > 0) {
                    events = this.correctHours(events);
                    events = this.filterEvents(events);
                    this.groupwareEvents = events.filter(event => !event.isMulti);
                    this.groupwareMultiEvents = events.filter(event => event.isMulti);
                    this.arrangeMultiEvents();
                    this.setEventsStyle();
                    this.setMultiEventsStyle();
                }
            });
    }

    /**
     * load other user events from service and rearrange the multi events
     */
    public getUserEvents(calendar) {
        this.userEvents = this.userEvents.filter(event => event.data.assigned_user_id != calendar.id &&
            (!event.data.meeting_user_status_accept || !event.data.meeting_user_status_accept.beans[calendar.id]));

        this.userMultiEvents = this.userMultiEvents.filter(event => event.data.assigned_user_id != calendar.id &&
            (!event.data.meeting_user_status_accept || !event.data.meeting_user_status_accept.beans[calendar.id]));
        this.arrangeMultiEvents();

        if (this.calendar.isMobileView || !calendar.visible) {
            return this.setEventsStyle();
        }

        this.calendar.loadUserEvents(this.startDate, this.endDate, calendar.id)
            .subscribe(events => {
                if (events.length > 0) {
                    events = this.correctHours(events);
                    events = this.filterEvents(events);
                    events.forEach(event => {
                        if (!event.isMulti) {
                            this.userEvents.push(event);
                        } else {
                            this.userMultiEvents.push(event);
                            this.arrangeMultiEvents();
                        }
                    });
                    this.setEventsStyle();
                    this.setMultiEventsStyle();
                }
            });
    }

    /**
     * load other users events from service and rearrange the multi events
     */
    public getUsersEvents() {
        this.userEvents = [];
        this.userMultiEvents = [];
        this.arrangeMultiEvents();
        if (this.calendar.isMobileView) {
            return this.setEventsStyle();
        }

        this.calendar.loadUsersEvents(this.startDate, this.endDate)
            .subscribe(events => {
                if (events.length > 0) {
                    events = this.correctHours(events);
                    events = this.filterEvents(events);
                    events.forEach(event => {
                        if (!event.isMulti) {
                            this.userEvents.push(event);
                        } else {
                            this.userMultiEvents.push(event);
                            this.arrangeMultiEvents();
                        }
                    });
                    this.setEventsStyle();
                    this.setMultiEventsStyle();
                }
            });

    }

    /**
     * filter the out of range events or the absence events
     * @return events
     */
    public filterEvents(events) {
        return events.filter(event => event.end.hour() > this.calendar.startHour || event.start.hour() < this.calendar.endHour || ('absence' == event.type));
    }

    /**
     * @param dragEvent: CdkDragEnd
     * call calendar.onEventDrop and pass the dropTargets reference for this sheet
     */
    public onEventDrop(dragEvent: CdkDragEnd) {
        this.calendar.onEventDrop(dragEvent, this.dropTargets);
    }
}
