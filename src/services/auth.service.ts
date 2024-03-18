import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn(): boolean {
    // Retrieve token from local storage
    const tokenStr = localStorage.getItem('userData');

    // Check if token is present and not empty
    if (tokenStr) {
      // Parse token string to object
      const tokenObj = JSON.parse(tokenStr);

      // Check if token object contains necessary fields (e.g., userid, username, token)
      if (tokenObj && tokenObj.token) {
        return true; // User is logged in
      }
    }

    return false; // User is not logged in
  }
}