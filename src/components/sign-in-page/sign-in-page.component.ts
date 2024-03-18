import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Users } from '../../models/user';
import { UserComponent } from '../user/user.component';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { UserProfileService } from '../../services/user-profile.service';

@Component({
  selector: 'signIn',
  templateUrl: './sign-in-page.component.html',
  styleUrl: './sign-in-page.component.css'
})
export class SignInPageComponent {
  storedUserData: any;
  token: string='';

  constructor(private loginService: LoginService, private route: ActivatedRoute,private router: Router) {}
  user: Users[] | undefined = [];
  username: string = '';
  password: string = '';
  flag: boolean = false;

  ngOnInit() {
    const userData = localStorage.getItem('userData');
    if (userData) {
      this.storedUserData = JSON.parse(userData);
      this.token = "Token " + this.storedUserData.token;
    }
  }

  onFormSubmit(){
    const formData = new FormData();
    formData.append('username', this.username);
    formData.append('password', this.password);

    this.loginService.login(formData).subscribe(
      (response) => {
      console.log('Login successful:', response);

        if (response.userid && response.username && response.token) {    
          const userData = {
            userid: response.userid,
            username: response.username,
            firstname: response.firstname,
            lastname: response.lastname,
            token: response.token,
          };
          localStorage.setItem('userData', JSON.stringify(userData));
          
          this.router.navigate(['/dashboard']);
          // this.router.navigateByUrl('/', { skipLocationChange: true });
        } 
        else {
          console.error('Incomplete user data received');   
        }
      },
      (error) => {
        alert("Username or Password is incorrect")
      }
    );
  }
  logout(){
    localStorage.clear();
    sessionStorage.clear();
    this.username = "";
    this.password = "";
  }
}

 

