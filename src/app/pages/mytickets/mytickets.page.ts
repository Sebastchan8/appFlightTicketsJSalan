import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FlightsService } from 'src/app/services/flights.service';
import { ModalController } from '@ionic/angular';
import { SuccessModalComponent } from 'src/app/components/success-modal/success-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mytickets',
  templateUrl: './mytickets.page.html',
  styleUrls: ['./mytickets.page.scss'],
})
export class MyticketsPage implements OnInit {

  reservations: any

  constructor(private flightsService:FlightsService,
              private alertController: AlertController,
              private modalController: ModalController,
              private router:Router) { }

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
            this.flightsService.cancelTicket(reservationId).subscribe(data => {
              this.flightsService.getUserTickets().subscribe(data => {
                this.reservations = data
                this.presentSuccessModal()
              })
            })
          },
        },
      ],
    });
  
    await alert.present();
  }

  async presentSuccessModal() {
    const modal = await this.modalController.create({
      component: SuccessModalComponent,
      cssClass: 'custom-success-modal',
      componentProps: {
        message: 'Ticket cancelled successfully!',
        image: 'https://static-00.iconduck.com/assets.00/alert-success-icon-1024x1024-aobtkid4.png'
      },
    });
    await modal.present();
  }
}
