// friend-request.service.ts

import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../models/user';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Token 9b115f2b95455b0024599950ceb73b5dc16eba83'
    })
  };

@Injectable({
  providedIn: 'root'
})
export class SignUpService  {

  private apiUrl='http://127.0.0.1:8000/user/'

  constructor(private http: HttpClient) { }

postFriendshipData(user: Users): Observable<any> {
    return this.http.post<Users>(this.apiUrl, user);
  }
}
