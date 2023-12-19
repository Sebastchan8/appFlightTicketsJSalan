import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.scss'],
})
export class SuccessModalComponent  implements OnInit {

  constructor(private modalController: ModalController) { }
  @Input() message!:string;
  @Input() image!:string;
  
  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss();
  }
}
