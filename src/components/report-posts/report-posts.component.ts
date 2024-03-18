import { Component } from '@angular/core';
import { ImageUploadService } from '../../services/image-upload.service';
import { UserPost } from '../../models/userpost';
import { ReportService } from '../../services/report.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-report-posts',
  templateUrl: './report-posts.component.html',
  styleUrl: './report-posts.component.css',
})
export class ReportPostsComponent {
  post: UserPost | undefined;
  shouts: string = '';
  imageUrl: string | undefined;
  videoUrl: string | undefined;
  audioUrl: string | undefined;
  file: File | undefined;
  shoutText: string = '';
  reportText: string='';
  
  postIdUrl:number=0;
  storedUserData: any;
  token: any;
  
  constructor(private imageUploadService: ImageUploadService,private reportService: ReportService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    this.postIdUrl= this.route.snapshot.params['id'];

    const userData = localStorage.getItem('userData');
    if (userData) {
      this.storedUserData = JSON.parse(userData);
      this.token = "Token " + this.storedUserData.token;

    }

    this.imageUploadService.getSinglePostById( this.postIdUrl,this.token).subscribe((data: UserPost) => {
        this.post = data;
        console.log(this.post)
      });
  }
  
  getMediaType(media: string|File): string {
    media = media.toString().toLowerCase()
    if (typeof media === 'string') {
      if (media.endsWith('.jpg') || media.endsWith('.png') || media.endsWith('.gif')) {
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
  onImageFileChange(event: any) {
    const selectedFile = event.target.files ? event.target.files[0] : undefined;
    if (selectedFile !== undefined) {
      console.log(selectedFile)
      this.file = selectedFile;
    }
  }
 
  onSubmit() {
   
    const reportData = {
      reason: this.reportText,
      user_post: this.postIdUrl,
      user: this.storedUserData.userid
    };
    console.log(reportData)

     console.log(reportData)
    this.reportService.submitReport(reportData, this.storedUserData.token).subscribe(
      response => {
          alert('Reported successfully');
          this.router.navigate(['/dashboard']);
      },
      error => {
        console.error('Error submitting report:', error);
      }
    );
  }
}
