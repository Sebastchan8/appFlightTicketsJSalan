import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { NavFilterPipe } from 'src/app/pipes/nav-filter.pipe';
import { NotificationComponent } from 'src/app/components/notification/notification.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,    
  ],
  declarations: [HomePage, NavFilterPipe, NotificationComponent]
})
export class HomePageModule {}
