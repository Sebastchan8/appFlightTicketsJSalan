import { Injectable } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { FilterComponent } from '../components/filter/filter.component';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(private popoverController: PopoverController) {}

  async presentFlightFilterPopover(event: Event) {
    const popover = await this.popoverController.create({
      component: FilterComponent,
      event: event,
      translucent: true,
    });
    return await popover.present();
  }
}
