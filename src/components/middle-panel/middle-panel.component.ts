import { Component } from '@angular/core';
import { UserPost } from '../../models/userpost';
import { FriendsDetail } from '../../models/friends-detail';
import { ImageUploadService } from '../../services/image-upload.service';
import { FriendsDetailService } from '../../services/friends-detail.service';
import { FriendshipService } from '../../services/friendship.service';
import { Friendship } from '../../models/friendship';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Users } from '../../models/user';
import { UserProfileService } from '../../services/user-profile.service';
import { UserProfile } from '../../models/user-profile';
import { ReportService } from '../../services/report.service';
import { LikePostsService } from '../../services/like-posts.service';

@Component({
  selector: 'app-middle-panel',
  templateUrl: './middle-panel.component.html',
  styleUrl: './middle-panel.component.css',
})

export class MiddlePanelComponent {
  content: any;
  detail: Friendship[] | undefined = [];
  userpost: UserPost[] | undefined = [];
  user: Users[] | undefined = [];
  post: UserPost[] | undefined = [];
  shouts: string = '';
  imageUrl: string | undefined;
  videoUrl: string | undefined;
  audioUrl: string | undefined;

  storedUserData: any;
  userId: number = 0;
  username: string = '';
  token: string = '';
  userMap: { [key: string]: string } = {};
  userProfileMap: { [key: string]: string } = {};
  likePost: {[key:number]: number } = {};
  // likePost: { [key: number]: number[] } = {};
  reportMap: {[key: number]:number} = {};
  report: any;
  profile: any;
  constructor(private userService: UserService, private userProfileService: UserProfileService, private reportService: ReportService, private friendshipService: FriendshipService, private imageUploadService: ImageUploadService,private likePostsService: LikePostsService ,private router: Router) { }

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
      this.detail.forEach((detail: Friendship) => {
        let friend_id = detail.follower;
        console.log('id : ' + friend_id)
        this.report = null

        this.imageUploadService.getPostsById(friend_id, this.token).subscribe((data: UserPost[]) => {
          this.post = data;
          console.log(this.post)
          data.forEach((post: UserPost) => {
            console.log(post.id)

            this.likePostsService.getLikesbyId(this.userId).subscribe((res: any) => {
              res.forEach((like: any) => {
                const postId = like.user_post;
                this.likePost[postId] = like.id;
              });
            });

            this.reportService.getReportPost(this.userId, post.id, this.token).subscribe((data: any) => {
              this.report = data
              console.log(this.report)
              this.reportMap[post.id] = this.report.length;
             
              if(this.report.length == 0){
                this.userService.getUserById(post.user, this.token).subscribe((user: Users) => {
                  this.userProfileService.getUserProfileForUser(user.id, this.token).subscribe((profile: any) => {
                    this.profile = profile[0]
                    this.userProfileMap[post.id] = this.profile.profilepic;
                  });
                  this.userMap[post.id] = user.username
                });
              }
            });
            
            });
        });
      })
    });
  }

  getMediaType(media: string | File): string {
    media = media.toString().toLowerCase()
    if (typeof media === 'string') {
      if (media.endsWith('.jpg')|| media.endsWith('.png')|| media.endsWith('.gif')|| media.endsWith('.jfif')) {
        return 'image';
      } else if (media.endsWith('.mp4')) {
        return 'video';
      } else if (media.endsWith('.mp3')) {
        return 'audio';
      } else {
        return 'unsupported';
      }
    } else {
      return 'file';
    }
  }
  Report(id: number) {
    console.log('report id : ', id)
    this.router.navigate(['/dashboard/report-post', id]);
  }
  comment(id: number) {
    this.router.navigate(['/dashboard/comment', id]);
  }
  // like(id: number) {
  //   var data = {
  //     user:  this.storedUserData.userid,
  //     user_post: id,
  //   }
  //   this.likePostsService.addLike(data).subscribe((res)=>{
  //     alert('like successfully')

  //   })   
  // }

  userLikedPost(postId: number): boolean {
    return this.likePost[postId] !== undefined;
  }
  
  // userLikedPost(postId: number): boolean {
  //   return this.likePost[postId] && this.likePost[postId].length > 0;
  // }

  like(postId: number) {
    const data = {
      user: this.storedUserData.userid,
      user_post: postId,
    };
  
    this.likePostsService.addLike(data).subscribe((res: any) => {
      const newLikeId = res.like_id; // Assuming 'like_id' is the property in the response
      this.likePost[postId] = newLikeId;
      // alert('Like successful');
      window.location.reload();
    });
  }

  unlike(postId: number) {
    const userId = this.storedUserData.userid;
  
    // Find the likeId corresponding to the postId
    const likeId = this.likePost[postId];
  
    if (likeId !== undefined) {
      // Delete the like using the found likeId
      this.likePostsService.deleteLike(likeId).subscribe(() => {
        // Remove the postId entry from the likePost object
        delete this.likePost[postId];
        // alert('Unlike successful');
      });
    }
  }
}
