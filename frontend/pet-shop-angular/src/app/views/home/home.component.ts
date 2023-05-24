import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/autentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private authenticationService:AuthenticationService ) {
  console.log(this.authenticationService.userValue);
  if (Object.keys(this.authenticationService.userValue).length == 0) {
    this.authenticationService.login("guest@petshop.com","").pipe(first()).subscribe();
}
}

}
