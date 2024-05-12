import { Component, EventEmitter, Output } from '@angular/core';
import { MyServiceService } from '../../Services/my-service.service';
import {  Router } from '@angular/router';
import { LanguageService } from '../../Language/language-selector/language';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {
  @Output() closePopup = new EventEmitter<void>();
  @Output() loggedIn: EventEmitter<void> = new EventEmitter<void>();
  constructor(private service: MyServiceService,private router: Router,private languageService: LanguageService ){}
  showNewPasswordFields: boolean = false;
  emailSent: boolean = false;
  verificationCodeSentTime: number = 0;
errorMessage: string = '';
errorMessage2 :string ="Cannot change password. Please wait for 5 minutes before trying again"
  close() {
    this.closePopup.emit();
  }
  
  changePassword(email: string, verificationCode: string, password: string, repeatPassword: string) :void {
    const elapsedTime = Date.now() - this.verificationCodeSentTime;
    if (elapsedTime < 300000) {
     // console.error('Cannot change password. Please wait for 5 minutes before trying again.');
      return;
    }
    if (password !== repeatPassword) {
        console.error('Passwords do not match.');
        return;
    } 
    this.service.passwordChange(email, verificationCode, password)
    .subscribe(
        () => {
            console.log('Password changed successfully.');
        },
        (error) => {
            console.error("პოპაბში ერორი2 ");
        }
    );
}

login(email: string, password: string, verificationCode: string): void {
  if (!email || !password || !verificationCode) {
    console.error('Email, password, and verification code are required');
    return;
  }

  this.service.login(email, password, verificationCode)
    .subscribe(
      (response: any) => {
        localStorage.setItem('isLoggedIn', 'true');
        const isAdmin: boolean = response.isAdmin; 
        const userId: string = response.id;
        const doctor : string = response.Id
        
        localStorage.setItem('userId', userId);
        if (email.endsWith('@admin.com')) {
          console.log('Is admin');
          localStorage.setItem('isAdmin', 'true');
          this.router.navigate(['/admin']);
        } else if (isAdmin && !email.endsWith('@admin.com')) {
          console.log("GGG", doctor);
          localStorage.setItem('isDoctor', 'true');
          this.router.navigate(['/main']);
        } else {
          console.log('Is regular user');
          localStorage.setItem('isRegularUser', 'true');
          this.router.navigate(['/user-profile']);
        }

        this.loggedIn.emit();
      },
      (error) => {
        console.error('Login failed:', error);
        console.log('Error status:', error.status);
        console.log('Error body:', error.error);
        alert('An error occurred during login. Please try again.');
      }
    );
}

  sendVerificationCode(email:any) {
    const elapsedTime = Date.now() - this.verificationCodeSentTime;
    if (elapsedTime < 1800000) {
      console.error('30 წუთის განმავშლობაში არ გაიგზავნება ვერიფიკაციის კოდი');
      return;
    }
    const emailData = {
      to: email,
    };

    this.service.sendVerificationCode(emailData).subscribe(
      response => {
        console.log('Activation email sent successfully!', response);
        this.emailSent = true;
        this.errorMessage = ''; 
        this.verificationCodeSentTime = Date.now();
      },
      error => {
        console.error('Error sending activation email:', error);
        this.emailSent = false;
        this.errorMessage = 'Error sending activation email. Please try again later.';
      }
    );
  }
 

  

  passwordRecovery(){
    this.showNewPasswordFields = !this.showNewPasswordFields;
  }
  changeLanguage(lang: string) {
    this.languageService.setLanguage(lang);
  }
  
  getTranslation(key: string): string {
    return this.languageService.getTranslation(key);
  }
  }
