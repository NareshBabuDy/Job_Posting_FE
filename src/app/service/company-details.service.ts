import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { urlEndpoint } from '../utils/constant';
import { CompanyDetail } from '../model/company-detail';

@Injectable({
  providedIn: 'root',
})
export class CompanyDetailsService {
  editCompanyDetail(company: any): Observable<AppResponse>  {
    return this.http.put<AppResponse>(
      `${urlEndpoint.baseUrl}/recruiter/company`,company
    );

  }
  addCompanyDetails(company: CompanyDetail): Observable<AppResponse>  {
    return this.http.post<AppResponse>(
      `${urlEndpoint.baseUrl}/recruiter/company`,company
    );
  }
  getCompanyDetail(id: number): Observable<AppResponse>  {
    return this.http.get<AppResponse>(
      `${urlEndpoint.baseUrl}/recruiter/company/`+id
    ); 
  }
  
  
  constructor(private http: HttpClient) {}

  getAllCompanyDetails(): Observable<AppResponse> {
    return this.http.get<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/company/all`
    );
  }
}

