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
  user: any;
  userProfileMap: { [key: string]: string } = {};
  profile: any;
  usernameMap: {[key: number]: string} = {};

  constructor(private userService: UserService,
    private Friendship: FriendshipService, private userProfileService: UserProfileService, private router: Router, private friendshipService:FriendshipService) { }
  ngOnInit() {

    const userData = localStorage.getItem('userData');
    if (userData) {
      this.storedUserData = JSON.parse(userData);
    }
    this.userid = this.storedUserData.userid;
    this.token = "Token " + this.storedUserData.token;
    this.username = this.storedUserData.username;

    // this.userService.getUsers(this.token).subscribe((data: any) => {
    //   this.users = data;
    //   this.users.forEach((user: { id: number; }) => {
    this.friendshipService.getFriendList(this.userid, this.token).subscribe((data: any) => {
        this.users = data;
        console.log(this.users)
        this.users.forEach((user: {id:number, follower: number; }) => {

        this.userService.getUserById(user.follower, this.token).subscribe((data: any) => {
          console.log(data)
          this.usernameMap[user.id] = data.username;
        });

        this.userProfileService.getUserProfileForUser(user.follower, this.token).subscribe((profile: any) => {
          this.profile = profile[0]
          // console.log(this.profile)
          this.userProfileMap[this.profile.user] = this.profile.profilepic;
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
    console.log(userId)
    console.log(profilepic)
    this.router.navigate(['/dashboard/chats', userId, profilepic]);
  }
}
