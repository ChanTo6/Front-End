import { Injectable } from "@angular/core";

interface Language {
  clinic: string;
  clinics: string;
  annotations: string;
  actions: string;
  services: string;
  medicines: string;
  contact: string;
  authorization: string;
  registration: string;
  logout: string;
  searchDoctorByName: string;
  searchBySpecialty: string;
  findUs: string;
  weekdays: string;
  information: string;
  forPatients: string;
  contactUs: string;
  followUs: string;
  doctors: string;
  workingDays: string;
  forDoctors: string;
  blog: string;
  address: string;
  phone: string;
  adminPanel: string;
  doctorPanel: string;
  user: string; 
  aboutus:string;
  Businessdays:string;
  partner :string;
  anotation :string;
  workingTime:string;
  forclinicks :string;
  location :string;
  forpharmacies:string;
  media :string;
  Searchbyspecialty :string;
  Chooseaclinicyoucantrust:string;
  name : string;
  email: string;
  picture :string;
  rating : string;
  id:string;
  okay :string;
  cancel :string;
  Atleast5letters :string;
  surname :string;
  password : string;
  category :string;
  doctor :string;
  changepassword:string;
  mybooking :string;
  authorisationcode:string;
  login:string;
  authorisationcodesend:string;
  passwordrecovery:string;
  Anesthesiologisttherapist : string;
  repeatpassword:string;
  nameisrequired:string;
  thenamemustcontainatleast5letters :string;
  emailisrequired :string;
  emailformatisinvalid :string;
  personalnumberisrequired :string;
  thepersonalnumbermustbeonlynumbers:string;
  atleast8characters:string;
  passwordisrequired:string;
  passwordmustcontainatleast8haracters :string;
  [key: string]: string;
}

const languages: { [key: string]: Language } = {
  en: {
    clinic: 'Clinic',
    clinics: 'Clinics',
    annotations: 'Annotations',
    actions: 'Promotions',
    services: 'Services',
    medicines: 'Medicines',
    contact: 'Contact',
    authorization: 'Authorization',
    registration: 'Registration',
    logout: 'Logout',
    searchDoctorByName: 'Search Doctor by Name',
    searchBySpecialty: 'Search by Specialty',
    findUs: 'Find Us',
    weekdays: 'Mon-Fri',
    information: 'Information',
    forPatients: 'For Patients',
    contactUs: 'Contact Us',
    followUs: 'Follow Us',
    doctors: 'Doctors',
    workingDays: 'Working Days',
    forDoctors: 'For Doctors',
    blog: 'Blog',
    address: 'Address',
    phone: 'Phone',
    adminPanel: 'Admin Panel',
    doctorPanel: 'Doctor Panel',
    user: 'User',
    aboutus: "Aboutus",
    businessdays: "BusnessDays",
    partner: "Partner",
    annotation: "Annotation",
    Businessdays: "Businessdays",
    anotation: "Annotation",
    workingTime: "Working hours: 9:00-17:00",
    forclinicks: "ForClinicks",
    location: "Jacob Nikoladze N10",
    forpharmacies: "for pharmacies",
    media: "Media",
    Searchbyspecialty: "Search by specialty",
    Chooseaclinicyoucantrust: "Choose a clinic you can trust",
    name: "Name",
    email: "Email",
    picture: "Picture",
    rating: "Raiting",
    id: "ID",
    okay: "okay",
    cancel: "Cancel",
    Atleast5letters: "At least 5 letters",
    Atleast7letters: "At least 7 letters",
    surname: "Surname",
    password: "Password",
    category: "Category",
    doctor: "Doctor",
    changepassword: "Change Password",
    mybooking: "My Booking",
    authorisationcode: "Authorisation Code",
    login: "Login",
    authorisationcodesend: "Authorisation code send",
    Anesthesiologisttherapist: "Anesthesiologist / Therapist or other...",
    passwordrecovery: "Password Recovery",
    repeatpassword: "Repeat Password",
    nameisrequired: "Name is required",
    thenamemustcontainatleast5letters: "The name must contain at least 5 letters",
    emailisrequired: "Email is required",
    emailformatisinvalid: "Email format is invalid",
    personalnumberisrequired: "Personal number is required",
    thepersonalnumbermustbeonlynumbers: "The personal number must be only numbers",
    atleast8characters: "At least 8 characters",
    passwordisrequired: "Password is required",
    passwordmustcontainatleast8haracters: "Password must contain at least 8 characters",
  },
  ka: {
    clinic: 'კლინიკა',
    user: 'მომხმარებელი',
    clinics: "კლინიკები",
    annotations: "ანოტაცია",
    "actions": "ქმედებები",
    services: "მომსახურებები",
    medicines: "მედიკამენტები",
    contact: "კონტაქტი",
    authorization: "ავტორიზაცია",
    registration: "რეგისტრაცია",
    logout: "გასვლა",
    searchDoctorByName: "ძებნა ექიმის სახელით",
    searchBySpecialty: "ძებნა სპეციალობის მიხედვით",
    findUs: "ჩვენს იპოვეთ",
    weekdays: "კვირის დღეები",
    information: "ინფორმაცია",
    forPatients: "პაციენტებისთვის",
    contactUs: "დაგვიკავშირდით",
    followUs: "გამოგვიერთდით",
    doctors: "ექიმები",
    workingDays: "სამუშაო დღეები",
    forDoctors: "ექიმებისთვის",
    blog: "ბლოგი",
    address: "მისამართი",
    phone: "ტელეფონი",
    adminPanel: "ადმინ პანელი",
    doctorPanel: "ექიმის პანელი",
    aboutus: "ჩვენს შესახებ",
    Businessdays: "სამუშაო დღეები",
    Anotation: "ანოტაცია",
    partner: "პარტნიორები",
    anotation: " ანოტაცია",
    workingTime: "სამუშაო დრო: 9:00-17:00",
    forclinicks: "კლინიკებისთვის",
    location: "იაკობ ნიკოლაძის N10",
    forpharmacies: "აფთიაქებისთვის",
    media: "მედია",
    Searchbyspecialty: "მოძებნე სპეციალობით",
    Chooseaclinicyoucantrust: "აირჩიე კლინიკა რომელსაც შეგიძლია ენდო",
    name: "სახელი",
    email: "იმეილი",
    picture: "სურათი",
    rating: "რეიტინგი",
    id: "პირადი ნომერი",
    okay: "დათანხმება",
    cancel: "უარყოფა",
    Atleast5letters: "მინიმუმ 5 ასო",
    Atleast7letters: "მინიმუმ 7 ასო",
    surname: "გვარი",
    password: "პაროლი",
    category: "კატეგორია",
    doctor: "ექიმი",
    changepassword: "პაროლის შეცვლა",
    mybooking: "ჩემი ჯავშანი",
    authorisationcode: "ავტორიზაციის კოდი",
    login: "შესვლა",
    authorisationcodesend: "ავტორიზაციის კოდის გაგზავნა",
    passwordrecovery: "პაროლის აღდგენა",
    Anesthesiologisttherapist: "ანესთეზიოლოგი / თერაპევტი ან სხვა...",
    repeatpassword: "პატროლის გამეორება",
    nameisrequired: "სახელი აუცილებელია",
    thenamemustcontainatleast5letters: "სახელი უნდა შეიცავდეს მინიმუმ 5 ასოს",
    emailisrequired: "ემაილი აუცილებელია",
    emailformatisinvalid: "ელ.ფოსტის ფორმატი არასწორია",
    personalnumberisrequired: "პირადი ნომერი აუცილებელია",
    thepersonalnumbermustbeonlynumbers: "პირადი ნომერი უნდა იყოს მხოლოდ ციფრები",
    atleast8characters: "მინიმუმ 8 სიმბოლო",
    passwordisrequired: " პაროლი აუცილებელია",
    passwordmustcontainatleast8haracters: " პაროლი უნდა შეიცავდეს მინიმუმ 8 სიმბოლოს",
  }
};

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLang = 'en';

  constructor() { }

  setLanguage(lang: string) {
    this.currentLang = lang;
  }

  getTranslation(key: string): string {
    return languages[this.currentLang][key] || key;
  }
}
