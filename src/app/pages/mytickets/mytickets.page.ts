import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FlightsService } from 'src/app/services/flights.service';

@Component({
  selector: 'app-mytickets',
  templateUrl: './mytickets.page.html',
  styleUrls: ['./mytickets.page.scss'],
})
export class MyticketsPage implements OnInit {

  reservations: any

  constructor(private flightsService:FlightsService,
              private alertController: AlertController) { }

  ngOnInit() {
    this.flightsService.getUserTickets().subscribe(data => {
      this.reservations = data
    })
  }

  getStatusColor(value:any){
    if(value == '1'){
      return 'success'
    }else if(value == '0'){
      return 'warning'
    }
    return 'medium'
  }

  getStatusText(value:any){
    if(value == '1'){
      return 'Success'
    }else if(value == '0'){
      return 'Pending'
    }
    return 'Cancelled'
  }

  async presentCancelAlert(reservationId: number) {
    const alert = await this.alertController.create({
      header: 'Cancelling tickets!',
      message: 'Are you sure you want to cancel it?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'alert-button-cancel'
        },
        {
          text: 'OK',
          role: 'confirm',
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.handleBookingConfirmation(reservationId);
          },
        },
      ],
    });
  
    await alert.present();
  }
  
  handleBookingConfirmation(reservationId: number) {
    console.log('Reservation ID:', reservationId);
  }
}
