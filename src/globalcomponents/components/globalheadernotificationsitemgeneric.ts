/**
 * @module GlobalComponents
 */
import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {NotificationI} from "../../services/interfaces.service";
import {notification} from "../../services/notification.service";

/**
 * display a notification item for assignment type
 */
@Component({
    selector: 'global-header-notifications-item-generic',
    templateUrl: '../templates/globalheadernotificationsitemgeneric.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlobalHeaderNotificationsItemGeneric implements OnInit {
    /**
     * holds the notification data
     */
    @Input() public notification: NotificationI;
    /**
     * if true render the box template for new pushed notifications
     */
    @Input() public asBox: boolean = false;

    ngOnInit(): void {
        console.log(this.notification)
    }

    constructor(public notificationService: notification) {
    }
}
