import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FilterService } from 'src/app/services/filter.service';
import { FlightsService } from 'src/app/services/flights.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  flights!:any
  round!:boolean

  constructor(private filterService:FilterService, 
              private flightsService: FlightsService,
              private navCtrl: NavController,
              private authService:AuthService) { }
  

  ngOnInit() {
    this.flightsService.getAvailableFlights(this.authService.getFilter()).subscribe((data:any) => {
      console.log("FILTRADO: ", data);
      
      this.round = data.round
      let array = data.flights
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      if(this.round){
        this.flights = array.filter((flight:any) => flight.round == true)
      }else{
        this.flights = array
      }
    })
  }

  public setChanges(){
    this.flightsService.getAvailableFlights(this.authService.getFilter()).subscribe((data:any) => {
      console.log("FILT CAMBIOS: ", data);
      
      this.round = data.round
      let array = data.flights
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      if(this.round){
        this.flights = array.filter((flight:any) => flight.round == true)
      }else{
        this.flights = array
      }
    })
  }

  openFlightFilterPopover(event: Event) {
    this.filterService.presentFlightFilterPopover(event);
  }

  goToReservation(ticket:any){
    this.navCtrl.navigateForward(['/reservation', { flight_id:ticket.flight_id, round:this.round }]);
  }
}
