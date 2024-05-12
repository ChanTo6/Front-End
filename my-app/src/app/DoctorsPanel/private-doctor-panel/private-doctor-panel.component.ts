import { Component } from '@angular/core';
import { Doctor } from '../../models/doctor.Model';
import { tap } from 'rxjs';
import { MyServiceService } from '../../Services/my-service.service';
import { LanguageService } from '../../Language/language-selector/language';

@Component({
  selector: 'app-private-doctor-panel',
  templateUrl: './private-doctor-panel.component.html',
  styleUrl: './private-doctor-panel.component.css'
})
export class PrivateDoctorPanelComponent {
  user: any;
  month : any;
  constructor(private service :MyServiceService,private languageService: LanguageService){}
  ngOnInit(): void {
    this.takeprofile();
    this.loadDoctors();
  }
  
  takeprofile(){
    const doctorID = localStorage.getItem('userId');
    if (doctorID) {
      this.service.getOnlyUsers(doctorID).pipe(
       tap((userData: any) => console.log(userData))
      ).subscribe(
        (userData: any) => {
          this.user = userData;
          console.log("GGG", this.user)
        },
        (error) => {
         // console.error('Error fetching user data:', error);
        }
      );
    }

    this.updateDisplayedMonth();
  }
  currentDate: Date = new Date();
  daysOfWeek: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  currentWeek: Date[] = []; 
  hours: string[] = [
    '10:00 - 11:00',
    '11:00 - 12:00',
    '12:00 - 13:00',
    '13:00 - 14:00',
    '14:00 - 15:00',
    '15:00 - 16:00',
    '16:00 - 17:00',
  ];



  generateCurrentWeek() {
    const startOfWeek = new Date(this.currentDate);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

    this.currentWeek = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(date.getDate() + i);
      this.currentWeek.push(date);
    }
    this.updateDisplayedMonth();
  }
  updateDisplayedMonth() {

    this.month=this.currentDate.toLocaleString('default', { month: 'long' });
  }

  nextWeek() {
    this.currentDate.setDate(this.currentDate.getDate() + 7);
    this.generateCurrentWeek();
  }

  previousWeek() {
    this.currentDate.setDate(this.currentDate.getDate() - 7);
    this.generateCurrentWeek();
  }
  uniqueDoctors: { bio: string, count: number }[] = [];
  doctors :Doctor[]=[];
  
  loadDoctors(): void {
    this.service.getDoctors().subscribe(
      (data: any[]) => {
        this.doctors = data;
        this.getUniqueDoctors();
      },
      (error: any) => {
        console.error('Error fetching doctors:', error);
      }
    );
  }
  
  getUniqueDoctors(): void {
    const bioCounts: { [key: string]: number } = {};
    this.doctors.forEach(doctor => {
      const bio = doctor.bio;
      bioCounts[bio] = (bioCounts[bio] || 0) + 1;
    });
  
    this.uniqueDoctors = Object.keys(bioCounts).map(bio => ({
      bio: bio,
      count: bioCounts[bio]
    }));
  }

  changeLanguage(lang: string) {
    this.languageService.setLanguage(lang);
  }
  
  getTranslation(key: string): string {
    return this.languageService.getTranslation(key);
  }






  selectedCells: { time: string, day: Date }[] = [];
  isCellSelected(time: string, day: Date): boolean {
    return this.selectedCells.some(cell => cell.time === time && this.isSameDay(cell.day, day));
  }
  
  isSameDay(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }
  isSelectedCell(time: string, day: Date): boolean {
    return this.selectedCells.some(cell => cell.time === time && cell.day.getTime() === day.getTime());
  }

  TakeTableDataFromApi() {
    const doctorId = sessionStorage.getItem('doctorID') || '';
    const personalID = localStorage.getItem('userId');
  
    if (!personalID) {
      console.error('User ID not found in local storage');
      return;
    }
  
    this.service.getOnlyUsers(personalID).subscribe(
      (x: any) => {
        const userId = x.personalID;
        this.service.TakeTableDataFromApiService(userId, doctorId).subscribe(
          (data: any[]) => {
            console.log(data);
            this.selectedCells = data.map(item => ({ time: item.timeRange, day: new Date(item.day) }));
          }
        );
      },
      (error: any) => {
        console.error('Error retrieving user data:', error);
      }
    );
  }
  
}
