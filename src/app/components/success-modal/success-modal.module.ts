import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuccessModalComponent } from './success-modal.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [SuccessModalComponent],
  imports: [CommonModule, IonicModule.forRoot()],
  exports: [SuccessModalComponent],
})
export class SuccessModalModule {}