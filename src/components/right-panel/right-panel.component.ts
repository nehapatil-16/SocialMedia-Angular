import { Component } from '@angular/core';
import { Users } from '../../models/user';
import { FriendRequestService } from '../../services/friend-rquest.service';
import { UserService } from '../../services/user.service';
import { FriendRequest } from '../../models/friend-request';
import { FriendshipService } from '../../services/friendship.service';
import { Friendship } from '../../models/friendship';
import { UserProfile } from '../../models/user-profile';
import { UserProfileService } from '../../services/user-profile.service';

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrl: './right-panel.component.css'
})
export class RightPanelComponent {
  nonFriendUsers: any;

  title = 'regex-portal';
  friendReq: FriendRequest[]=[];
  friendList:Friendship[]=[]
  friendUserName:string[]=[]
currentLoginId:any;  // toUserId: number=5
  storedUserData: any;
  token: any;
  userProfileMap: { [key: string]: string } = {};
  profile: any;


  constructor(private userService: UserService,private friendRequestService: FriendRequestService,
             private Friendship :FriendshipService, private userProfileService:UserProfileService ) {}

  ngOnInit() {
    
    const userData = localStorage.getItem('userData');
    if (userData) {
      this.storedUserData = JSON.parse(userData);
      this.token = "Token " + this.storedUserData.token;

    }
    this.currentLoginId=localStorage.getItem('id')
    this.getNonFriendUsers(this.storedUserData.userid); 
    this.getFriendList(this.storedUserData.userid);
  }
  getNonFriendUsers(userId: number): void {
    this.userService.getNonFriendUsers(userId, this.token)
      .subscribe(
        (data: any) => {
          this.nonFriendUsers = data.users;
          this.nonFriendUsers.forEach((nonfriend:  Users) => {
            this.userProfileService.getUserProfileForUser(nonfriend.id, this.token).subscribe((profile: any) => {
              this.profile = profile[0]
              this.userProfileMap[nonfriend.id] = this.profile.profilepic;
            });
          });
        },
        (error: any) => {
          console.error('Error fetching non-friend users:', error);
        }
      );
  }
  onClickSendFriendRequest(fromUserId: number, toUserId: number): void {

    this.friendRequestService.getFriendRequests(this.token ).subscribe((data: FriendRequest[]) => {
      this.friendReq = data;
      const isRequestSent = this.friendReq.some(request =>
        request.from_user === fromUserId && request.to_user === toUserId
    );

    if (isRequestSent) {
      alert("you have alreay sent request")

        console.log(`A request from user ${fromUserId} to user ${toUserId} already exists.`);
    } else {
        console.log(`No request from user ${fromUserId} to user ${toUserId} found.`);
        this.friendRequestService.sendFriendRequest(fromUserId, toUserId,this.token).subscribe(
      response => {
        alert("Friend request sent")

      },
      error => {
        console.error('Error sending friend request:', error);
      }
    );
    }


    });
    
  }
  getFriendList(userId: number): void {
    const userData = localStorage.getItem('userData');
    if (userData) {
      this.storedUserData = JSON.parse(userData);
    }
    this.Friendship.getFriendList(userId, this.token)
      .subscribe(
        (data: Friendship[]) => {
          this.friendList = data;
          for (let i = 0; i < this.friendList.length; i++) {
            console.log(this.friendList[i]);
            this.userService.getUserById(this.friendList[i].follower,this.token).subscribe(data => {
             
              this.friendUserName.push(data.username);
            });

          }

        },
        (error: any) => {
          console.error('Error fetching friend list:', error);
        }
      );
  }
  deleteFriend(id: number): void {
    const userData = localStorage.getItem('userData');
    if (userData) {
      this.storedUserData = JSON.parse(userData);
    }
    this.Friendship.deleteFriend(id, this.storedUserData.token)
      .subscribe(
        () => {
          alert("Friend deleted successfully")

        },
        (error: any) => {
          console.error('Error deleting friend:', error);
        }
      );
  }
}