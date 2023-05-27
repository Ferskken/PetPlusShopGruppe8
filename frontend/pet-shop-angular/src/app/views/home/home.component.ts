import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/autentication.service';
/* den liker ikke denne linja, men det er dette som gjør at det funker, den vil at jeg skal skrive import { AuthenticationService } from 'src/app/services/autentication.service'; men det funker ikke */

import { AboutUsComponent } from '../about-us/about-us.component';
import { ItemAttributes, ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  activeIndex: number = 0;
  activeIndex2:number = 0;
  intervalId: any;
  intervalId2:any;
  items: ItemAttributes[]=[]
  images = [
    { src: 'assets/somePictures/dog-collar.png', alt: 'epic collar', active: false, price: 10.99 },
    { src: 'assets/somePictures/kanis-hus.png', alt: 'Image 2', active: false, price: 15.99 },
    { src: 'assets/somePictures/dog-collar.png', alt: 'Image 3', active: false, price: 12.99 },
    { src: 'assets/somePictures/kanis-hus.png', alt: 'Image 5', active: true, price: 9.99 },
    { src: 'assets/somePictures/skildpadde-med-hatt.png', alt: 'nice hat', active: true, price: 8.99 },
    { src: 'assets/somePictures/kanis-hus.png', alt: 'dream house', active: true, price: 10.99 }
  ];

  images2: any[] = [
    {
      image: 'assets/somePictures/skildpadde-med-hatt.png',
      name: 'Image 1',
      active: false,
      price: 10
    },
    {
      image: 'assets/somePictures/kanis-hus.png',
      name: 'Image 2',
      active: true,
      price: 15
    },
    {
      image: 'assets/somePictures/dog-collar.png',
      name: 'Image gay',
      active: false,
      price: 15
    }
  ];
  

  constructor(private itemsService: ItemsService) {}

  ngOnInit() {
    this.fetchItems();
    this.startImageSwitching();
    this.startImageSwitching2();
  }

  ngOnDestroy() {
    this.stopImageSwitching();
    this.stopImageSwitching2();
  }

  fetchItems() {
    this.itemsService.getItems("all").subscribe(
      (items: any) => {
        this.images2 = this.images2.concat(items);
      },
      (error) => {
        console.error('Error fetching items:', error);
      }
    );
  }
  

  startImageSwitching() {
    this.activeIndex = 0; // Set the initial active index to 0
    this.intervalId = setInterval(() => {
      this.switchToNextImage();
    }, 4000);
  }

  stopImageSwitching() {
    clearInterval(this.intervalId);
  }

  switchToNextImage() {
    const totalImages = this.images.length;
    this.images[this.activeIndex].active = false;
    this.activeIndex = (this.activeIndex + 1) % totalImages;
    this.images[this.activeIndex].active = true;
  }

  switchToPreviousImage() {
    const totalImages = this.images.length;
    this.images[this.activeIndex].active = false;
    this.activeIndex = (this.activeIndex - 1 + totalImages) % totalImages;
    this.images[this.activeIndex].active = true;
  }
  startImageSwitching2() {
    this.activeIndex2 = 0; // Set the initial active index to 0
    this.intervalId2 = setInterval(() => {
      this.switchToNextImage2();
    }, 6000);
  }

  stopImageSwitching2() {
    clearInterval(this.intervalId2);
  }
  switchToNextImage2() {
    const totalImages2 = this.images2.length;
    this.images2.forEach((image) => {
      image.active = false;
    });
    this.activeIndex2 = (this.activeIndex2 + 1) % totalImages2;
    this.images2[this.activeIndex2].active = true;
  }

  switchToPreviousImage2() {
    const totalImages2 = this.images2.length;
    this.images2.forEach((image) => {
      image.active = false;
    });
    this.activeIndex2 = (this.activeIndex2 - 1 + totalImages2) % totalImages2;
    this.images2[this.activeIndex2].active = true;
  }
}
