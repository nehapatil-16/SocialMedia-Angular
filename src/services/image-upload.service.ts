
import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { UserPost } from '../models/userpost';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageUploadService {
  private url = 'http://127.0.0.1:8000/userpost/';

  constructor(
    private http: HttpClient,
    private injector: Injector
  ) {}

  uploadImage(user_id: number, date:Date, shoutText: string, file: File, token:string) 
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': token
      }),
    };
    
    const formData: FormData = new FormData();
    const formattedDate = date.toISOString().split('T')[0];
    formData.append('user', user_id.toString());
    formData.append('date_of_post', formattedDate);
    formData.append('text', shoutText);
    formData.append('media', file, file.name);
    
    return this.http.post<any>(this.url, formData, httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error uploading image:', error);
        throw error;
      })
    );
  }
  uploadText(user_id: number, date:Date, shoutText: string, token:string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': token,
      }),
    };
    
    const formData: FormData = new FormData();
    const formattedDate = date.toISOString().split('T')[0];
    formData.append('user', user_id.toString());
    formData.append('date_of_post', formattedDate);
    formData.append('text', shoutText);
    
    return this.http.post<any>(this.url, formData, httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error uploading image:', error);
        throw error;
      })
    );
  }

  getMedia(token: string): Observable<UserPost[]> {
    const headers = new HttpHeaders({
      Authorization: token
    });
    return this.http.get<UserPost[]>(this.url, {headers:headers});
  }

  getPostsById(userId: number, token:string): Observable<UserPost[]> {
    const headers = new HttpHeaders({
      Authorization: token
    });
    const url = `${this.url}?user=${userId}`;
    return this.http.get<UserPost[]>(url, {headers:headers});
  }

  deletePost(id: number, token:string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: token
    });
    const url = `${this.url}${id}`;
    return this.http.delete<any>(url, { headers:headers});
  }
  
  getSinglePostById(postId: number, token:string): Observable<UserPost> {
    const headers = new HttpHeaders({
      Authorization: token
    });
    const url = `${this.url}${postId}`
    return this.http.get<UserPost>(url, {headers:headers});
  }
}
