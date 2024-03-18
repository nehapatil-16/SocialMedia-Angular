import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikePostsService {
  private apiUrl = 'http://127.0.0.1:8000/likes/';
  private url = 'http://127.0.0.1:8000/liked-posts/';

  constructor(private http: HttpClient) { }

  // Method to retrieve a likes by its ID
  getLikesbyId(userId: number): Observable<any> {
    const url = `${this.url}${userId}/`;
    return this.http.get(url);
  }

  // Method to delete a likes
  addLike(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, data);
  }

  deleteLike(likeId: number): Observable<any> {
    const url = `${this.apiUrl}${likeId}`;
    return this.http.delete(url);
  }
}