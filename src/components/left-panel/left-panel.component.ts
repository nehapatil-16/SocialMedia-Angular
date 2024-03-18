import { Component } from '@angular/core';
import { UserProfileService } from '../../services/user-profile.service';
import { Router } from '@angular/router';
import { UserProfile } from '../../models/user-profile';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrl: './left-panel.component.css'
})
export class LeftPanelComponent {
  token: string = '';
  // profile: UserProfile | undefined;
  data: any;
  profile: any;
  // profile: UserProfile| undefined;
  constructor(private userProfileService: UserProfileService, private router: Router) {}
  storedUserData: any;
  username: any;
  firstname: any;
  lastname: any;
  ngOnInit() {
    const userData = localStorage.getItem('userData');
    if (userData) {
      this.storedUserData = JSON.parse(userData);
    }
    this.username = this.storedUserData.username;
    this.firstname = this.storedUserData.firstname;
    this.lastname = this.storedUserData.lastname;
    this.token = "Token "+this.storedUserData.token;
    this.getUserProfileForUser();
  }

  getUserProfileForUser() {
    this.userProfileService.getUserProfileForUser(this.storedUserData.userid, this.token).subscribe(
      (response: any) => {
        // Assuming the response is an array with one user profile object
        if (response && response.length > 0) {
          this.profile = response[0];
          console.log('User Profile for user:', this.profile);
        
        } else {
          console.log('User Profile for user not found');
        }
      },
      error => {
        console.error('Error fetching user profile for user=4:', error);
      }
    );
  }

  editProfile(id:number){
    this.router.navigate(['/dashboard/edit-profile',id])
  }
  friends(id:number){
    this.router.navigate(['/dashboard/friends']);
  }
  chats(id:number){
    this.router.navigate(['/dashboard/userschat']);
  }
}
