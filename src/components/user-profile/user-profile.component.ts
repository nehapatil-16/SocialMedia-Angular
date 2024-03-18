import { Component } from '@angular/core';
import { ImageUploadService } from '../../services/image-upload.service';
import { UserPost } from '../../models/userpost';
import { Users } from '../../models/user';
import { UserService } from '../../services/user.service';
import { FriendshipService } from '../../services/friendship.service';
import { Friendship } from '../../models/friendship';
import { UserProfileService } from '../../services/user-profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent {
  post: UserPost[] | undefined;
  shouts: string = '';
  imageUrl: string | undefined;
  videoUrl: string | undefined;
  audioUrl: string | undefined;
  storedUserData: any;
  token: string = '';
  username: string = '';
  user: Users | undefined;
  firstname: string = '';
  lastname: string = '';
  friends: Friendship[] | undefined;
  profile: any;
  constructor(
    private imageUploadService: ImageUploadService,
    private userService: UserService,
    private friendshipService: FriendshipService,
    private userProfileService: UserProfileService,
    private router: Router,
  ) {}

  ngOnInit() {
    const userData = localStorage.getItem('userData');
    if (userData) {
      this.storedUserData = JSON.parse(userData);
    }
    this.token = 'Token ' + this.storedUserData.token;
    this.username = this.storedUserData.username;
    this.firstname = this.storedUserData.firstname;
    this.lastname = this.storedUserData.lastname;

    this.imageUploadService
      .getPostsById(this.storedUserData.userid, this.token)
      .subscribe((data: UserPost[]) => {
        this.post = data;
      });
    this.userService
      .getUserById(this.storedUserData.userid, this.token)
      .subscribe((data: Users) => {
        this.user = data;
      });
    this.friendshipService
      .getFriendList(this.storedUserData.userid, this.token)
      .subscribe((data: Friendship[]) => {
        this.friends = data;
      });
    this.userProfileService
      .getUserProfileForUser(this.storedUserData.userid, this.token)
      .subscribe((data: any) => {
        this.profile = data[0];
      });
  }

  getMediaType(media: string | File): string {
    media = media.toString().toLowerCase();
    if (typeof media === 'string') {
      if (
        media.endsWith('.jpg') ||
        media.endsWith('.png') ||
        media.endsWith('.gif') ||
        media.endsWith('.jfif')
      ) {
        return 'image';
      } else if (media.endsWith('.mp4')) {
        return 'video';
      } else if (media.endsWith('.mp3')) {
        return 'audio';
      } else {
        // Add more conditions for other media types if needed
        return 'unsupported';
      }
    } else {
      // Handle File objects (if needed)
      return 'file';
    }
  }
  comment(id: number) {
    this.router.navigate(['/dashboard/comment', id]);
    //  this.routes.navigate(['report-post/'+id]);
  }
  deletepost(id:number) {
    this.imageUploadService.deletePost(id, this.token).subscribe((data:any)=>{
      alert("Post deleted successfully")
      this.router.navigate(['/dashboard/user-profile']);
    })
  }
}
