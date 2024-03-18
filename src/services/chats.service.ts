// chat.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'http://127.0.0.1:8000/chats/';
  // constructor() { }
  constructor(private http: HttpClient) {
  }

  sendMessage(data: any, token:string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': token
      }),
    };
    return this.http.post(`${this.apiUrl}`, data, httpOptions)
  }

  getChats(token:string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': token
      }),
    };
    return this.http.get(`${this.apiUrl}`, httpOptions);
  }

  getUsersInChats( token:string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': token
      }),
    };
    return this.http.get(`${this.apiUrl}`, httpOptions);
  }
}
