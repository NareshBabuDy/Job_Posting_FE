import { Component } from '@angular/core';
import { CompanyDetail } from 'src/app/model/company-detail';
import { CompanyDetailsService } from 'src/app/service/company-details.service';


@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
})
export class CompaniesComponent {
  error: string = '';
  companies: CompanyDetail[] = [];
  
  constructor(private companyService: CompanyDetailsService) {}
  ngOnInit(): void {
    this.companyService.getAllCompanyDetails().subscribe({
      next: (response: any) => {
        this.companies = response.data;
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(",") ? message.split(",")[0] : message;
      },
    });
    
  }


}
