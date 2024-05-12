import { ChangeDetectorRef, Component, OnInit,} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MyServiceService } from './Services/my-service.service';
import { LanguageService } from './Language/language-selector/language';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

})
export class AppComponent implements OnInit {
  constructor(private router: Router, private service :MyServiceService,private languageService: LanguageService) { }
  ngOnInit(){

    }
    changeLanguage(lang: string) {
      this.languageService.setLanguage(lang);
    }
    
    getTranslation(key: string): string {
      return this.languageService.getTranslation(key);
    }

    register :boolean =false
showRegisterComponent(){;
  this.router.navigate(['/register']);
}
goToMain(){
  this.router.navigate(['/main']);
}

  formData = {
    name: '',
    email: '',
    personalNumber: '',
    surname: '',
    password: ''
  };
  popup :boolean =false;

  toggleAuthorizationPopup() {
   this.popup =!this.popup;
  }
  
  registerUser(registrationForm: NgForm) {
    console.log('Form submitted:', this.formData);
  }
 
  closePopup() {
    this.popup = false;
  }


  logout(): void {
    this.router.navigate(['/main']);
    localStorage.clear();

  }

  handleLoginStatus(): boolean {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    const isDoctor = localStorage.getItem('isDoctor');
    const isAdmin = localStorage.getItem('isAdmin');

    if (storedIsLoggedIn === 'true') {
      this.popup = false; 
      return false;
    } else if (isDoctor === 'true') {
      return false;
    } else if (isAdmin === 'true') {
      return false;
    } else {
      return true;
    }
  }

  isAdmin(): boolean {
    return localStorage.getItem('isAdmin') === 'true';
  }

  isDoctor(): boolean {
    return localStorage.getItem('isDoctor') === 'true';
  }

  getPanelText(): string {
    if (this.isAdmin()) {
    
      return 'Admin pane';
    } else if (this.isDoctor()) {
      return 'doctor panel';
    } else {
      return 'user'; 
    }
  }
  
  goToUserProfile() {
    const panelText = this.getPanelText();
    if (panelText === 'Admin pane') {
      this.router.navigate(['/admin']);
    } else if (panelText === 'doctor panel') {
      this.router.navigate(['/doctorPanel']);
    } else {
      this.router.navigate(['/user-profile']);
    }
  }

  

  }
  