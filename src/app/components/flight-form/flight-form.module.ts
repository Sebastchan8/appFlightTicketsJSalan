import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightFormComponent } from './flight-form.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FlightFormComponent],
  imports: [CommonModule, IonicModule.forRoot(), FormsModule, ReactiveFormsModule],
  exports: [FlightFormComponent],
})
export class FlightFormModule {}