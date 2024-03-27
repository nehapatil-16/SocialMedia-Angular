import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  private apiUrl = 'http://localhost:8000/forgetpassword/';

  constructor(private http: HttpClient, private router: Router) {}

  login(loginData: any): Observable<any> {

    return this.http.post(this.apiUrl, loginData);
  }
}