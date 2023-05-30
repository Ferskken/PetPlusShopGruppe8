import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';

import { User } from '../models/user'
import { Role } from '../models/role';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
   // private userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
    private userSubject = new BehaviorSubject<User>({} as User);

    public user: Observable<User> = new Observable();;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
      let user =   localStorage.getItem('user');
      if (user) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(user));
        this.user = this.userSubject.asObservable();
        
      }
    }

    public get userValue(): User {
        return this.userSubject.value;
    }
    
    login(username: string, password: string) {
      return this.http.post<any>("/petapi/user/authenticate", { username, password })
          .pipe(map((res:{token:string,status:string}) => {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              let decodedUser :  { name: string, role: string } = jwt_decode(res.token);
              let user : User = {
                  name : decodedUser.name,
                  role :decodedUser.role as Role,
                  token:res.token
              }
              localStorage.setItem('user',JSON.stringify(user));
             this.userSubject.next(user);
             location.reload();
             return user;
          }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    this.userSubject.next({} as User);
  
    // Switch to the home route
    this.router.navigate(['/home']).then(() => {
      location.reload();
      });
  }
  
}   