import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../models/register.model';
import {  Observable,catchError, finalize, tap, throwError} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MyServiceService {


  baseAPi : string = "https://localhost:7049";

  constructor(private http: HttpClient) { }

  sendTimeData(personalID: number, doctorId: string, time: string, day: string): Observable<any> {
    const timeData = [{
      personalID: personalID,
      DoctorId: doctorId,
      TimeRange: time,
      Day: day,
      StartTime: time.split(' - ')[0], // Extract start time from time range
      EndTime: time.split(' - ')[1] // Extract end time from time range
    }];
    console.log(timeData);
    return this.http.post<any>(`${this.baseAPi}/api/Hospital/timedata`, timeData, { headers: { 'Content-Type': 'application/json' } })
      .pipe(
        catchError((error: any) => {
          console.error('Error sending time data:', error);
          return throwError('An error occurred while sending time data.');
        })
      );
  }
  
  TakeTableDataFromApiService(userId: number, doctorId: string): Observable<any> {
    return this.http.get<any>(`${this.baseAPi}/api/Hospital/timedata?userId=${userId}&doctorId=${doctorId}`);
  }


  deletePerson(personalId: string) {
    return this.http.delete<any>(this.baseAPi + '/api/Hospital/' + personalId, { responseType: 'text' as 'json' })
      .pipe(
        catchError(error => {
          let errorMessage = 'An error occurred while deleting the account.';
          if (error.error instanceof ErrorEvent) {
            // Client-side error
            errorMessage = error.error.message;
          } else {
            // Server-side error
            errorMessage = error.error || 'Unknown error occurred.';
          }
          console.error(errorMessage);
          return throwError(errorMessage);
        })
      );
  }
  
  updateUser(user: any): Observable<Register> {
    return this.http.put<any>(`${this.baseAPi}/api/hospital/${user.id}`, user);
  }
  
  registerUser(newRegister : Register): Observable<Register> {
    newRegister.id ="00000000-0000-0000-0000-000000000000";
    
     return this.http.post<Register>(this.baseAPi + '/api/Hospital', newRegister)
   }
   login(email: string, password:string, verificationCode:string): Observable<any> {
    console.log(email,password,verificationCode + 'ssssss' )
    return this.http.post<any>(`${this.baseAPi}/api/Hospital/login`, { email,password,verificationCode, })
    
    
  }


  getUsers(): Observable<Register[]> {
    return this.http.get<Register[]>(this.baseAPi + '/api/Hospital');
  }

  passwordChange(email:string, verificationCode:string, password:string): Observable<any> {
    return this.http.post<any>(`${this.baseAPi}/api/Hospital/email/passwordRecovery`, {email,verificationCode,password})
}
  sendVerificationCode(emailData:any) {
    return this.http.post<any>(`${this.baseAPi}/api/Hospital/email/send`, emailData);
  }


  

  getDoctors(): Observable<any> {
    return this.http.get<any>(`${this.baseAPi}/api/Hospital/doctors`).pipe(
      catchError(error => {
        console.error('Error fetching doctors:', error);
        throw error;
      })
    );

  }


  getOnlyUsers(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseAPi}/api/Hospital/user/${userId}`);
  }

  getDoctorById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseAPi}/api/Hospital/doctors/${id}`);
  }
  

  updatePassword(passwordData: any) {
    return this.http.post<any>(`${this.baseAPi}/api/Hospital/password/change`, passwordData);
  }

  createUser(user: Register): Observable<Register> {
    return this.http.post<Register>(this.baseAPi, user);
  }

 


  }

