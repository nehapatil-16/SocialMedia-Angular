
import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { UserPost } from '../models/userpost';
import { Observable } from 'rxjs';
import { UserProfile } from '../models/user-profile';

@Injectable({
  providedIn: 'root',
})
export class EditProfileService {
  private url = 'http://127.0.0.1:8000/user-profile/';

  constructor(
    private http: HttpClient,
    private injector: Injector
  ) {}

  editProfile(profileId:number, formData: FormData, token: string) {
    const headers= new HttpHeaders({
        'Authorization': token,
      });

    const url = `${this.url}${profileId}`;
  
    return this.http.patch<UserProfile>(url, formData, {headers:headers}).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error uploading image:', error);
        throw error;
      })
    );
  }
}