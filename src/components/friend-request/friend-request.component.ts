import { Component } from '@angular/core';
import { FriendRequestService } from '../../services/friend-rquest.service';
import { Router } from '@angular/router';
import { FriendRequest } from '../../models/friend-request';
import { UserService } from '../../services/user.service';
import { FriendshipService } from '../../services/friendship.service';
import { Friendship } from '../../models/friendship';
import { Users } from '../../models/user';
import { UserProfile } from '../../models/user-profile';
import { UserProfileService } from '../../services/user-profile.service';

@Component({
  selector: 'friend-request',
  templateUrl: './friend-request.component.html',
  styleUrl: './friend-request.component.css'
})
export class FriendRequestComponent {
  username: string = '';
  password: string = '';
  friendReq: FriendRequest[] = [];
  loggedInUser:any
  data:any
  storedUserData: any;
  token: any;
  userMap: { [key: string]: string } = {};
  userProfileMap: { [key: string]: string } = {};
  profile: any;


  constructor(private friendRequestService: FriendRequestService,private router: Router,
    private userService: UserService, private userProfileService:UserProfileService,
    private friendshipService: FriendshipService) { }

  ngOnInit(){
    const userData = localStorage.getItem('userData');
    if (userData) {
      this.storedUserData = JSON.parse(userData);
      this.token = "Token " + this.storedUserData.token;

    }
      this.getfriendRequestlist()
   
  }
  getfriendRequestlist(){
    this.friendRequestService.getFriendRequestForUser(this.storedUserData.userid,this.token)
    .subscribe(
      (response) => {
        console.log('Friend accept  successfully:', response);
        this.friendReq = response;
        response.forEach((request:any)=>{
          this.userService.getUserById(request.from_user,this.token).subscribe((user:Users)=>{
            this.userProfileService.getUserProfileForUser(request.from_user, this.token).subscribe((profile: any) =>{
              this.profile = profile[0]
              this.userProfileMap[request.id] = this.profile.profilepic;
            });
            this.userMap[request.id] =user.username
          })
        })
      },
      (error) => {
        console.error('Error sending friend request:', error);
      }
    );
  }

  FriendRequest(requestId: number,toUser:number,fromUser:number): void {
    console.log(requestId, "request id")
    const friendshipData: Friendship = {
      user:  toUser, 
      follower: fromUser,
      created_at: new Date() 
    };

    this.friendshipService.postFriendshipData(friendshipData, this.storedUserData.token).subscribe(
      response => {
        console.log('Friendship data posted successfully:', response);
        this.getfriendRequestlist()
        this.deleteFriendRequest(requestId)
      },
      error => {
        console.error('Error posting friendship data:', error);
      }
    );
   
   
  }

  deleteFriendRequest(requestId: number): void {
    this.friendRequestService.deleteFriendRequest(requestId)
      .subscribe(
        () => {
          console.log('Friendship data deleted successfully.');
          this.getfriendRequestlist()
        }
        
      );
  }
}

