import { Component, OnInit } from '@angular/core';
import { FlightsService } from 'src/app/services/flights.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
})
export class ReservationPage implements OnInit {

  departureFlight:any = {
    "flight_id":1,
    "aeroline_name":"Avianca",
    "aeroline_img":"https://media.staticontent.com/media/pictures/70a7eb77-8187-4cdb-bfd2-59c48268d3cf/605x107",
    "departure_city":"Ambato",
    "departure_date":"23/12/2023 09:00",
    "destination_city":"Barcelona",
    "destination_date":"24/12/2023 13:00",
    "adult_price":400,
    "child_price":200,
    "adult_available":100,
    "child_available":50,
    "round":true
  }

  returnFlights!:any
  selectedFlight: any;

  constructor(private flightsService:FlightsService) { }

  ngOnInit() {
    this.flightsService.getAvailableFlights().subscribe(data => {
      this.returnFlights = data
      this.selectedFlight = this.returnFlights[0];
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
