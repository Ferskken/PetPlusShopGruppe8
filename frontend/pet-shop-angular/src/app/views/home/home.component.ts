import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/autentication.service';
/* den liker ikke denne linja, men det er dette som gjør at det funker, den vil at jeg skal skrive import { AuthenticationService } from 'src/app/services/autentication.service'; men det funker ikke */

import { AboutUsComponent } from '../about-us/about-us.component';
import { ItemAttributes, ItemsService } from 'src/app/services/items.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  activeIndex2:number = 0;
  intervalId2:any;
  items: ItemAttributes[]=[]

  
  images2: any[] = [ {    }
  ];
  

  constructor(private itemsService: ItemsService) {}

  ngOnInit() {
    this.fetchItems();
  
    this.startImageSwitching2();
  }

  ngOnDestroy() {
    
    this.stopImageSwitching2();
  }

  fetchItems() {
    this.itemsService.getItems("all").pipe(first()).subscribe(
      (items: any) => {
        this.images2 = this.images2.concat(items);
      },
      (error) => {
        console.error('Error fetching items:', error);
      }
    );
  }
 
  /* logic for slideshow*/ 
  startImageSwitching2() {
    this.activeIndex2 = 0; // Set the initial active index to 0
    this.intervalId2 = setInterval(() => {
      this.switchToNextImage2();
    }, 3000);
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
