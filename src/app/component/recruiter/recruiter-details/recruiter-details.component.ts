import { Component, OnInit } from '@angular/core';
import { AppResponse } from 'src/app/model/appResponse';
import { AppUser } from 'src/app/model/appUser';
import { CompanyDetail } from 'src/app/model/company-detail';
import { Jobs } from 'src/app/model/jobs';
import { CompanyDetailsService } from 'src/app/service/company-details.service';
import { JobsService } from 'src/app/service/jobservices.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-recruiter-details',
  templateUrl: './recruiter-details.component.html',
})
export class RecruiterDetailsComponent implements OnInit {
  showEditForm: boolean = false;
  iCompanyName: string = '';
  iCompanyUrl: string = '';
  iAbout: string = '';
  iCompanyPhoto: any[] = [];
  constructor(
    private companyServices: CompanyDetailsService,
    private storageService: StorageService
  ) {}
  error: string = '';
  company: CompanyDetail = {
    id: 0,
    companyName: '',
    companyUrl: '',
    appUserId: 0,
    aboutCompany: '',
  };
  user: AppUser = this.storageService.getLoggedInUser();
  ngOnInit(): void {
    this.companyServices.getCompanyDetail(this.user.id).subscribe({
      next: (response: AppResponse) => {
        this.company = response.data;
        console.log(this.company);
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }
  edit() {
    this.showEditForm = true;
    this.iCompanyName = this.company.companyName;
    this.iCompanyUrl = this.company.companyUrl;
    this.iAbout = this.company.aboutCompany;
  }
  onSubmit() {
    let company: any = {
      id: this.company.id,
      companyName: this.iCompanyName,
      companyUrl: this.iCompanyUrl,
      appUserId: this.user.id,
      aboutCompany: this.iAbout,
    };

    this.companyServices.editCompanyDetail(company).subscribe({
      next: (response: AppResponse) => {
        this.company = response.data;
        console.log(this.company);
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
    this.showEditForm = false;
    this.iCompanyName = '';
    this.iCompanyUrl = '';
    this.iAbout = '';
    this.showEditForm = false;
  }
}
