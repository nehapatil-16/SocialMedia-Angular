import { Component } from '@angular/core';
import { Users} from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  user: Users[]=[];
  title = 'regex-portal';
  storedUserData: any;

  constructor(private userService: UserService) {}

  ngOnInit() {
    const userData = localStorage.getItem('userData');
    if (userData) {
      this.storedUserData = JSON.parse(userData);
    }
    // this.getEntries();
    this.userService.getUsers(this.storedUserData.token).subscribe((data: Users[]) => {
      this.user = data;
      console.log(this.user)
    });
  }

  

  
}
