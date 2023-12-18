import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlightsService } from 'src/app/services/flights.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  departureFlight:any = {round:false}
  returnFlight:any = false
  adults!:number
  children!:number  
  round:boolean = false

  constructor(private flightsService:FlightsService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    let departure_id = this.route.snapshot.paramMap.get('departure_id') as string
    let return_id = this.route.snapshot.paramMap.get('return_id') as string
    let adults = parseInt(this.route.snapshot.paramMap.get('adults') as string)
    let children = parseInt(this.route.snapshot.paramMap.get('children') as string)
    let round = this.route.snapshot.paramMap.get('round') as string

    this.flightsService.getFlight(departure_id).subscribe(data => {
      this.adults = adults
      this.children = children
      this.departureFlight = data
      if(round === "true"){
        this.flightsService.getFlight(return_id).subscribe(data => {
          this.returnFlight = data
          this.round = true
        })
      }
    })
  }

}
