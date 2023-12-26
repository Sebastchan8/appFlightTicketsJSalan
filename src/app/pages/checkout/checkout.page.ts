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
    private router: Router) { }

  ngOnInit() {
    let departure_id = this.route.snapshot.paramMap.get('departure_id') as string
    let return_id = this.route.snapshot.paramMap.get('return_id') as string
    let adults = parseInt(this.route.snapshot.paramMap.get('adults') as string)
    let children = parseInt(this.route.snapshot.paramMap.get('children') as string)
    let round = this.route.snapshot.paramMap.get('round') as string
    this.flightsService.getUserData().subscribe((data: any) => {
      this.fullname = data.firstname + ' ' + data.lastname
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
    const departurePrice = parseFloat(this.departureFlight.adult_price);

    if (this.round) {
      const returnPrice = parseFloat(this.returnFlight.adult_price);
      return this.adults * (departurePrice + returnPrice);
    }

    return this.adults * departurePrice;
  }


  getChildSubtotal() {
    const departureChildPrice = parseFloat(this.departureFlight.child_price);

    if (this.round) {
      const returnChildPrice = parseFloat(this.returnFlight.child_price);
      return this.children * (departureChildPrice + returnChildPrice);
    }

    return this.children * departureChildPrice;
  }


  getSubtotal() {
    const sub = this.getAdultSubtotal() + this.getChildSubtotal()
    return Number(sub.toFixed(2));
  }

  getTax() {
    const tax = this.getSubtotal() * 0.12;
    return Number(tax.toFixed(2));
  }

  getTotal() {
    const total = this.getSubtotal() + this.getTax();
    return Number(total.toFixed(2));
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

        this.flightsService.buyTicket({
          departure_flight_id: this.departureFlight.flight_id,
          return_flight_id: this.returnFlight.flight_id,
          adults: this.adults,
          children: this.children,
          total: this.getTotal()
        }).subscribe(data => {
          this.presentLoading();
        })
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
