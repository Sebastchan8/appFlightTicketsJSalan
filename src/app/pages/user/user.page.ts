import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlightsService } from 'src/app/services/flights.service';
import { ModalController } from '@ionic/angular';
import { SuccessModalComponent } from 'src/app/components/success-modal/success-modal.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  signForm!: FormGroup;
  showPassword: boolean = false;


  constructor(private formBuilder: FormBuilder,
    private flightsService:FlightsService,
    private modalController:ModalController) { }

  ngOnInit() {
    this.signForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      phone: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      address: ['', Validators.required],
      card: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password_confirm: ['', Validators.required],
    }, { validator: this.passwordMatchValidator });
    this.flightsService.getUserData().subscribe((data:any) => {
      this.signForm.patchValue(data)
      this.signForm.patchValue({password_confirm:data.password})
    })
  }

  
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('password_confirm')?.value;
    
    if (password !== confirmPassword) {
      formGroup.get('password_confirm')?.setErrors({ passwordMismatch: true });
    } else {
      formGroup.get('password_confirm')?.setErrors(null);
    }
  }
  
  onSubmit() {
    this.flightsService.updateUserData(this.signForm.value).subscribe(res => {
      this.presentSuccessModal()
    }, error => {
      this.presentFailedModal()
    })
  }

  async presentSuccessModal() {
    const modal = await this.modalController.create({
      component: SuccessModalComponent,
      cssClass: 'custom-success-modal',
      componentProps: {
        message: 'Updated successfully!',
        image: 'https://static-00.iconduck.com/assets.00/alert-success-icon-1024x1024-aobtkid4.png'
      },
    });
    await modal.present();
  }

  async presentFailedModal() {
    const modal = await this.modalController.create({
      component: SuccessModalComponent,
      cssClass: 'custom-success-modal',
      componentProps: {
        message: 'Email already in use!',
        image: 'https://www.shareicon.net/data/256x256/2015/09/15/101562_incorrect_512x512.png'
      },
    });
    await modal.present();
  }
}
