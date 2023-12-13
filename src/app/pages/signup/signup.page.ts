import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  signForm!: FormGroup;
  showPassword: boolean = false;


  constructor(private formBuilder: FormBuilder,) { }

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
    console.log('Formulario válido:', this.signForm.value);
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
}
