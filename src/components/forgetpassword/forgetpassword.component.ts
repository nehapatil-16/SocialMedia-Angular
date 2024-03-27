import { Component, inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})

export class ForgetpasswordComponent {
  username: string = '';
  email: string = '';
  otp: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  isSubmitted: boolean = false;
  otpSubmitted: boolean = false;
  passwordUpdated: boolean = false;

  constructor(private http: HttpClient) {}

  submitForm() {
    this.isSubmitted = true;
    this.http.post<any>('http://127.0.0.1:8000/check-user-exists/' , { email: this.email, username: this.username}).subscribe(response => {
      if (response.message === 'user exists') {
        this.otpSubmitted = true;
      }else{
        console.log('User does not exist')
      }
    }, error => {
      console.error(error);
    });
  }

  submitOTP() {
    if (this.otp === '123456') {
      this.passwordUpdated = true;
    }else {
      alert('Incorrect OTP');
      console.log('Incorrect OTP');
    }
  }

  updatePassword(){
    if (this.newPassword !== this.confirmPassword){
      alert('Password and Confirm Password does not match')
      return;
    }
    this.http.post<any>('http://127.0.0.1:8000/update-password/' , { newPassword: this.newPassword, username: this.username}).subscribe(response => {
      alert('Password updated successfully')
    }, error => {
      console.log('error');
    });
  }

}