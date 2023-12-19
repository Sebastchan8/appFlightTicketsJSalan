import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckoutPageRoutingModule } from './checkout-routing.module';

import { CheckoutPage } from './checkout.page';
import { NotificationModule } from 'src/app/components/notification/notification.module';
import { SuccessModalModule } from 'src/app/components/success-modal/success-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckoutPageRoutingModule,
    NotificationModule,
    SuccessModalModule
  ],
  declarations: [CheckoutPage,]
})
export class CheckoutPageModule {}
