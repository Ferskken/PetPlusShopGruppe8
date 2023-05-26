import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/autentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent {
  images = [
    { src: 'assets/somePictures/dog-collar.png', alt: 'Image 1', active: true, price: 10.99 },
    { src: 'assets/somePictures/kanis-hus.png', alt: 'Image 2', active: true, price: 15.99 },
    { src: 'assets/somePictures/dog-collar.png', alt: 'Image 3', active: false, price: 12.99 },
    { src: 'assets/somePictures/skildpadde-med-hatt.png', alt: 'Image 4', active: false, price: 8.99 },
    { src: 'assets/somePictures/kanis-hus.png', alt: 'Image 5', active: false, price: 9.99 }
  ];
  

  activeIndex = 0;

  showNextImage() {
    this.activeIndex = (this.activeIndex + 1) % this.images.length;
  }

  ngOnInit() {
    setInterval(() => {
      this.showNextImage();
    }, 3000);
  }
}