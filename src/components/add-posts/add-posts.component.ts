import { Component } from '@angular/core';
import { ImageUploadService } from '../../services/image-upload.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-posts',
  templateUrl: './add-posts.component.html',
  styleUrls: ['./add-posts.component.css'],
})
export class AddPostsComponent {
  selectedFiles: File[] = [];
  shoutText: string = '';
  date: Date | undefined;
  user_id: number = 0;
  token: string = '';

  constructor(
    private imageUploadService: ImageUploadService,
    private router: Router
  ) {}

  onImageFileChange(event: any) {
    const selectedFilesList = event.target.files;
    if (selectedFilesList) {
      for (let i = 0; i < selectedFilesList.length; i++) {
        const selectedFile = selectedFilesList[i];
        console.log('Selected file name:', selectedFile.name);
        this.selectedFiles.push(selectedFile);
      }
    }
  }

  onFormSubmit(): void {
    // if (this.selectedFiles.length > 0 || this.shoutText) {
    this.date = new Date();
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      this.token = userData.token;
      this.user_id = userData.userid;
    }
    
    // Posting text
    if (!this.shoutText && this.selectedFiles.length == 0) {
      alert('Please enter data to post.');
    } 
    else {
      if (this.selectedFiles.length > 0) {
        this.imageUploadService
          .postText(this.user_id, this.date, this.shoutText, this.token)
          .subscribe(
            (response: any) => {
              console.log('Text uploaded successfully');

              if (this.selectedFiles.length > 0) {
                this.imageUploadService
                  .postShout(response.id, this.selectedFiles, this.token)
                  .subscribe(
                    (response: any) => {
                      this.router.navigate(['/dashboard/user-profile']);
                      alert('Post uploaded successfully');
                    },
                    (error: any) => {
                      console.error('Error uploading post');
                    }
                  );
              } 
              else {
                this.router.navigate(['/dashboard/user-profile']);
              }
            },
            (error: any) => {
              alert('Error uploading text');
            }
          );
      } 
      else {
        this.imageUploadService
          .postText(this.user_id, this.date, this.shoutText, this.token)
          .subscribe(
            (response: any) => {
              alert('Post uploaded successfully');
              this.router.navigate(['/dashboard/user-profile']);
            },
            (error: any) => {
              alert('Error uploading text');
            }
          );
      }
    }
  }
}

// import { Component } from '@angular/core';
// import { ImageUploadService } from '../../services/image-upload.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-add-posts',
//   templateUrl: './add-posts.component.html',
//   styleUrls: ['./add-posts.component.css'],
// })
// export class AddPostsComponent {
//   selectedFiles: File[] = [];
//   shoutText: string = '';
//   date: Date | undefined;

//   constructor(private imageUploadService: ImageUploadService, private router: Router) {}

//   onImageFileChange(event: any) {
//     const selectedFilesList = event.target.files;
//     if (selectedFilesList) {
//       for (let i = 0; i < selectedFilesList.length; i++) {
//         const selectedFile = selectedFilesList[i];
//         console.log('Selected file name:', selectedFile.name);
//         this.selectedFiles.push(selectedFile);
//       }
//     }
//   }

//   onFormSubmit(): void {
//     this.date = new Date();
//     if (this.selectedFiles.length > 0 || this.shoutText) {
//       const userDataString = localStorage.getItem('userData');
//       if (userDataString) {
//         const userData = JSON.parse(userDataString);
//         const token = userData.token;
//         const user_id = userData.userid;

//         // Posting text
//         if (this.shoutText) {
//           this.imageUploadService.postText(user_id, this.date, this.shoutText, token).subscribe((response:any) => {
//               alert('Post uploaded successfully')

//               if (this.selectedFiles.length > 0) {
//                 this.imageUploadService.postShout(response.id, this.selectedFiles, token).subscribe(
//                   (response:any) => {
//                     this.router.navigate(['/dashboard/user-profile']);
//                     // alert('Post uploaded successfully');
//                   },
//                   (error:any) => {
//                     console.error('Error uploading post');
//                   }
//                 );
//               }
//               else{
//                 this.router.navigate(['/dashboard/user-profile']);
//               }
//               // window.location.reload();
//             },
//             (error:any) => {
//               alert('Error uploading text');
//             }
//           );
//         }

//       } else {
//         console.error('Please add text');
//       }
//     } else {
//       alert('Please enter data to post.');
//     }
//   }
// }
