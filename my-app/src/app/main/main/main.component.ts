import { Component, OnInit } from '@angular/core';
import { MyServiceService } from '../../Services/my-service.service';
import { Doctor } from '../../models/doctor.Model';
import { Router } from '@angular/router';
import { LanguageService } from '../../Language/language-selector/language';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {

  constructor(private service :MyServiceService ,private router :Router,private languageService: LanguageService){}
  uniqueDoctors: { bio: string, count: number }[] = [];
  uniqueDoctors2: { bio: string, count: number }[] = [];
  doctors: Doctor[] = [];
  doctors2: Doctor[] = [];

  
  ngOnInit(): void {
    this.fetchDoctorsData();
  }

  fetchDoctorsData(): void {
    this.service.getDoctors().subscribe(
      (data: Doctor[]) => {
        this.doctors = data;
        this.uniqueDoctors = this.getUniqueDoctors(this.doctors);
      },
      (error: any) => console.error('Error fetching doctors:', error)
    );

    this.service.getUsers().subscribe(
      (data: any) => {
        this.doctors2 = data.filter((doctor: any) => doctor.registerByAdmin && !doctor.email.endsWith('@admin.com'));
        this.uniqueDoctors2 = this.getUniqueDoctors(this.doctors2);
      },
      (error: any) => console.error('Error fetching users:', error)
    );
  }

  private getUniqueDoctors(doctors: Doctor[]): { bio: string, count: number }[] {
    const bioCounts: { [key: string]: number } = {};
    doctors.forEach(doctor => {
      const bio = doctor.bio;
      bioCounts[bio] = (bioCounts[bio] || 0) + 1;
    });

    return Object.keys(bioCounts).map(bio => ({ bio, count: bioCounts[bio] }));
  }
  getDoctor(doctor: Doctor): void {
    this.router.navigate(['/doctors', doctor.doctorID]);
    sessionStorage.setItem('doctorID', doctor.doctorID);
    console.log('Selected Doctor ID:', doctor.doctorID);
    
  }

  changeLanguage(lang: string) {
    this.languageService.setLanguage(lang);
  }
  
  getTranslation(key: string): string {
    return this.languageService.getTranslation(key);
  }
}
