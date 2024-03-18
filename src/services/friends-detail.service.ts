// friend-request.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FriendsDetail } from '../models/friends-detail';

@Injectable({
  providedIn: 'root'
})
export class FriendsDetailService {
  private apiUrl = 'http://127.0.0.1:8000/user-friend/';

  constructor(private http: HttpClient) { }

  getFriendsDetail(userId: number): Observable<FriendsDetail[]> {
    // const url = `${this.apiUrl}${userId}`;
    return this.http.get<FriendsDetail[]>(this.apiUrl);
  }
}
