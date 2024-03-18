import { Component } from '@angular/core';
import { CommentService } from '../../services/comments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserPost } from '../../models/userpost';
import { ImageUploadService } from '../../services/image-upload.service';
import { UserService } from '../../services/user.service';
import { Users } from '../../models/user';
import { UserProfileService } from '../../services/user-profile.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {
  post: UserPost | undefined;
  shouts: string = '';
  imageUrl: string | undefined;
  videoUrl: string | undefined;
  audioUrl: string | undefined;
  file: File | undefined;
  shoutText: string = '';
  ComentText: string='';
  userMap: { [key: string]: string } = {};

  comment: any[] = [];
  storedUserData: any;
  token: any;
  postIdUrl:number=0;
  comments: any;


  constructor(private commentService: CommentService,private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,private imageUploadService: ImageUploadService) { }

  ngOnInit(){

    this.postIdUrl= this.route.snapshot.params['id'];

    const userData = localStorage.getItem('userData');
    if (userData) {
      this.storedUserData = JSON.parse(userData);
      this.token = "Token " + this.storedUserData.token;

    }
    this.loadComments()

    this.imageUploadService.getSinglePostById( this.postIdUrl,this.token).subscribe((data: UserPost) => {
      this.post = data;
      console.log(this.post)
    });
  }
  
  loadComments() {
    this.commentService.getCommentbyId( this.postIdUrl).subscribe(
      (response: any) => {
        this.comments = response;
        console.log('Fetched comments:', this.comments);
        response.forEach((comment:any)=>{
          this.userService.getUserById(comment.user,this.token).subscribe((user:Users)=>{
            console.log('username',user.username)
           console.log('comment.user',comment.user)
            this.userMap[comment.id] =user.username
          })
        })
      },
      error => {
        console.error('Error fetching comments:', error);
      }
    );
  }

  getMediaType(media: string|File): string {
    media = media.toString().toLowerCase()
    if (typeof media === 'string') {
      if (media.endsWith('.jpg') || media.endsWith('.png') || media.endsWith('.gif') || media.endsWith('.jfif')) {
        return 'image';
      } else if (media.endsWith('.mp4')) {
        return 'video';
      } else if (media.endsWith('.mp3')) {
        return 'audio';
      } else {
        return 'unsupported';
      }
    } else 
    {
      return 'file';
    }
  }
  onImageFileChange(event: any) {
    const selectedFile = event.target.files ? event.target.files[0] : undefined;
    if (selectedFile !== undefined) {
      console.log(selectedFile)
      this.file = selectedFile;
    }
  }
 
  onSubmit() {
    var data = {
      user:  this.storedUserData.userid,
      user_post: this.postIdUrl,
      content: this.ComentText
    }
    console.log(this.ComentText,'comment')
    this.commentService.addComment(data).subscribe((res)=>{
      (document.getElementById('comment') as HTMLTextAreaElement).value = ''
      this.loadComments()
      alert('comment added successfully')

    })   
  }
  reply(commentid: number){
    console.log(commentid)
  }
}