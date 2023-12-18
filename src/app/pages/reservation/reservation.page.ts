import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlightsService } from 'src/app/services/flights.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
})
export class ReservationPage implements OnInit {

  departureFlight:any = {round:false}

  returnFlights!:any
  selectedFlight:any = false
  round:any = false

  constructor(private flightsService:FlightsService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    let flight_id = this.route.snapshot.paramMap.get('flight_id') as string
    let round = this.route.snapshot.paramMap.get('round') as string

    this.flightsService.getFlight(flight_id).subscribe(data => {
      this.departureFlight = data
      if(round === "true"){
        this.flightsService.getRoundFlights(flight_id).subscribe(data => {
          this.returnFlights = data
          this.selectedFlight = this.returnFlights[0];
          this.round = true
        })
      }
    })
    
  }

  adultsNumber: number = 1
  childrenNumber: number = 0

  addAdult() {
    this.adultsNumber++;
  }

  decAdult() {
    if (this.adultsNumber > 0) {
      this.adultsNumber--;
    }
  }

  addChild() {
    this.childrenNumber++;
  }

  decChild() {
    if (this.childrenNumber > 0) {
      this.childrenNumber--;
    }
  }

  goToCheckout(){

  }

}
