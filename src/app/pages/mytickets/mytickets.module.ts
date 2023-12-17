import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyticketsPageRoutingModule } from './mytickets-routing.module';

import { MyticketsPage } from './mytickets.page';
import { NotificationModule } from 'src/app/components/notification/notification.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyticketsPageRoutingModule,
    NotificationModule,
  ],
  declarations: [MyticketsPage]
})
export class MyticketsPageModule {}
