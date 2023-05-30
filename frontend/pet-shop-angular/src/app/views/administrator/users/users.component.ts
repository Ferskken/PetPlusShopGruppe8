import { Component } from '@angular/core';
import { UserAttributes, UsersService } from '../../../services/users.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  users: UserAttributes[]=[];

  constructor(private userService : UsersService){
    this.userService.getAllUsers().pipe(first()).subscribe((data)=>{
      this.users=data as UserAttributes[];
    },(err)=>{
      console.error(err)
    })
  }

}
