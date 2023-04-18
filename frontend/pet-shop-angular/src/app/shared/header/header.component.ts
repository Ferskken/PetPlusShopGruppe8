import { Component } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { LoginDialogComponent } from 'src/app/views/my-page/login/login-dialog.component';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(
    public dialog: MatDialog,
    ) {
    // Do nothing
}
// Method to open login dialog
onOpenLoginDialog(): void {
  const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '450px',
      data: { name: 'Trond' } 
    });

}
}