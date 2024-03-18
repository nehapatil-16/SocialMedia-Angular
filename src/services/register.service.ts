// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {

  private apiUrl = 'http://127.0.0.1:8000/register/';

  constructor(private http: HttpClient, private router: Router) {}

  register(registrationData: any): Observable<any> {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     Authorization: token
    //   }),
    // };
    return this.http.post(this.apiUrl, registrationData);
  }
}
