import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FilterService } from 'src/app/services/filter.service';
import { FlightsService } from 'src/app/services/flights.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  flights!:any

  constructor(private filterService:FilterService, 
              private flightsService: FlightsService,
              private navCtrl: NavController) { }

  ngOnInit() {
    this.flightsService.getAvailableFlights().subscribe(data => {
      this.flights = data
    })
  }

  openFlightFilterPopover(event: Event) {
    this.filterService.presentFlightFilterPopover(event);
  }

  goToReservation(ticket:any){
    this.navCtrl.navigateForward(['/reservation', { flight_id:ticket.flight_id, round:ticket.round }]);
  }
}
