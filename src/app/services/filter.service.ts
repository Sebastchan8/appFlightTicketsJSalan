import { Injectable } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { FilterComponent } from '../components/filter/filter.component';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private popover: HTMLIonPopoverElement | null = null;

  constructor(private popoverController: PopoverController) { }

  async presentFlightFilterPopover(event: Event) {
    this.popover = await this.popoverController.create({
      component: FilterComponent,
      event: event,
      translucent: true,
    });

    await this.popover.present();
  }

  closeFlightFilterPopover() {
    if (this.popover) {
      this.popover.dismiss();
      this.popover = null;
    }
  }
}
