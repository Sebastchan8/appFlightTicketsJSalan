import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { InputComponent } from './input/input.component';
import { ButtonComponent } from './button/button.component';
import { IconButtonComponent } from './icon-button/icon-button.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NotificationComponent } from './notification/notification.component';


@NgModule({
  declarations: [InputComponent, ButtonComponent, IconButtonComponent],
  imports: [CommonModule, IonicModule,ReactiveFormsModule,],
  exports: [InputComponent, ButtonComponent, IconButtonComponent],
})
export class SharedModule {}
