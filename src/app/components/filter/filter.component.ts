import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FlightsService } from 'src/app/services/flights.service';
import { IonModal, PopoverController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { format, parseISO } from 'date-fns';
import { FilterService } from 'src/app/services/filter.service';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @ViewChild('departureModal') departureModal!: IonModal;
  @ViewChild('destinationModal') destinationModal!: IonModal;

  cities!: any[]
  results!: any[]
  selectedDepartureCity!: number;
  selectedDestinationCity!: number;

  departure: string = 'Departure'
  destination: string = 'Destination'

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private flightsService: FlightsService,
    private popoverController: PopoverController) { }

  filterPopover = inject(FilterService)

  ngOnInit() {
    this.flightsService.getCities().subscribe((data) => {
      this.cities = data as []
      this.results = this.cities
    })
  }

  setInitialResults() {
    this.results = this.cities
  }

  cancelDeparture() {
    this.departureModal.dismiss(null, 'cancel');
  }

  confirmDeparture() {
    this.departureModal.dismiss(this.selectedDepartureCity, 'confirm');
  }

  onDepartureDismiss(event: any) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.departure = this.cities.find(city => city.id === ev.detail.data).city
    }
  }

  cancelDestination() {
    this.destinationModal.dismiss(null, 'cancel');
  }

  confirmDestination() {
    this.destinationModal.dismiss(this.selectedDestinationCity, 'confirm');
  }

  onDestinationDismiss(event: any) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.destination = this.cities.find(city => city.id === ev.detail.data).city
    }
  }

  handleChange(event: any) {
    const query = event.target.value.toLowerCase();
    this.results = this.cities.filter(city => city.city.toLowerCase().indexOf(query) > -1);
  }

  currentDate = format(new Date(), 'yyyy-MM-dd') + 'T09:00:00.000Z'
  minDate = this.currentDate
  maxDate = '2024-01-31' //setted from flights data


  departureDateValue = this.currentDate
  departureDateString = format(parseISO(this.departureDateValue), 'yyyy-MM-dd')

  departureDateChanged(value: any) {
    this.departureDateValue = value
    this.departureDateString = format(parseISO(value), 'yyyy-MM-dd')
  }


  returnDateValue = format(new Date().setDate(new Date().getDate() + 1), 'yyyy-MM-dd') + 'T09:00:00.000Z'
  returnDateString = format(parseISO(this.returnDateValue), 'yyyy-MM-dd')

  returnDateChanged(value: any) {
    this.returnDateValue = value
    this.returnDateString = format(parseISO(value), 'yyyy-MM-dd')
  }

  round: boolean = false

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

  closePopoverAndNavigate() {
    this.filterPopover.closeFlightFilterPopover()
    this.router.navigate(['search'])
  }

  getSearchBtnAvailability(){
    return (this.adultsNumber == 0 && this.childrenNumber == 0)
    || this.departure === "Departure" || this.destination === "Destination"
  }

}
