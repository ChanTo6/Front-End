import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './registerFolder/register/register.component'; 
import { AdmimprofileComponent } from './admin/admimprofile/admimprofile.component';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main/main.component';
import { UserProfileComponent } from './user-profile/user-profile/user-profile.component';
import { DoctorPanelComponent } from './doctors/doctor-panel/doctor-panel.component';
import { PrivateDoctorPanelComponent } from './DoctorsPanel/private-doctor-panel/private-doctor-panel.component';


const routes: Routes = [

  { path: 'register', component: RegisterComponent }, 
   {path: 'admin', component:AdmimprofileComponent}, 
  {path: 'main', component:MainComponent },
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'doctors/:doctorId', component: DoctorPanelComponent },
  {path : 'doctorPanel', component:PrivateDoctorPanelComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
