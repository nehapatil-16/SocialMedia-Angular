// friend-request.service.ts

import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Friendship } from '../models/friendship';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json',
//     Authorization: localStorage.
//   })
// };

@Injectable({
  providedIn: 'root'
})
export class FriendshipService {

  private FriendShipUrl = 'http://127.0.0.1:8000/user-friend/'

  constructor(private http: HttpClient) { }

  postFriendshipData(friendshipData: Friendship, token:string): Observable<any> {
    // return this.http.post<Friendship>(this.FriendShipUrl, friendshipData);
    const headers = new HttpHeaders({
      Authorization: token
    });
    return this.http.post<Friendship>(this.FriendShipUrl, friendshipData, { headers:headers});
  }

  getFriendList(userId: number,token: string): Observable<Friendship[]> {
    const headers = new HttpHeaders({
      Authorization: token
    });
  
    return this.http.get<Friendship[]>(`http://127.0.0.1:8000/user/${userId}/FriendList/`,{ headers:headers});
  }

  deleteFriend(id: number, token:string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: token
    });
    const url = `${this.FriendShipUrl}${id}`;
    return this.http.delete<any>(url, { headers:headers});

  }
}
