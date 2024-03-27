import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';
import { UserPost } from '../models/userpost';
import { Media } from '../models/media';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {
  // private apiUrl = 'http://localhost:8000/shout/create/';
  // private mediaUrl = 'http://localhost:8000/shout/media/';
  private url = 'http://127.0.0.1:8000/userpost/';
  private apiUrl = 'http://127.0.0.1:8000/media/';

    constructor(private http: HttpClient,private injector: Injector) {}

  postShout(shout_id: number, files: File[], token: string): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${token}`
      })
    };

    const requests: Observable<any>[] = [];

    // Create a request for each file
    files.forEach((file) => {
      const formData: FormData = new FormData();
      formData.append('post', shout_id.toString());
      // const fileFormData: FormData = new FormData();
      formData.append('file', file, file.name);

      const request = this.http.post<any>(this.apiUrl, formData, httpOptions)
        .pipe(
          catchError((error: any) => {
            console.log('Error uploading image:', error);
            throw error;
          })
        );
      requests.push(request);
    });

    // Use forkJoin to combine all requests into a single observable
    return forkJoin(requests);
  }

  postText(user_id: number,date:Date, shoutText: string, token: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('user', user_id.toString());
    const formattedDate = date.toISOString().split('T')[0];
    formData.append('date_of_post', formattedDate);
    formData.append('text', shoutText);

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${token}`
      })
    };

    return this.http.post<any>(this.url, formData, httpOptions).pipe(
      catchError((error: any) => {
        console.log('Error uploading shout:', error);
        throw error;
      })
    );
  }


// import { Injectable, Injector } from '@angular/core';
// import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
// import { catchError } from 'rxjs/operators';
// import { UserPost } from '../models/userpost';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class ImageUploadService {
//   private url = 'http://127.0.0.1:8000/userpost/';

//   constructor(
//     private http: HttpClient,
//     private injector: Injector
//   ) {}

  uploadImage(user_id: number, date:Date, shoutText: string, file: File, token:string) 
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': token
      }),
    };
    
    const formData: FormData = new FormData();
    formData.append('user', user_id.toString());
    const formattedDate = date.toISOString().split('T')[0];
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

  getMediaById(postId:number, token: string): Observable<Media[]> {
    const headers = new HttpHeaders({
      Authorization: token
    });
    const newurl = `${this.apiUrl}?post=${postId}`
    return this.http.get<Media[]>(newurl, {headers:headers});
  }

  getAllPosts(token:string): Observable<UserPost[]> {
    const headers = new HttpHeaders({
      Authorization: token
    });
    // const url = `${this.url}?user=${userId}`;
    return this.http.get<UserPost[]>(this.url, {headers:headers});
  }

  getPostsById(userId: number, token:string): Observable<UserPost[]> {
    const headers = new HttpHeaders({
      Authorization: token
    });
    const url = `${this.url}?user=${userId}`;
    return this.http.get<UserPost[]>(url, {headers:headers});
  }

  // getAllShoutsWithMedia(token: string): Observable<any> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Authorization': `Token ${token}`
  //     })
  //   };

    // const shoutsRequest = this.getPostsById(token);
    // const mediaRequest = this.getMediaById(token);

    // return forkJoin([shoutsRequest, mediaRequest]).pipe(
    //   map(([shouts, media]) => {
    //     return { shouts, media };
    //   }),
    //   catchError((error: any) => {
    //     console.error('Error fetching shouts and media:', error);
    //     throw error;
    //   })
    // );
  // }

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
