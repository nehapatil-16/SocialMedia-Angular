
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FriendRequest } from '../../models/friend-request';
import { FriendRequestService } from '../../services/friend-rquest.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  username: string = '';
  password: string = '';
  // accept delete functionality starts
  friendReq: FriendRequest[] = [];
  loggedInUser:any
  data:any
  storedUserData: any;
  token: any;

  constructor(private friendRequestService: FriendRequestService,private router: Router) { }


  ngOnInit() {
    
    const userData = localStorage.getItem('userData');
    if (userData) {
      this.storedUserData = JSON.parse(userData);
      this.token = "Token " + this.storedUserData.token;

    }
      this.friendRequestService.getFriendRequestForUser(this.storedUserData.userid,this.token)
        .subscribe(
          (response) => {
            console.log('Friend accept  successfully:', response);
            // Handle success response
            this.friendReq = response;
            console.log( this.friendReq , 'this.friendReq' )
          },
          (error) => {
            console.error('Error sending friend request:', error);
            // Handle error response
          }
        );
   
  }

  logout(){
    localStorage.clear();
    sessionStorage.clear();
    this.username = "";
    this.password = "";
    this.router.navigate(['/signIn']);

  }
 
}
