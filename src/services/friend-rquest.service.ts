// friend-request.service.ts

import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FriendRequest } from '../models/friend-request';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Token 9b115f2b95455b0024599950ceb73b5dc16eba83'
    })
  };

@Injectable({
  providedIn: 'root'
})
export class FriendRequestService {
  private apiUrl = 'http://127.0.0.1:8000/user-request/';
  private FriendShipUrl='http://127.0.0.1:8000/user-friend/'
  private friendURL='http://127.0.0.1:8000/user/';
  constructor(private http: HttpClient) { }

  getFriendRequestForUser(userId: number,token:string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: token
    });
    const url = `${this.friendURL}${userId}/send-request/`;
    return this.http.get(url,{headers:headers});
  }

  sendFriendRequest(fromUser: number, toUser: number,token:string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: token
    });
    return this.http.post<any>(this.apiUrl, { from_user: fromUser, to_user: toUser, is_accepted: 'True' },{headers:headers});
  }

  getFriendRequests(token:string): Observable<FriendRequest[]> {
    const headers = new HttpHeaders({
      Authorization: token
    });
    return this.http.get<FriendRequest[]>(this.apiUrl,{headers:headers});
  }
  updateIsAccepted(requestId: number, status: string): Observable<any> {
    const url = `${this.apiUrl}${requestId}/`;

    return this.http.patch<FriendRequest>(url, { is_accepted: status },httpOptions);

  }
  
  deleteFriendRequest(id: number): Observable<any> {
    const url = `${this.apiUrl}${id}/`; // Construct the delete URL
    return this.http.delete<any>(url,httpOptions);
  }
}
