import { Component } from '@angular/core';
import { UploadStoryService } from '../../services/user-story.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-story',
  templateUrl: './add-story.component.html',
  styleUrl: './add-story.component.css'
})
export class AddStoryComponent {
  selectedFile: File | null = null;

  // shoutText:string='';
  storedUserData: any;
  token: string = '';
  file: File | undefined;

  constructor(private storyService:UploadStoryService,
    private router: Router){}

  ngOnInit() {
    const userData = localStorage.getItem('userData');
    if (userData) {
      this.storedUserData = JSON.parse(userData);
    }
    this.token = 'Token ' + this.storedUserData.token;
  }

  onImageFileChange(event:any){
    const selectedFile = event.target.files ? event.target.files[0] : undefined;
    if (selectedFile !== undefined) {
      console.log(selectedFile);
      this.file = selectedFile;
    }
  }
 onFormSubmit(): void {
    // if (this.file || this.shoutText) {
      if (this.file) {
        this.storyService
          .uploadStory(this.storedUserData.userid,this.file, this.token)
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
      } 
   
    else {
      alert('Please add shouts first');
    }
  }
}
