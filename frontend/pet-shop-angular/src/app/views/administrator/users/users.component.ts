import { Component } from '@angular/core';
import { UserAttributes, UsersService } from '../../../services/users.service';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  users: UserAttributes[]=[];

  constructor(private userService : UsersService){
    this.userService.getAllUsers().subscribe((data)=>{
      this.users=data as UserAttributes[];
    },(err)=>{
      console.error(err)
    })
  }

}
