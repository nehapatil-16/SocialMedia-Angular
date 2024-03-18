import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FriendRequestService } from '../../services/friend-rquest.service';
import { FriendshipService } from '../../services/friendship.service';
import { Friendship } from '../../models/friendship';
import { UserProfileService } from '../../services/user-profile.service';

import { Users } from '../../models/user';
import { UserProfile } from '../../models/user-profile';

@Component({
  selector: 'friends',
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.css',
})
export class FriendsComponent {
  // friendList: Friendship[] = []
  friendList: any;
  friendUserName: string[] = [];
  currentUserId: any;
  userId: number = 0;
  username: string = '';
  token: string = '';
  storedUserData: any;
  userMap: { [key: string]: string } = {};
  userProfileMap: { [key: string]: string } = {};
  profile: any;

  constructor(
    private userService: UserService,
    private friendRequestService: FriendRequestService,
    private Friendship: FriendshipService,
    private userProfileService: UserProfileService
  ) {}
  ngOnInit() {
    interface UserData {
      userid: number;
      username: string;
      token: string;
    }

    const userData = localStorage.getItem('userData');
    if (userData) {
      this.storedUserData = JSON.parse(userData);
      this.token = 'Token ' + this.storedUserData.token;
    }
    this.currentUserId = localStorage.getItem('id');
    this.getFriendList(this.storedUserData.userid);

    
  }
  getFriendList(userId: number): void {
    this.Friendship.getFriendList(userId, this.token).subscribe(
      (data: Friendship[]) => {
        this.friendList = data;
        data.forEach((Friend: any) => {
          this.userService
            .getUserById(Friend.follower, this.token)
            .subscribe((user: Users) => {
              console.log('username', user.username);
              this.userProfileService
                .getUserProfileForUser(Friend.follower, this.token)
                .subscribe((profile: any) => {
                  this.profile = profile[0]
                  this.userProfileMap[Friend.id] = this.profile.profilepic;
                });
              this.userMap[Friend.id] = user.username;
            });
        });
      },
      (error: any) => {
        console.error('Error fetching friend list:', error);
      }
    );
  }
  deleteFriend(id: number): void {
    this.Friendship.deleteFriend(id, this.token).subscribe(
      () => {
        alert('Friend deleted successfully');
        this.getFriendList(this.storedUserData.userid);
      },
      (error: any) => {
        console.error('Error deleting friend:', error);
      }
    );
  }
}
