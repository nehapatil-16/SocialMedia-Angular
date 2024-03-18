import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FriendshipService } from '../../services/friendship.service';
import { UserProfileService } from '../../services/user-profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userschat',
  templateUrl: './userschat.component.html',
  styleUrl: './userschat.component.css'
})
export class UserschatComponent {
  storedUserData: any;
  token: string = '';
  userid: any;
  username: any;
  users: any;
  userProfileMap: { [key: string]: string } = {};
  profile: any;
  constructor(private userService: UserService,
    private Friendship: FriendshipService, private userProfileService: UserProfileService, private router: Router) { }
  ngOnInit() {

    const userData = localStorage.getItem('userData');
    if (userData) {
      this.storedUserData = JSON.parse(userData);
    }
    this.userid = this.storedUserData.userid;
    this.token = "Token " + this.storedUserData.token;
    this.username = this.storedUserData.username;

    this.userService.getUsers(this.token).subscribe((data: any) => {
      this.users = data;
      this.users.forEach((user: { id: number; }) => {

        this.userProfileService.getUserProfileForUser(user.id, this.token).subscribe((profile: any) => {
          this.profile = profile[0]
          this.userProfileMap[user.id] = this.profile.profilepic;
          console.log(this.userProfileMap)
        });
      });
    },
      (error: any) => {
        console.error('Error fetching users:', error);
      }
    );
    console.log(this.userProfileMap)
  }

  handleClick(userId: number, profilepic: string) {
    this.router.navigate(['/dashboard/chats', userId, profilepic]);
  }
}
