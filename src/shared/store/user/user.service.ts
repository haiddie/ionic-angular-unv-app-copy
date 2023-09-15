import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api-controller/api.service';
import { IWriter } from '../writer/writer.models';
import { SportsfeedApiService } from '../api-controller/sportsfeed_api.service';
import { IsUserRegistered } from './user.models';
import { AuthService } from '../auth/auth.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userObject: any = null;
  constructor(
    private http: HttpClient,
    private api: ApiService,
    private sportsFeedApi: SportsfeedApiService,
    private auth: AuthService
  ) {}

  // ********  REGISTERATION /PASSWORDLESS API CALLS  ********

  //  check if email already exists -API

  checkUserRegistered(email: string): Observable<IsUserRegistered> {
    let params = new HttpParams();
    params = params.set('register', true);
    params = params.set('email', email);

    const url = this.api.getUrl(environment.baseEndpoints.consumer);
    return this.http.get<IsUserRegistered>(url, { params });
  }

  //  registration api with passwordless signUp

  registerUserwithEmail(createUserReq): Observable<any> {
    const url = this.api.getUrl(environment.baseEndpoints.consumer);
    return this.http.post<any>(url, createUserReq);
  }

  siugnOutUser(): Observable<any> {
    return of();
  }

  getUserData(token) {
    let params = new HttpParams();
    params = params.set('profile', true);

    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    if (token !== undefined || token !== null) {
      const url =
        this.api.getUrl(environment.baseEndpoints.user) + '?profile=true';
      return this.http.get<any>(url, { headers });
    }
  }

  editProfile(data: any, token: string) {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const url = this.api.getUrl(environment.baseEndpoints.user);
    return this.http.put(url, data, { headers });
  }

  checkEmail(email: string, token: string) {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    let params = new HttpParams();
    params = params.set('email', email);

    const url =
      this.api.getUrl(environment.baseEndpoints.user) + '?email=' + email;
    return this.http.get(url, { headers });
  }

  delete_account_per(token: any) {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    let body = {
      delete_permanently: true,
    };
    let options = {
      headers: headers,
      body: body,
    };

    const url = this.api.getUrl(environment.baseEndpoints.user);
    return this.http.delete(url, options);
  }
}
