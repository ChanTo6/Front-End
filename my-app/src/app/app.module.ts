import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration} from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopupComponent } from './popup/popup/popup.component';
import { AppRoutingModule } from './app-routing.module';
import { RegisterComponent } from './registerFolder/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './main/main/main.component';
import { UserProfileComponent } from './user-profile/user-profile/user-profile.component';
import { AdmimprofileComponent } from './admin/admimprofile/admimprofile.component';
import { DoctorPanelComponent } from './doctors/doctor-panel/doctor-panel.component';
import { PrivateDoctorPanelComponent } from './DoctorsPanel/private-doctor-panel/private-doctor-panel.component';
import { DatePipe } from '@angular/common';




@NgModule({
  declarations: [
    AppComponent,
    PopupComponent,
    RegisterComponent,
    MainComponent,
    UserProfileComponent,
    AdmimprofileComponent,
    DoctorPanelComponent,
    PrivateDoctorPanelComponent,


  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    
  ],
  providers: [
    provideClientHydration(),
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
