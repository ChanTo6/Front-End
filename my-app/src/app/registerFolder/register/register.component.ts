import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyServiceService } from '../../Services/my-service.service';
import { Register } from '../../models/register.model';
import { register } from 'module';
import { LanguageService } from '../../Language/language-selector/language';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private service :MyServiceService, private languageService: LanguageService) { }
  RegisterMassive :Register[] =[];
  message: string = '';

  registrationForm!: FormGroup;
  newRegister :any ={
    name: '',
    surname: '',
    email: '',
    id: '',
    password: '',
    PersonalID: '',
    VerificationCodeGeneratedTime: new Date(),
    verificationCode: null,
    registerByAdmin: false
  }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      surname: [''],
      email: ['', [Validators.required, Validators.email]],
      PersonalID: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      password: ['', [Validators.required, this.passwordValidator]],
      id: [''],
    });
  }


  passwordValidator(control: AbstractControl): { [key: string]: any } | null {
    const value: string = control.value;
    const hasNumber = /[0-9]/.test(value);
    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    const valid = hasNumber && hasUpper && hasLower && hasSymbol && value.length >= 8;
    return valid ? null : { 'invalidPassword': true };
  }
  registerUser() {
    if (this.registrationForm.valid) {
      const newRegister = this.registrationForm.value;
      this.service.registerUser(newRegister)
        .subscribe({
          next: (register) => {
            this.message = 'When you decide to log in to your account, you will receive a verification code.';
            console.log(register);
          },
          error: (error) => {
            console.error('გამოყენებულია უკვე', error);
          }
        });
    } else {
      this.validateAllFormFields(this.registrationForm);
    }
  }
  
  validateAllFormFields(formGroup: FormGroup | null) {
    if (formGroup === null) {
      return;
    }
  
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else {
        control?.markAsTouched({ onlySelf: true });
      }
    });
  }
  
  changeLanguage(lang: string) {
    this.languageService.setLanguage(lang);
  }
  
  getTranslation(key: string): string {
    return this.languageService.getTranslation(key);
  }
}