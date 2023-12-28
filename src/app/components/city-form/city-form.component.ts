import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { FlightsService } from 'src/app/services/flights.service';

@Component({
  selector: 'app-city-form',
  templateUrl: './city-form.component.html',
  styleUrls: ['./city-form.component.scss'],
})
export class CityFormComponent implements OnInit {

  @Input() city: any

  cityForm: FormGroup
  
  constructor(private formBuilder: FormBuilder,
    private modalController: ModalController,
    private fligthsService:FlightsService) {
    this.cityForm = this.formBuilder.group({
      id: [''],
      city: ['', Validators.required],
      country: ['', Validators.required],
      continent: ['', Validators.required],
      img: ['', Validators.required]
    })
  }

  ngOnInit(){
    if (this.city) {
      this.cityForm.patchValue(this.city)
    }
  }

  ngOnChanges() {
    if (this.city) {
      this.cityForm.patchValue(this.city)
    }
  }

  onSubmit() {
    const city = this.cityForm.value
    if(this.city.city){
      this.fligthsService.updateCity(city).subscribe(data =>{})
    }else{
      delete city.id
      this.fligthsService.addCity(city).subscribe(data =>{})
    }
    this.dismiss()
  }

  dismiss() {
    this.modalController.dismiss()
  }

}
