import { Component } from '@angular/core';

@Component({
  selector: 'app-cats',
  templateUrl: './cats.component.html',
  styleUrls: ['./cats.component.scss']
})
export class CatsComponent {
  mainCategories:string = "cat" 
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
