import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterService } from 'src/app/services/filter.service';
import { FlightsService } from 'src/app/services/flights.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  cities!: Observable<any>
  continent = ''

  constructor(private flightsService:FlightsService,
              private filterService:FilterService) { }

  ngOnInit() {
    this.cities = this.flightsService.getCities()    
  }

  segmentChanged(event:any){
    const value = event.detail.value

    if(value === 'all'){
      this.continent = ''
      return
    }

    this.continent = value
  }

  openFlightFilterPopover(event: Event) {
    this.filterService.presentFlightFilterPopover(event);
  }
}
