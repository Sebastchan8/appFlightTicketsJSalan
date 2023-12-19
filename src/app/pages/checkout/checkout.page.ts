import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { SuccessModalComponent } from 'src/app/components/success-modal/success-modal.component';
import { FlightsService } from 'src/app/services/flights.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  departureFlight: any = { round: false }
  returnFlight: any = { round: false }
  adults!: number
  children!: number
  round: boolean = false
  fullname!: string
  creditCard!: string

  constructor(private flightsService: FlightsService,
    private route: ActivatedRoute,
    public loadingController: LoadingController,
    private modalController: ModalController,
    private router:Router) { }

  ngOnInit() {
    let departure_id = this.route.snapshot.paramMap.get('departure_id') as string
    let return_id = this.route.snapshot.paramMap.get('return_id') as string
    let adults = parseInt(this.route.snapshot.paramMap.get('adults') as string)
    let children = parseInt(this.route.snapshot.paramMap.get('children') as string)
    let round = this.route.snapshot.paramMap.get('round') as string
    this.flightsService.getUserData().subscribe((data: any) => {
      this.fullname = data.name + ' ' + data.lastname
      this.creditCard = this.getCardFormat(data.card)

      this.flightsService.getFlight(departure_id).subscribe(data => {
        this.adults = adults
        this.children = children
        this.departureFlight = data

        if (round === "true") {
          this.flightsService.getFlight(return_id).subscribe(data => {
            this.returnFlight = data
            this.round = true
          })
        }
      })
    })
  }

  getCardFormat(card: string) {
    return "XXXX - XXXX - XXXX - XX" + card.substring(14, 16)
  }

  getAdultSubtotal() {
    if (this.round) {
      return this.adults * (this.departureFlight.adult_price + this.returnFlight.adult_price)
    }
    return this.adults * this.departureFlight.adult_price
  }

  getChildSubtotal() {
    if (this.round) {
      return this.children * (this.departureFlight.child_price + this.returnFlight.child_price)
    }
    return this.children * this.departureFlight.child_price
  }

  getSubtotal() {
    return this.getAdultSubtotal() + this.getChildSubtotal()
  }

  getTax() {
    return this.getSubtotal() * 0.12
  }

  getTotal() {
    return this.getSubtotal() + this.getTax()
  }

  alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      cssClass: 'alert-button-cancel'
    },
    {
      text: 'OK',
      role: 'confirm',
      cssClass: 'alert-button-confirm',
      handler: () => {
        //BUY TICKET
        this.presentLoading();
      },
    },
  ];

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Booking in process...',
      duration: 2000,
    });

    await loading.present();
    await loading.onDidDismiss();

    this.presentSuccessModal();
  }

  async presentSuccessModal() {
    const modal = await this.modalController.create({
      component: SuccessModalComponent,
      cssClass: 'custom-success-modal',
      componentProps: {
        message: 'Ticket booked successfully!',
        image: 'https://static-00.iconduck.com/assets.00/alert-success-icon-1024x1024-aobtkid4.png'
      },
    });
    this.router.navigate(['/mytickets'])
    await modal.present();
  }
}
