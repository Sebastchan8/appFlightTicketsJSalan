import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { FlightFormComponent } from 'src/app/components/flight-form/flight-form.component';
import { FlightsService } from 'src/app/services/flights.service';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.page.html',
  styleUrls: ['./flights.page.scss'],
})
export class FlightsPage implements OnInit {

  filteredTickets: any[] = [];
  searchTerm: string = '';
  tickets: any

  constructor(private flightsService: FlightsService,
    private alertController: AlertController,
    private modalController: ModalController,
  ) { }

  router = inject(Router)
  ngOnInit() {
    this.flightsService.getTickets().subscribe(data => {
      this.tickets = data
      this.filteredTickets = [...this.tickets].sort(() => Math.random() - 0.5).slice(0, 20)
    })
  }

  handleChange(event: any) {
    const query = event.target.value.toLowerCase();
    if(query){
      this.filteredTickets = this.tickets.filter((ticket: any) =>
        (Array.isArray(ticket.flight_id) && ticket.flight_id.toString().toLowerCase().includes(query)) ||
        ticket.aeroline_name.toLowerCase().includes(query) ||
        ticket.departure_date.toLowerCase().includes(query) ||
        ticket.destination_city.toLowerCase().includes(query) ||
        ticket.destination_date.toLowerCase().includes(query) ||
        ticket.adult_price.toString().toLowerCase().includes(query) ||
        ticket.child_price.toString().toLowerCase().includes(query) ||
        ticket.adult_available.toString().toLowerCase().includes(query) ||
        ticket.child_available.toString().toLowerCase().includes(query) ||
        ticket.departure_city.toLowerCase().includes(query)
      );
    }else{
      this.filteredTickets = [...this.tickets].sort(() => Math.random() - 0.5).slice(0, 20)
    }
  }

  load() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/loading-admin', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  async addTicket() {
    const modal = await this.modalController.create({
      component: FlightFormComponent,
      componentProps: { flight: {} },
      cssClass: 'custom-flight-modal'
    });

    await modal.present();
    const { data } = await modal.onDidDismiss()
    this.load()
  }

  async editTicket(flight: any) {
    const modal = await this.modalController.create({
      component: FlightFormComponent,
      componentProps: { flight },
      cssClass: 'custom-flight-modal'
    });

    await modal.present();
    const { data } = await modal.onDidDismiss()
    this.load()
  }

  async presentDeleteAlert(flightId: number) {
    const popover = await this.alertController.create({
      header: 'Deleting flight!',
      message: 'Do you really want to remove it?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'alert-button-cancel',
        },
        {
          text: 'OK',
          role: 'confirm',
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.flightsService.deleteFlight(flightId).subscribe(data => {
              this.load()
            })
          },
        },
      ],
    });

    return await popover.present();
  }

}
