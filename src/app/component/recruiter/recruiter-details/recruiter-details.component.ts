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
  constructor(
    private companyServices: CompanyDetailsService,
    private storageService: StorageService
  ) {}
  showEditForm: boolean = false;
  error: string = '';
  iCompanyName: string = '';
  iCompanyUrl: string = '';
  iAbout: string = '';
  company: CompanyDetail = {
    id: 0,
    companyName: '',
    companyUrl: '',
    appUserId: 0,
    aboutCompany: '',
  };
  id: number = this.company.appUserId;
  
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
  edit(company: CompanyDetail) {
    this.showEditForm = true;
    this.iCompanyName = company.companyName
    this.iAbout = company.aboutCompany
    this.iCompanyUrl = company.companyUrl
  }
  onSubmit() {
    let updateCompany: any = {
      id: this.company.id!,
      companyName: this.iCompanyName,
      companyUrl: this.iCompanyUrl,
      aboutCompany: this.iAbout,
      appUserId: this.company.appUserId
    }
    console.log(updateCompany);
    
    this.companyServices.editCompanyDetail(updateCompany).subscribe({
      next: (response: AppResponse) => {
        this.company = response.data;
        this.iCompanyName = ''
        this.iAbout = ''
        this.iCompanyUrl = ''
        this.showEditForm = false;
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }
}
