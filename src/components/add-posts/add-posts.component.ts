import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ImageUploadService } from '../../services/image-upload.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-posts',
  templateUrl: './add-posts.component.html',
  styleUrls: ['./add-posts.component.css'],
})
export class AddPostsComponent {
  selectedFile: File | null = null;
  storedUserData: any;
  token: string = '';
  date: Date | undefined;

  constructor(
    private imageUploadService: ImageUploadService,
    private router: Router
  ) {}
  shoutText: string = '';
  // file: File[] = [];
  file: File | undefined;
  ngOnInit() {
    const userData = localStorage.getItem('userData');
    if (userData) {
      this.storedUserData = JSON.parse(userData);
    }
    this.token = 'Token ' + this.storedUserData.token;
  }

  onImageFileChange(event: any) {
    const selectedFile = event.target.files ? event.target.files[0] : undefined;
    if (selectedFile !== undefined) {
      console.log(selectedFile);
      this.file = selectedFile;
    }
  }

  onFormSubmit(): void {
    this.date = new Date();
    if (this.file || this.shoutText) {
      if (this.file) {
        this.imageUploadService
          .uploadImage(this.storedUserData.userid,this.date, this.shoutText, this.file, this.token)
          .subscribe(
            (response) => 
            {
              alert('Post uploaded successfully:');
              this.router.navigate(['/dashboard/user-profile']);
            },
            (error) => 
            {
              alert('Error uploading post');
            }
          );
      } else {
        this.imageUploadService
          .uploadText(this.storedUserData.userid, this.date, this.shoutText, this.token)
          .subscribe(
            (response) => {
              alert('Post uploaded successfully');
              this.router.navigate(['/dashboard/user-profile']);
            },
            (error) => {
              alert('Error uploading post');
            }
          );
      }
    } 
    else {
      alert('Please add shouts first');
    }
  }
}