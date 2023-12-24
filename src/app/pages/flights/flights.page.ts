import { Component, OnInit } from '@angular/core';
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
    private modalController: ModalController) { }

  ngOnInit() {
    this.flightsService.getTickets().subscribe(data => {
      this.tickets = data
      this.filteredTickets = [...this.tickets];
      console.log(this.tickets)
    })
  }

  handleChange(event: any) {
    const query = event.target.value.toLowerCase();
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
  }

  async addTicket() {
    const modal = await this.modalController.create({
      component: FlightFormComponent,
      componentProps: { flight: {} },
      cssClass: 'custom-flight-modal'
    });

    await modal.present();
  }

  async editTicket(flight: any) {
    const modal = await this.modalController.create({
      component: FlightFormComponent,
      componentProps: { flight },
      cssClass: 'custom-flight-modal'
    });

    await modal.present();
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
            console.log('Deleting ticket with ID:', flightId);
          },
        },
      ],
    });

    return await popover.present();
  }

}
