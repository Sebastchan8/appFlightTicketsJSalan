import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FlightsService } from 'src/app/services/flights.service';
import { ModalController } from '@ionic/angular';
import { SuccessModalComponent } from 'src/app/components/success-modal/success-modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm!: FormGroup;
  showPassword: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private flightsService: FlightsService,
    private modalController:ModalController
  ) { }
  authService = inject(AuthService)

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    const { email, password } = this.loginForm.value

    this.flightsService.login(email, password).subscribe((data: any) => {

      if (data.user.user_id) {
        this.loginForm.setValue({email:'', password:''})

        if (email === 'a@a'){
          this.authService.login('admin', data.user.user_id)
          this.router.navigate(['/loading-admin'])
        }
        else{
          this.authService.login('user', data.user.user_id)
          this.router.navigate(['/loading'])
        }
      }
      
    }, error => {
      this.presentSuccessModal()
    })
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async presentSuccessModal() {
    const modal = await this.modalController.create({
      component: SuccessModalComponent,
      cssClass: 'custom-success-modal',
      componentProps: {
        message: 'Please, verify your data!',
        image: 'https://www.shareicon.net/data/256x256/2015/09/15/101562_incorrect_512x512.png'
      },
    });
    await modal.present();
  }

}
