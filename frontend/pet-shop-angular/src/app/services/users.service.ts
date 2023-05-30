import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface UserAttributes {
  id?: number;
  name: string;
  email: string;
  password: string;
  role:string;
}

@Injectable({
  providedIn: 'root'
})


export class UsersService {

  constructor(private http: HttpClient) { }

  // Method to retrieve items from the backend API
  // with an HTTP GET request to the /petapi/items endpoint with the categories query parameter
  getUser(id:number) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(`/petapi/user/${id}`, { headers });
  }
  getAllUsers() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(`/petapi/user/all`, { headers });
  }

  // Method to save an item to the backend API
  createUser(user: UserAttributes) {
      // Make an HTTP POST request to the /petapi/items endpoint with the item data
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post('/petapi/user', user, { headers });
  }
  saveUser(user: UserAttributes) {
    // Make an HTTP POST request to the /petapi/items endpoint with the item data
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(`/petapi/user/${user.id}`,user, { headers });
  }
  autorization(email:string, password:string){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post('/petapi/authenticate', { email:email, password:password}, { headers });

  }

}

