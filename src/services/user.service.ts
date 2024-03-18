import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';
// from django.contrib.auth.models import User
import { Users } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  userUrl = 'http://127.0.0.1:8000/authuser/';
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('EntriesService');
  }

  getUsers(token: string): Observable<Users[]> {
    const headers = new HttpHeaders({
      Authorization: token
    });
    return this.http.get<Users[]>(this.userUrl, {headers:headers})
      .pipe(
        catchError(this.handleError('getUsers', []))
      );
  }
  

  getUserById(userId: number, token:string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: token
    });
    const url = `${this.userUrl}${userId}/`;
    return this.http.get<any>(url,{headers:headers});
  }

 
  getNonFriendUsers(userId: number,token:string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: token
    });
    const url = `http://127.0.0.1:8000/nonfriendUser/${userId}/`;
    return this.http.get<any>(url,{headers:headers});
  }
}
