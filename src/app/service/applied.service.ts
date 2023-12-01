import { Injectable } from '@angular/core';
import { Apply } from '../model/apply';
import { HttpClient } from '@angular/common/http';
import { AppResponse } from '../model/appResponse';
import { urlEndpoint } from '../utils/constant';
import { Observable } from 'rxjs';
import { Applyrequest } from '../model/applyrequest';

@Injectable({
  providedIn: 'root',
})
export class AppliedService {
  applicationByCompanyId(id: number): Observable<AppResponse> {
    return this.http.get<AppResponse>(
      `${urlEndpoint.baseUrl}/recruiter/application/` + id
    );
  }
  appliedJobs(id: number): Observable<AppResponse> {
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/job/apply/` + id);
  }
  constructor(private http: HttpClient) {}

  applyToJob(applyto: Apply): Observable<AppResponse> {
    return this.http.post<AppResponse>(
      `${urlEndpoint.baseUrl}/job/apply`,
      applyto
    );
  }

  changeJobStatus(changeStatus: Applyrequest): Observable<AppResponse> {
    return this.http.put<AppResponse>(
      `${urlEndpoint.baseUrl}/recruiter/application`,
      changeStatus
    );
  }
}
