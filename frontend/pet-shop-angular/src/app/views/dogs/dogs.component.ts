import { Component } from '@angular/core';

@Component({
  selector: 'app-dogs',
  templateUrl: './dogs.component.html',
  styleUrls: ['./dogs.component.scss']
})
export class DogsComponent {
  mainCategories:string = "dog" 
  categories:string = this.mainCategories;

  onsubCategories(subCategories:string) {
    if (subCategories==="") {
      this.categories = this.mainCategories;
      }
    else {
     this.categories = this.mainCategories + ',' + subCategories;
    }  
  }
}
