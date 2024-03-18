// auth.guard.ts
import { Injectable } from '@angular/core';
// tslint:disable-next-line: deprecation
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/signIn']); // Redirect to login page if user is not logged in
      return false;
    }
  }
}
