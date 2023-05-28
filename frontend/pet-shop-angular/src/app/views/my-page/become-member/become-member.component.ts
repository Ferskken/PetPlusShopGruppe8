import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { UserAttributes, UsersService} from 'src/app/services/users.service';


@Component({
  selector: 'app-become-member',
  templateUrl: './become-member.component.html',
  styleUrls: ['./become-member.component.scss']
})
export class BecomeMemberComponent {

  form: FormGroup;
  formData = {
    name: '',
    email: '',
    password: ''
  };
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private usersService: UsersService,
    private _formBuilder: FormBuilder,
    private http: HttpClient,
    breakpointObserver: BreakpointObserver
  ) {
    this.form = this._formBuilder.group({
     
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
     
    });
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

  saveData() {

    let userData:UserAttributes = {
      name: this.form.value.name,
      email:this.form.value.email,
     password: this.form.value.password,
    };

    
     this.usersService.createUser(userData).pipe(first()).subscribe((res) =>{
     })
    
    }
 

  stepperOrientation: Observable<StepperOrientation>;
}
