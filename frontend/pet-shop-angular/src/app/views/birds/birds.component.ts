import { Component } from '@angular/core';

// Declare and set metadata for a new component named 'BirdsComponent'
@Component({
  selector: 'app-birds',
  templateUrl: './birds.component.html',
  styleUrls: ['./birds.component.scss']
})
export class BirdsComponent {

  // Declare a property named 'mainCategories' and set its value to 'bird'
  mainCategories: string = 'bird';

  // Declare a property named 'categories' and set its value to the value of 'mainCategories'
  categories: string = this.mainCategories;

  // Define a function named 'onsubCategories' that takes a parameter 'subCategories' of type string
  onsubCategories(subCategories: string) {//

    // If 'subCategories' is an empty string, set 'categories' to the value of 'mainCategories'
    if (subCategories === '') {
      this.categories = this.mainCategories;
    }
    // Otherwise, set 'categories' to a string that concatenates 'mainCategories' and 'subCategories' with a comma separator
    else {
      this.categories = `${this.mainCategories},${subCategories}`;
    }
  }
}
