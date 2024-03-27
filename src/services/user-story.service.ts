
import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { UserPost } from '../models/userpost';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadStoryService {
  private url = 'http://127.0.0.1:8000/userstory/';
  private storyurl='http://127.0.0.1:8000/story'

  constructor(
    private http: HttpClient,
    private injector: Injector
  ) {}

  uploadStory(user_id: number,  file: File, token:string) 
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': token
      }),
    };
    
    const formData: FormData = new FormData();
    formData.append('user', user_id.toString());
    formData.append('media', file, file.name);
    
    return this.http.post<any>(this.url, formData, httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error uploading image:', error);
        throw error;
      })
    );
  }
 

  getStory(token: string): Observable<UserPost[]> {
    const headers = new HttpHeaders({
      Authorization: token
    });
    return this.http.get<any[]>(this.url, {headers:headers});
  }

  getStoryById(userId: number, token:string): Observable<UserPost[]> {
    const headers = new HttpHeaders({
      Authorization: token
    });
    const url = `${this.storyurl}/${userId}/`;
    console.log(url,'story urls')
    return this.http.get<any[]>(url, {headers:headers});
  }
}
