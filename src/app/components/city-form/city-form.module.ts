import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityFormComponent } from './city-form.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CityFormComponent],
  imports: [CommonModule, IonicModule.forRoot(), FormsModule, ReactiveFormsModule],
  exports: [CityFormComponent],
})
export class CityFormModule {}