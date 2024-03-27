import { Component } from '@angular/core';
import { UploadStoryService } from '../../services/user-story.service';
import { FriendshipService } from '../../services/friendship.service';
import { Friendship } from '../../models/friendship';
import { UserService } from '../../services/user.service';
import { Users } from '../../models/user';

@Component({
  selector: 'story-panel',
  templateUrl: './story-panel.component.html',
  styleUrl: './story-panel.component.css'
})
export class StoryPanelComponent {
  selectedStory: any;
  storedUserData: any;
  detail: Friendship[] | undefined = [];
  stories:any;
  userId: number = 0;
  userMap: { [key: string]: string } = {};

  token: string = '';
  
  constructor(private storyService:UploadStoryService,
    private friendshipService: FriendshipService,
    private userService: UserService) { }

  ngOnInit() {
    const userData = localStorage.getItem('userData');
    if (userData) {
      this.storedUserData = JSON.parse(userData);
    }
    this.token = "Token " + this.storedUserData.token;
    this.userId = this.storedUserData.userid;

    console.log(this.storedUserData.userid)
    this.friendshipService.getFriendList(this.userId, this.token).subscribe((data: Friendship[]) => {
      this.detail = data;
      console.log(this.detail,'story friend list')
      this.detail.forEach((detail: Friendship) => {
        let friend_id = detail.follower;

        this.storyService.getStoryById(friend_id, this.token).subscribe((data: any[]) => {
          this.stories = data;
          data.forEach((request:any)=>{
            this.userService.getUserById(request.user,this.token).subscribe((user:Users)=>{
              // this.userProfileService.getUserProfileForUser(request.from_user, this.token).subscribe((profile: any) =>{
              //   this.profile = profile[0]
              //   this.userProfileMap[request.id] = this.profile.profilepic;
              // });
              this.userMap[request.id] =user.username;
              console.log('username for story',user.username)
            })
          })
          console.log(this.stories,'stories')
        });
      })
    });
  }
  
  
  showStory(story: any) {
    this.selectedStory = story;
  }

  closeModal() {
    this.selectedStory = null;
  }
}
