import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/autentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private authenticationService: AuthenticationService) {
    console.log(this.authenticationService.userValue);
    if (Object.keys(this.authenticationService.userValue).length == 0) {
      this.authenticationService.login("guest@petshop.com", "").pipe(first()).subscribe();
    }
  }

  images = [
    { src: 'assets/somePictures/dog-collar.png', alt: 'Image 1', active: true },
    { src: 'assets/somePictures/kanis-hus.png', alt: 'Image 2', active: true },
    { src: 'assets/somePictures/dog-collar.png', alt: 'Image 3', active: false },
    { src: 'assets/somePictures/skildpadde-med-hatt.png', alt: 'Image 4', active: false },
    { src: 'assets/somePictures/kanis-hus.png', alt: 'Image 5', active: false }
  ];

  showNextImage() {
    const currentIndex = this.images.findIndex(image => image.active);
    this.images[currentIndex].active = false;
    const nextIndex = (currentIndex + 1) % this.images.length;
    this.images[nextIndex].active = true;
  }

  ngOnInit() {
    setInterval(() => {
      this.showNextImage();
    }, 3000);
  }
}
