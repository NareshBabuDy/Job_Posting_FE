import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppResponse } from '../model/appResponse';
import { urlEndpoint } from '../utils/constant';
import { Jobs } from '../model/jobs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  EditJob(Job: Jobs): Observable<AppResponse> {
    return this.http.put<AppResponse>(
      `${urlEndpoint.baseUrl}/recruiter/jobs`,Job
    );
  }
  getAllJobsByCompanyId(id: number): Observable<AppResponse> {
    return this.http.get<AppResponse>(
      `${urlEndpoint.baseUrl}/recruiter/jobs/all/`+id
    );
  }
  addJob(Job: Jobs): Observable<AppResponse> {
    return this.http.post<AppResponse>(
      `${urlEndpoint.baseUrl}/recruiter/jobs`,Job
    );
  }



  deleteRecruiterJob(jobid: number) {
    return this.http.delete<AppResponse>(
      `${urlEndpoint.baseUrl}/recruiter/jobs/`+jobid
    );
  }
  deleteJob(jobid: number): Observable<AppResponse> {
    return this.http.delete<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/job/`+jobid
    );
  }
  constructor(private http: HttpClient) {}

  getAllJobs(): Observable<AppResponse> {
      return this.http.get<AppResponse>(
        `${urlEndpoint.baseUrl}/admin/job/all`
      );
    }


}
