import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterService } from 'src/app/services/filter.service';
import { FlightsService } from 'src/app/services/flights.service';
import { map } from 'rxjs/operators';

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
    this.cities = this.flightsService.getCities().pipe(
      map((citiesArray:any) => {
        for (let i = citiesArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [citiesArray[i], citiesArray[j]] = [citiesArray[j], citiesArray[i]];
        }
        return citiesArray;
      })
    );
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
