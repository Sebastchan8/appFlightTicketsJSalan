import { Component, OnInit } from '@angular/core';
import { FlightsService } from 'src/app/services/flights.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent  implements OnInit {

  notifications!:any
  constructor(private flightsService:FlightsService) { }

  ngOnInit() {
    this.flightsService.getNotifications().subscribe(data => {
      this.notifications = data
    })
  }

}
