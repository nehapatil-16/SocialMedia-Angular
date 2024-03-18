import { Component, Input } from '@angular/core';
import { FriendRequestService } from '../../services/friend-rquest.service';
import { FriendRequest } from '../../models/friend-request';
import { UserService } from '../../services/user.service';
import { Users } from '../../models/user';
import { Friendship } from '../../models/friendship';
import { FriendshipService } from '../../services/friendship.service';

@Component({
  selector: 'follow-request',
  templateUrl: './follow-request.component.html',
  styleUrl: './follow-request.component.css'
})
export class FollowRequestComponent {
  @Input() request: any;

  userData: Users[] = []
  storedUserData: any;

  constructor(private Friendrequset: FriendRequestService,
    private userService: UserService,
    private friendshipService: FriendshipService) { }
  ngOnInit() {
    this.getUsername();
  }

  getUsername() {
    this.userService.getUserById(this.request.from_user, this.storedUserData.token)
      .subscribe(data => {
        // Assign the fetched user data to the userData variable
        this.userData = data.username;
        console.log('User Data:', this.userData);
      });
  }

  FriendRequest(requestId: number, status: string): void {
    const userData = localStorage.getItem('userData');
    if (userData) {
      this.storedUserData = JSON.parse(userData);
    }
    this.Friendrequset.updateIsAccepted(requestId, status).subscribe(
      (response) => {
        console.log('Friend request accepted:', response);
        console.log(requestId);
        const friendshipData: Friendship = {
          user: this.request.from_user, 
          follower: this.request.to_user, 
          created_at: new Date() 
        };

        this.friendshipService.postFriendshipData(friendshipData, this.storedUserData.token).subscribe(
          response => {
            console.log('Friendship data posted successfully:', response);
            this.deleteFriendRequest(requestId)
          },
          error => {
            console.error('Error posting friendship data:', error);
          }
        );
        this.deleteFriendRequest(requestId)
      },
      (error) => {
        console.error('Error accepting friend request:', error);
        //     // Handle error response
      }
    );
  }

  deleteFriendRequest(requestId: number): void {
    this.Friendrequset.deleteFriendRequest(requestId)
      .subscribe(
        () => {
          console.log('Friendship data deleted successfully.');
          // You can perform additional actions here after successful deletion
        }
        // ,
        // error => {
        //   console.error('Error deleting friendship data:', error);
        //   // Handle error responses appropriately
        // }
      );
  }


}

