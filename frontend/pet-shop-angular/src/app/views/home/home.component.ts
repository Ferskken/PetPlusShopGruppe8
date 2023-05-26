import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AboutUsComponent } from '../about-us/about-us.component';
import { ItemAttributes, ItemsService } from 'src/app/services/items.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  activeIndex: number = 0;
  intervalId: any;

  images = [
    { src: 'assets/somePictures/dog-collar.png', alt: 'epic collar', active: true, price: 10.99 },
    { src: 'assets/somePictures/kanis-hus.png', alt: 'Image 2', active: true, price: 15.99 },
    { src: 'assets/somePictures/dog-collar.png', alt: 'Image 3', active: true, price: 12.99 },
    { src: 'assets/somePictures/kanis-hus.png', alt: 'Image 5', active: true, price: 9.99 },
    { src: 'assets/somePictures/skildpadde-med-hatt.png', alt: 'nice hat', active: true, price: 8.99 },
    { src: 'assets/somePictures/kanis-hus.png', alt: 'dream house', active: true, price: 10.99 }
  ];

  images2: { src: string; alt: string; active: boolean; price: number }[] = [
    {
      src: 'assets/somePictures/skildpadde-med-hatt.png',
      alt: 'Image 1',
      active: false,
      price: 10
    },
    {
      src: 'assets/somePictures/kanis-hus.png',
      alt: 'Image 2',
      active: false,
      price: 15
    },
    {
      src: 'assets/somePictures/kanis-hus.png',
      alt: 'Image 3',
      active: true,
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
    this.itemsService.getItems2().subscribe(
      (items: ItemAttributes[]) => {
        this.images2 = items.map((item: ItemAttributes) => ({
          src: item.image || 'default-image-url', // Replace 'default-image-url' with a default image URL if necessary
          alt: item.name,
          active: false, // Set the 'active' property as per your requirement
          price: item.price
        }));
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
    }, 5000);
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
    this.activeIndex = 0; // Set the initial active index to 0
    this.intervalId = setInterval(() => {
      this.switchToNextImage2();
    }, 5000);
  }

  stopImageSwitching2() {
    clearInterval(this.intervalId);
  }

  switchToNextImage2() {
    const totalImages = this.images2.length;
    this.images2.forEach((image) => {
      image.active = false;
    });
    this.activeIndex = (this.activeIndex + 1) % totalImages;
    this.images2[this.activeIndex].active = true;
  }

  switchToPreviousImage2() {
    const totalImages = this.images2.length;
    this.images2.forEach((image) => {
      image.active = false;
    });
    this.activeIndex = (this.activeIndex - 1 + totalImages) % totalImages;
    this.images2[this.activeIndex].active = true;
  }
}
