import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonModal, ModalController } from '@ionic/angular';
import { FlightsService } from 'src/app/services/flights.service';
import { OverlayEventDetail } from '@ionic/core/components';
import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-flight-form',
  templateUrl: './flight-form.component.html',
  styleUrls: ['./flight-form.component.scss'],
})
export class FlightFormComponent implements OnInit {

  @Input() flight: any

  flightForm!: FormGroup

  constructor(private formBuilder: FormBuilder,
    private modalController: ModalController,
    private flightsService: FlightsService,) {
    this.flightForm = this.formBuilder.group({
      flight_id: [''],
      departure_city: ['', Validators.required],
      destination_city: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.flightsService.getCities().subscribe((data) => {
      this.cities = data as []
      this.results = this.cities

      this.flightsService.getAerolines().subscribe(date => {
        this.aerolines = date
        this.selectedAeroline = this.aerolines[0].aeroline_name

        if (this.flight.flight_id) {
          this.flightForm.patchValue(this.flight)
          this.selectedDepartureCity = this.flight.departure_city_id
          this.selectedDestinationCity = this.flight.destination_city_id
          this.selectedAeroline = this.flight.aeroline_name
          this.adultsNumber = this.flight.adult_available
          this.childrenNumber = this.flight.child_available
          this.adultsPrice = this.flight.adult_price
          this.childrenPrice = this.flight.child_price

          let departureDate = new Date(this.flight.departure_date)
          this.departureDateValue = format(departureDate, 'yyyy-MM-dd HH:mm').replace(/ /g, 'T')
          this.departureDateString = format(parseISO(this.departureDateValue), 'yyyy-MM-dd HH:mm')


          let returnDate = new Date(this.flight.destination_date)
          this.returnDateValue = format(returnDate, 'yyyy-MM-dd HH:mm').replace(/ /g, 'T')
          this.returnDateString = format(parseISO(this.returnDateValue), 'yyyy-MM-dd HH:mm')
        }
      })
    })
    console.log("Flight: ", this.flight)
  }

  ngOnChanges() {
    if (this.flight) {
      this.flightForm.patchValue(this.flight)
    }
  }

  onSubmit() {
    const flight_id = this.flightForm.value.flight_id
    let flightObj:any = {
      "aeroline_name":this.selectedAeroline,
      "departure_city_id": this.selectedDepartureCity,
      "destination_city_id": this.selectedDestinationCity,
      "departure_date": this.departureDateString,
      "destination_date": this.returnDateString,
      "adult_price": this.adultsPrice,
      "child_price": this.childrenPrice,
      "adult_available": this.adultsNumber,
      "child_available": this.childrenNumber,
    }
    if (flight_id) {
      flightObj.flight_id = flight_id;
      this.flightsService.updateFlight(flightObj).subscribe(data =>{})
    } else {
      this.flightsService.addFlight(flightObj).subscribe(data =>{})
    }
    this.dismiss()
  }

  dismiss() {
    this.modalController.dismiss()
  }

  //------------------------

  @ViewChild('departureModal') departureModal!: IonModal;
  @ViewChild('destinationModal') destinationModal!: IonModal;

  cities!: any[]
  results!: any[]
  selectedDepartureCity!: number;
  selectedDestinationCity!: number;

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
      this.flightForm.patchValue({
        departure_city: this.cities.find(city => city.id === ev.detail.data).city
      });
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
      this.flightForm.patchValue({
        destination_city: this.cities.find(city => city.id === ev.detail.data).city
      });
    }
  }

  handleChange(event: any) {
    const query = event.target.value.toLowerCase();
    this.results = this.cities.filter(city => city.city.toLowerCase().indexOf(query) > -1);
  }

  currentDate = new Date()
  minDate = this.currentDate

  departureDateValue = format(this.currentDate, 'yyyy-MM-dd HH:mm')
  departureDateString = format(parseISO(this.departureDateValue), 'yyyy-MM-dd HH:mm');

  departureDateChanged(value: any) {
    this.departureDateValue = value
    this.departureDateString = format(parseISO(value), 'yyyy-MM-dd HH:mm')
  }

  returnDateValue = format(new Date().setDate(new Date().getDate() + 1), 'yyyy-MM-dd HH:mm')
  returnDateString = format(parseISO(this.returnDateValue), 'yyyy-MM-dd HH:mm')

  returnDateChanged(value: any) {
    this.returnDateValue = value
    this.returnDateString = format(parseISO(value), 'yyyy-MM-dd HH:mm')
  }

  adultsNumber: number = 100
  childrenNumber: number = 50
  adultsPrice: number = 200
  childrenPrice: number = 100

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

  addAdultPrice() {
    this.adultsPrice++
  }

  decAdultPrice() {
    if (this.adultsPrice > 0) {
      this.adultsPrice--;
    }
  }

  addChildPrice() {
    this.childrenPrice++
  }

  decChildPrice() {
    if (this.childrenPrice > 0) {
      this.childrenPrice--;
    }
  }


  closePopoverAndNavigate() {
    this.dismiss()
    // this.router.navigate(['search'])
  }

  aerolines!: any
  selectedAeroline!: any
}
