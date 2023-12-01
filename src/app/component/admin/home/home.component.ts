import { Component } from '@angular/core';
import { AppUser } from 'src/app/model/appUser';
import { CompanyDetail } from 'src/app/model/company-detail';
import { Jobs } from 'src/app/model/jobs';
import { Profile } from 'src/app/model/profile';
import { CompanyDetailsService } from 'src/app/service/company-details.service';
import { HomeService } from 'src/app/service/home.service';
import { JobsService } from 'src/app/service/jobservices.service';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class AdminHomeComponent {
  users: AppUser[] = [];
  Profile: Profile = {
    id: 0,
    firstName: '',
    lastName: '',
    gender: '',
    phoneNumber: '',
    email: '',
    skills: '',
    experience: '',
    appUserId: 0,
    photo: '',
    resume: ''
  };
  companies: CompanyDetail = {
    id: 0,
    companyName: '',
    companyUrl: '',
    appUserId: 0,
    aboutCompany: '',
  };
  error: string = '';
  viewUserDetails: Boolean = false;
  viewComapnyDetails: Boolean = false;
  constructor(
    private homeService: HomeService,
    private userService: ProfileService,
    private companyService: CompanyDetailsService
  ) {}
  ngOnInit(): void {
    this.homeService.getUsers().subscribe({
      next: (response: any) => {
        this.users = response.data;
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }
  close() {
    this.viewUserDetails = false;
    this.viewComapnyDetails = false;
  }
  showDetails(arg0: number, arg1: String) {
    if (arg1 === 'USER') {
      this.viewComapnyDetails = false;
      this.viewUserDetails = true;
      this.userService.getProfile(arg0).subscribe({
        next: (response: any) => {
          this.Profile = response.data;
          console.log(this.Profile);
        },
        error: (err) => {
          let message: string = err?.error?.error?.message;
          this.error = message.includes(',') ? message.split(',')[0] : message;
        },
      });
    } else {
      this.viewComapnyDetails = true;
      this.viewUserDetails = false;
      this.companyService.getCompanyDetail(arg0).subscribe({
        next: (response: any) => {
          this.companies = response.data;
        },
        error: (err) => {
          let message: string = err?.error?.error?.message;
          this.error = message.includes(',') ? message.split(',')[0] : message;
        },
      });
    }
  }
}
