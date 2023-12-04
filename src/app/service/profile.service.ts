import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { urlEndpoint } from '../utils/constant';
import { Profile } from '../model/profile';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getAllProfile(): Observable<AppResponse> {
    return this.http.get<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/user/profile/all`
    );
  }

  addProfile(profile: Profile): Observable<AppResponse> {
    return this.http.post<AppResponse>(
      `${urlEndpoint.baseUrl}/user/profile/`,
      profile
    );
  }

  getProfile(id: number): Observable<AppResponse> {
    return this.http.get<AppResponse>(
      `${urlEndpoint.baseUrl}/user/profile/` + id
    );
  }

  editProfile(profiles: any): Observable<AppResponse> {
    return this.http.put<AppResponse>(
      `${urlEndpoint.baseUrl}/user/profile/`,profiles
    );
  }
}
