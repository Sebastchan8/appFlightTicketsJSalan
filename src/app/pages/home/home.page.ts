import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { FilterService } from 'src/app/services/filter.service';
import { FlightsService } from 'src/app/services/flights.service';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  cities!: Observable<any>;
  continent = '';

  constructor(
    private flightsService: FlightsService,
    private filterService: FilterService,
    private authService: AuthService,
    private router: Router,
    private platform: Platform
  ) { }

  ngOnInit() {
    this.cities = forkJoin([
      this.flightsService.getCities().pipe(
        map((citiesArray: any) => {
          for (let i = citiesArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [citiesArray[i], citiesArray[j]] = [citiesArray[j], citiesArray[i]];
          }
          return citiesArray;
        })
      ),
      this.getRecommendedCities()
    ]).pipe(
      map(([allCities, recommendedCities]) => [...allCities, ...recommendedCities])
    );
  }

  getRecommendedCities(): Observable<any> {
    return this.flightsService.getRecommendedCities(this.authService.currentUser()).pipe(
      map((citiesArray: any) => {
        return citiesArray.map((city: any) => ({ ...city, continent: 'Recommended' }));
      })
    );
  }

  segmentChanged(event: any) {
    const value = event.detail.value;

    if (value === 'all') {
      this.continent = '';
      return;
    }

    this.continent = value;
  }

  openFlightFilterPopover(event: Event) {
    this.filterService.presentFlightFilterPopover(event);
  }

  filterByCity(city_id: any) {
    this.authService.setFilter({
      departure_id: city_id,
      destination_id: city_id,
      round: false
    });
    this.router.navigate(['search']);
  }

  getDynamicSize(): string {
    const width = this.platform.width();

    if (width >= 992) {
      return '3';
    } else if (width >= 768) {
      return '4';
    } else {
      return '6';
    }
  }
}
