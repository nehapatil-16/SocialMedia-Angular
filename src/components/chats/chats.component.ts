import { Component } from '@angular/core';
import { ChatService } from '../../services/chats.service';
import { Chat } from '../../models/chat';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserProfileService } from '../../services/user-profile.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.css'
})
export class ChatsComponent {
  message: string = '';
  storedUserData: any;
  token: any;
  newUserId: number = 0;
  userId: number = 0;
  username: string = '';
  chats: any;
  chat1: any;
  id: any;
  chat2: any;
  usernameMap: {[key: number]:string} = {};
  profilepic: any
  firstname: any;
  lastname: any;
  profile: any;
  user: any;

  constructor(private chatService: ChatService, private route: ActivatedRoute, private userService: UserService, private userProfileService:UserProfileService) { }
  ngOnInit() {
    const userData = localStorage.getItem('userData');
    if (userData) {
      this.storedUserData = JSON.parse(userData);
    }
    this.userId = this.storedUserData.userid;
    this.token = 'Token ' + this.storedUserData.token;
    this.username = this.storedUserData.username;
    this.firstname = this.storedUserData.firstname;
    this.lastname = this.storedUserData.lastname;

    this.route.params.subscribe(params => {
      this.newUserId = +params['userId'];
      this.profilepic = params['profilepic'];
      console.log(this.profilepic)

    this.userService.getUserById(this.newUserId, this.token)
    .subscribe((data: any) => {
      this.user = data;
    });

    this.userProfileService.getUserProfileForUser(this.newUserId, this.token)
      .subscribe((data: any) => {
        this.profile = data[0];
      });
    });
    
    this.chatService.getChats(this.token).subscribe((data: { user: number; username: number; receiver: string; chats: string }[]) => {
      this.chats = data;
      this.chat1 = data.map(chat => ({ user: chat.user, username: chat.username, receiver: chat.receiver, chats: chat.chats }));

      this.chat2 = this.chat1.filter((chat: { user: number; username: number; receiver: string; chats: string }) => (
        chat.user === this.userId || chat.user === this.newUserId) && (chat.username === this.newUserId || chat.username === this.userId));
      console.log(this.chat2)

      this.chat2.forEach((chat: { user: number; }) => {
        this.userService.getUserById(chat.user, this.token).subscribe((data: any) => {
          console.log(data)
          this.usernameMap[chat.user] = data.username
         
        },
          (error: any) => {
            console.error('Error fetching users:', error);
          }
        );
      }); 
    }
  );
}


// constructor() {}
sendMessage(): void {
  console.log(this.message)
    if(this.message) {
  var data = {
    user: this.storedUserData.userid,
    username: this.newUserId,
    receiver: 'girija',
    chats: this.message
  }
  this.chatService.sendMessage(data, this.token).subscribe(
    response => {
      window.location.reload();
    },
    error => {
      console.error(error);
      // Handle error
    }
  );
}
  }
}
