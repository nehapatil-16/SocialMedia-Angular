import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Users } from '../../models/user';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { RegisterService } from '../../services/register.service';
import { UserProfileService } from '../../services/user-profile.service';

@Component({
  selector: 'signup',
  templateUrl: './sign-up-page.component.html',
  styleUrl: './sign-up-page.component.css'
})


export class SignUpPageComponent {
  registrationForm: FormGroup;
 

  constructor(private fb: FormBuilder,private registerService: RegisterService, private userProfileService: UserProfileService,private router: Router) {
    this.registrationForm = new FormGroup({
      username: new FormControl('', Validators.required),
      firstname: new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z]+$/)]),
      lastname: new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z]+$/)]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/),
      ]),
      cpassword: new FormControl('', Validators.required),

      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[a-z0-9._%+-]+@([a-z0-9-]+\.)+[a-z]{2,4}$/i), 
    Validators.pattern(/\.com$/i), 
    Validators.pattern(/^[^A-Z]*$/),
      ]),
    }, 
    { validators: this.passwordMatchValidator });
  }

  get email(){
    return this.registrationForm.get('email');
  }

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const cpassword = control.get('cpassword')?.value;

    return password === cpassword ? null : { mismatch: true };
  };

  ngOnInit(){

  }
  onFormSubmit(){
    if(this.registrationForm.valid){

      const formData = new FormData();
      formData.append('username', this.registrationForm.get('username')?.value);
      formData.append('firstname', this.registrationForm.get('firstname')?.value);
      formData.append('lastname', this.registrationForm.get('lastname')?.value);
      formData.append('password', this.registrationForm.get('password')?.value);
      // formData.append('cpassword', this.registrationForm.get('cpassword')?.value);
      formData.append('email', this.registrationForm.get('email')?.value);
      // formData.append('gender', this.registrationForm.get('gender')?.value);
      // formData.append('dob', this.registrationForm.get('dob')?.value);
    
      console.log(formData)

      // Call the postData method of PostService to make the HTTP POST request
      this.registerService.register(formData).subscribe(
        (response) => {
        
          alert('Registration successful');
          // Navigate to the registration page after showing the alert
          // window.location.reload();
          this.router.navigate(['/signIn']);
        },
        (error) => {
          alert("Username already exists")
          console.error('Registration failed:', error);
        }
      );
    } else {
      alert('Userform is not valid!!')
    }
    console.log(this.registrationForm)
  }
}
