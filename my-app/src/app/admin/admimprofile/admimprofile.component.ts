import { Component } from '@angular/core';
import { MyServiceService } from '../../Services/my-service.service';
import { Register } from '../../models/register.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { response } from 'express';
import { LanguageService } from '../../Language/language-selector/language';


@Component({
  selector: 'app-admimprofile',
  templateUrl: './admimprofile.component.html',
  styleUrl: './admimprofile.component.css'
})
export class AdmimprofileComponent {
  constructor(private service: MyServiceService,private formBuilder: FormBuilder, private languageService: LanguageService) { }

  ngOnInit(): void {
    this.getAllUsers();
    this.registrationForm = this.formBuilder.group({
      name: '',
      surname: '',
      email: '',
      PersonalID: '',
      password: '',
      id: '',
      bio:'',
    });
  }
  // Inside your component class
showEdit: boolean = false;
editedUser: Register | undefined; 
allUsers: any; // Assuming this is where you store users data
allDoctors: any[] = []


confirmEdit() {
  this.showEdit = false;
}
toggleEdit(user: any) {
  user.editing = !user.editing;
  if (user.editing) {
    this.editedUser = user;
  }
}
saveUser() {
  if (this.editedUser) {
    this.service.updateUser(this.editedUser).subscribe({
      next: (updatedUser) => {
        console.log('User updated successfully:', updatedUser);
        this.toggleEdit(this.editedUser);
        this.editedUser = undefined;
      },
      error: (error) => {
        console.error('Error updating user:', error);
      }
    });
  } else {
    console.error('No user is being edited.');
  }
}

cancelEdit() {
  this.showEdit = false;
}
showEditOptions(user: any) {

  this.editedUser = user; 
  this.showEdit = true;
}
  registrationForm!: FormGroup;
  newRegister :Register ={
    name: '',
    surname: '',
    email: '',
    id: '',
    password: '',
    PersonalID: '',
    registerByAdmin: false,
    photo: '',
    cv: '',
    bio: '',
    VerificationCodeGeneratedTime: null,
    verificationCode: null
  }
  onPhotoSelected(event: any) {
    const file: File = event.target.files[0];
    this.newRegister.photo = file ? file.name : '';
  }

  onCvSelected(event: any) {
    const file: File = event.target.files[0];
    this.newRegister.cv = file ? file.name : '';
  }



  registerUser() {
    this.service.registerUser(this.newRegister)
    .subscribe({
      next: (register) => {
        this.newRegister.name = '';
        this.newRegister.email = '';
        this.newRegister.id = '';
        this.newRegister.password = '';
        this.newRegister.surname = '';
        this.newRegister.PersonalID='';
        this.newRegister.photo ='';
        this.newRegister.cv = '';
        this.newRegister.bio='';
        console.log(register);
      },
      error: (error) => {
        console.error('რეგისტარციის პრობლემა:', error);       
      }
    });
  }

  getAllUsers() {
    this.service.getUsers()
      .subscribe({
        next: (users) => {
          this.allUsers = users;
          console.log("Users:", this.allUsers);
        }
      });

    this.service.getDoctors().subscribe({
      next: (doctors) => {
        this.allDoctors = doctors;
        console.log("Doctors:", this.allDoctors);
      }
    });
  }

  // deleteUser(id: string) {
  //   this.service.deleteUser(id)
  //     .subscribe(() => {
  //       // Handle successful deletion
  //       console.log('User deleted');
  //       // Optionally, update the list of users
  //       this.getAllUsers();
  //     }, (error) => {
  //       // Handle error
  //       console.error('Error deleting user:', error);
  //     });
  // }
  updateUser() {
    console.log('User:', this.editedUser); 
    if (this.editedUser && this.editedUser.id) {

      console.log("axali" , this.editedUser )
      this.service.updateUser(this.editedUser).subscribe({
        next: (updatedUser) => {
          console.log('User updated successfully:', updatedUser);
          this.toggleEdit(this.editedUser);
          this.editedUser = undefined;
        },
        error: (error) => {
          console.error('adminprofileError:',);
        }
      });
    } else {
      console.error("User or user id is undefined or null.");
    }
  }
  
 

 
 
  deleteAccount(personalId: string) {
    this.service.deletePerson(personalId).subscribe({
      next : (response) =>{
        this.getAllUsers();
      },
      error: (error) => {
        console.error('Error deleting account:', error);
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
