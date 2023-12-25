import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FlightsService } from 'src/app/services/flights.service';
import { ModalController } from '@ionic/angular';
import { SuccessModalComponent } from 'src/app/components/success-modal/success-modal.component';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  signForm!: FormGroup;
  showPassword: boolean = false;


  constructor(private formBuilder: FormBuilder,
    private flightsService:FlightsService,
    private authService:AuthService,
    private router: Router,
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
  }

  onSubmit() {
    this.flightsService.signup(this.signForm.value).subscribe((data:any) => {
      this.authService.login('user', data.insertId)
      this.router.navigate(['/home'])
    }, error => {
      this.presentSuccessModal()
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

  async presentSuccessModal() {
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
