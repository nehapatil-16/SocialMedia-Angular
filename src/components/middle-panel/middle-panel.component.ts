import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { UserProfileService } from '../../services/user-profile.service';
import { ReportService } from '../../services/report.service';
import { FriendshipService } from '../../services/friendship.service';
import { ImageUploadService } from '../../services/image-upload.service';
import { LikePostsService } from '../../services/like-posts.service';
import { Router } from '@angular/router';
import { Users } from '../../models/user';
import { UserProfile } from '../../models/user-profile';
import { Friendship } from '../../models/friendship';
import { UserPost } from '../../models/userpost';
import { Media } from '../../models/media';
import { CarouselComponent } from 'ngx-bootstrap/carousel';

@Component({
  selector: 'app-middle-panel',
  templateUrl: './middle-panel.component.html',
  styleUrls: ['./middle-panel.component.css'],
})
export class MiddlePanelComponent implements OnInit {
  @ViewChild(CarouselComponent) carousel!: CarouselComponent;

  userId: number = 0;
  token: string = '';
  userMap: { [key: string]: string } = {};
  userProfileMap: { [key: string]: string } = {};
  MediaOfShouts: { [key: number]: Media[] } = {};
  reportMap: { [key: number]: number } = {};
  post: UserPost[] = [];
  likePost: { [key: number]: number } = {};
  storedUserData: any;
  detail: any;
  report: any;
  profile: any;
  media: any;

  constructor(
    private userService: UserService,
    private userProfileService: UserProfileService,
    private reportService: ReportService,
    private friendshipService: FriendshipService,
    private imageUploadService: ImageUploadService,
    private likePostsService: LikePostsService,
    private router: Router,
    private elementRef: ElementRef
  ) {}



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
        this.report = null;
        
        this.imageUploadService.getPostsById(friend_id, this.token).subscribe((data: UserPost[]) => {
          data.forEach((post: UserPost) => {
            this.imageUploadService.getMediaById(post.id, this.token).subscribe((data: Media[]) => {
              this.media = data;
              this.MediaOfShouts[post.id] = this.media;
            });
    
            this.likePostsService.getLikesbyId(this.userId).subscribe((res: any) => {
              res.forEach((like: any) => {
                const postId = like.user_post;
                this.likePost[postId] = like.id;
              });
            });
    
            this.reportService.getReportPost(this.userId, post.id, this.token).subscribe((data: any) => {
              this.report = data;
              console.log(this.report);
              this.reportMap[post.id] = this.report.length;
             
              if(this.report.length == 0){
                this.userService.getUserById(post.user, this.token).subscribe((user: Users) => {
                  this.userProfileService.getUserProfileForUser(user.id, this.token).subscribe((profile: any) => {
                    this.profile = profile[0];
                    this.userProfileMap[post.id] = this.profile.profilepic;
                  });
                  this.userMap[post.id] = user.username;
                });
              }
            });
            // Append the post to this.post instead of overwriting it
            this.post.push(post);
          });
        });
      });
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

  userLikedPost(postId: number): boolean {
    return this.likePost[postId] !== undefined;
  }

  like(postId: number) {
    const data = {
      user: this.storedUserData.userid,
      user_post: postId,
    };
  
    this.likePostsService.addLike(data).subscribe((res: any) => {
      const newLikeId = res.like_id; 
      this.likePost[postId] = newLikeId;
      window.location.reload();
    });
  }

  unlike(postId: number) {
    const userId = this.storedUserData.userid;
    const likeId = this.likePost[postId];
  
    if (likeId !== undefined) {
      this.likePostsService.deleteLike(likeId).subscribe(() => {
        delete this.likePost[postId];
      });
    }
  }

  prevSlide(): void {
    this.carousel.previousSlide();
  }

  nextSlide(): void {
    this.carousel.nextSlide();
  }
}
