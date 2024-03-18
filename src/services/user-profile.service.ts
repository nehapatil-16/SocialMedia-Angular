import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';
import { Users } from '../models/user';
import { UserProfile } from '../models/user-profile';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  apiUrl = 'http://127.0.0.1:8000/user-profile/';
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('EntriesService');
  }
  getUserProfileForUser(userId:number, token:string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: token
    });
    return this.http.get<any[]>(this.apiUrl, {headers:headers}).pipe(map((profiles:any[]) => 
      profiles.filter(profile => profile.user === userId))
    );
  }

  addUserProfile(userData: any, token: string): Observable<UserProfile[]> {
    const headers = new HttpHeaders({
      Authorization: token
    });
    return this.http.post<UserProfile[]>(this.apiUrl, {headers:headers})
      .pipe(
        catchError(this.handleError('getUsers', []))
      );
  }

  getUserProfile(userId: number, token:string): Observable<any> {
    console.log("user id "+userId)
    const headers = new HttpHeaders({
      Authorization: token
    });
    const url = `${this.apiUrl}?user=${userId}`;
    console.log(url)
    return this.http.get<UserProfile>(url, {headers:headers})
      .pipe(
        catchError(this.handleError('getUsers', []))
      );
  }
}
  