import { Component } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/user';
import { LoginDialogComponent } from 'src/app/views/my-page/login/login-dialog.component';
import { AuthenticationService } from 'src/app/services/autentication.service';
import { first } from 'rxjs';
import {MatRippleModule} from '@angular/material/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  user: User={} as User;

  constructor(
    public dialog: MatDialog,
    private authenticationService:AuthenticationService
    
    ) {
      this.authenticationService.user.subscribe(user => this.user = user);
      if (Object.keys(this.authenticationService.userValue).length == 0) {
          this.authenticationService.login("guest@petshop.com","").pipe(first()).subscribe();
      }
}
// Method to open login dialog
onOpenLoginDialog(): void {
  const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '450px',
      data: { name: '' } 
    });

}

isAdmin(): boolean{
  console.log(this.user);
  return this.user && this.user.role == Role.Admin;
}
logout() {
  this.authenticationService.logout();
}
}