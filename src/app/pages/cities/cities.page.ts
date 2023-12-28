import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { CityFormComponent } from 'src/app/components/city-form/city-form.component';
import { FlightsService } from 'src/app/services/flights.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.page.html',
  styleUrls: ['./cities.page.scss'],
})
export class CitiesPage implements OnInit {
  filteredCities: any[] = [];
  searchTerm: string = '';
  cities:any

  constructor(private flightsService:FlightsService,
    private alertController: AlertController,
    private modalController: ModalController,
    private router:Router) { }

  ngOnInit() {
    this.flightsService.getCities().subscribe(data => {
      this.cities = data
      this.filteredCities = [...this.cities];
    })
  }

  load(){
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/loading-admin', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  handleChange(event: any) {
    const query = event.target.value.toLowerCase();
    this.filteredCities = this.cities.filter((city: any) =>
      city.city.toLowerCase().includes(query) ||
      city.country.toLowerCase().includes(query) ||
      city.continent.toLowerCase().includes(query)
    );
  }

  async addCity() {
    const modal = await this.modalController.create({
      component: CityFormComponent,
      componentProps: { city:{} },
      cssClass: 'custom-success-modal'
    });

    await modal.present();
    const { data } = await modal.onDidDismiss()
    this.load()
  }

  async editCity(city: any) {
    const modal = await this.modalController.create({
      component: CityFormComponent,
      componentProps: { city },
      cssClass: 'custom-success-modal'
    });

    await modal.present();
    const { data } = await modal.onDidDismiss()
    this.load()
  }

  async presentDeleteAlert(cityId: number) {
    const popover = await this.alertController.create({
      header: 'Deleting city!',
      message: 'Do you really want to remove it?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'alert-button-cancel',
        },
        {
          text: 'OK',
          role: 'confirm',
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.flightsService.deleteCity(cityId).subscribe(data => {
              this.load()
            })
          },
        },
      ],
    });
  
    return await popover.present();
  }
  
}
