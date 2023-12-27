import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlightsService } from 'src/app/services/flights.service';
import { ModalController } from '@ionic/angular'; // Asegúrate de importar el ModalController

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {

  notifications!: any;

  constructor(
    private flightsService: FlightsService,
    private router: Router,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.flightsService.getNotifications().subscribe(data => {
      this.notifications = data;
    });
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

  navigateToMytickets() {
    this.router.navigate(['/mytickets']);
    this.closeModal();
  }

}
