import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ModalController, AlertController } from '@ionic/angular';
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
  discountCode: string = ''; // Nuevo campo para el código de descuento
  discountApplied: number = 0; // Nuevo campo para almacenar el descuento aplicado

  constructor(private flightsService: FlightsService,
    private route: ActivatedRoute,
    public loadingController: LoadingController,
    private modalController: ModalController,
    private router: Router,
    private alertController: AlertController) { }

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

  applyDiscount() {
    var empresas_vuelos = [
      {"nombre": "Ecuador Green Travel", "codigo": "EGT123", "descuento":"5"},
      {"nombre": "Polimundo SA", "codigo": "PMS456", "descuento":"6"},
      {"nombre": "PROVITUR ", "codigo": "PVT789", "descuento":"6"},
      {"nombre": "Destino Ecuador", "codigo": "DEC234", "descuento":"5"},
      {"nombre": "Cite Tour", "codigo": "CTU567", "descuento":"8"}
  ]
    const discountInfo = empresas_vuelos.find(emp => emp.codigo === this.discountCode);
    if (discountInfo) {
      this.discountApplied = parseFloat(discountInfo.descuento);
    } else {
      this.discountApplied = 0;
      this.showAlert('Invalid discount code.');
    }
  }
  getDiscount() {
    return (this.getSubtotal() * this.discountApplied / 100).toFixed(2);
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
  getSubtotalWithDiscount() {
    const subtotal = this.getAdultSubtotal() + this.getChildSubtotal()
    return (subtotal - (subtotal * (this.discountApplied / 100)));
  }

  getTax() {
    const tax = Number(this.getSubtotalWithDiscount()) * 0.15;
    return Number(tax.toFixed(2));
  }

  getTotalWithDiscount() {
    const subtotalWithDiscount = this.getSubtotalWithDiscount();
    const tax = subtotalWithDiscount * 0.15;
    return subtotalWithDiscount + tax;
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
          total: this.getTotalWithDiscount()
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

  async showAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Invalid Discount Code',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
