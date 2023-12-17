import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [NotificationComponent],
  imports: [CommonModule, IonicModule.forRoot()],
  exports: [NotificationComponent],
})
export class NotificationModule {}
