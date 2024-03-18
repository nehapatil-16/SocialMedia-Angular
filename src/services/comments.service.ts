import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://127.0.0.1:8000/comments/';

  constructor(private http: HttpClient) { }

  getCommentbyId(postId: number): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/get-comments/?user_post=${postId}`);
  }

  updateComment(commentId: number, updatedData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}${commentId}`, updatedData);
  }

  deleteComment(commentId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${commentId}`);
  }

  addComment(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, data);
  }
}
