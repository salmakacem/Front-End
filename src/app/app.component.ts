import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationCancel, NavigationEnd } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { filter } from 'rxjs/operators';

import { MessagingService } from './service/messaging.service';

declare let $: any;



@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [
        Location, {
            provide: LocationStrategy,
            useClass: PathLocationStrategy
        }
    ]
})
export class AppComponent implements OnInit {
    [x: string]: any;
    location: any;
    routerSubscription: any;
    title = 'push-notification';
    message;


    constructor(private router: Router, private messagingService: MessagingService) {
    }





    ngOnInit() {
       //this.recallJsFuntions();

        this.messagingService.requestPermission();
        this.messagingService.receiveMessage();
        this.message = this.messagingService.currentMessage;

    }

}