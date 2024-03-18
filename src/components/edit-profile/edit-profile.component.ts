import { Component } from '@angular/core';
import { EditProfileService } from '../../services/edit-profile.service';
import { UserProfileService } from '../../services/user-profile.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {
  storedUserData: any;
  token: string ='';
  username: string = '';
  firstname: string = '';
  lastname: string ='';
  bio: string = '';
  file: File | undefined;
  userid: number=0;
  profile: any;
  profileId: number=0;
  constructor(private editProfileService:EditProfileService, private userProfileService:UserProfileService,private router:Router,private route: ActivatedRoute){}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.profileId = +params['id']; 
    });

    const userData = localStorage.getItem('userData');
    if (userData) {
      this.storedUserData = JSON.parse(userData);
    }
    this.userid = this.storedUserData.userid;
    this.token = "Token " + this.storedUserData.token;
    this.username = this.storedUserData.username;
    this.firstname = this.storedUserData.firstname;
    this.lastname = this.storedUserData.lastname;

    this.userProfileService.getUserProfileForUser(this.storedUserData.userid, this.token).subscribe((data:any)=>{
      console.log(data)
      this.profile = data[0]
      this.bio = this.profile.bio;
    })
  }
  onImageFileChange(event: any) {
    const selectedFile = event.target.files ? event.target.files[0] : undefined;
    if (selectedFile !== undefined) {
      console.log(selectedFile)
      this.file = selectedFile;
    }
    
  }
  onFormSubmit()
  {
    const formData = new FormData();
    if (this.file !== null && this.file !== undefined) {
      formData.append('profilepic', this.file);
    }
      formData.append('username', this.username);
      formData.append('bio', this.bio);
      
      
      this.editProfileService.editProfile(this.profileId, formData, this.token).subscribe((data:any)=>{
        alert("Profile updated successfully")
        this.router.navigate(['/dashboard/user-profile'])
      })
  }
}
