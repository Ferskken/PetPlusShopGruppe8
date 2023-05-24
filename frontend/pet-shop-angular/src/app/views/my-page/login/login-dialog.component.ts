

import { Component,} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthenticationService} from 'src/app/services/autentication.service';
import { first } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { WrongPasswordDialogComponent } from '../wrong-password-dialog/wrong-password-dialog.component';


interface LoginResponse {
  token: string;
}

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent {
  form  : FormGroup
  email = '';
  password = '';

  constructor(
    private authenticationService: AuthenticationService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    private http: HttpClient,
    public dialog: MatDialog
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

   }

   onSubmit() {
    this.authenticationService.login(this.form.value.email, this.form.value.password).pipe(first()).subscribe({ 
        next:  (result:any)=> {
          this.dialogRef.close();
         },
        error : (err) =>{
          this.dialog.open(WrongPasswordDialogComponent);
          this.authenticationService.logout();
        } 
    });
   } 

  onCancel() {
    this.authenticationService.logout();
  }
  }
