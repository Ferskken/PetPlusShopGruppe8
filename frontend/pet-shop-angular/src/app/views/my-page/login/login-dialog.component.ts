

import { Component,} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    private http: HttpClient
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

   }

  onSubmit() {
   /*
    this.http.post<LoginResponse>('/petapi/login', { email: this.email, password: this.password }).subscribe(
      (response) => {
        // Login successful, store the token in local storage and close the dialog
        localStorage.setItem('token', response.token);
        this.dialogRef.close();
      },
      (error) => {
        // Login failed, display an error message
        console.error(error);
        alert('Invalid email or password');
      }
    ); */
  } 
}
