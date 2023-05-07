import { Component ,Output,EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrls: ['./sub-categories.component.scss']
})
export class SubCategoriesComponent {
  form: FormGroup;
  @Output() subCategories = new EventEmitter<string>();

  constructor(private fb: FormBuilder) {
    // Create the form with 4 checkboxes
    this.form = this.fb.group({
      winter: [''],
      clothes: [''],
      accessories: [''],
      indoors: ['']
    });
    // Subscribe to the value changes of the form
    this.form.valueChanges.subscribe((value) => {
      let subCat : string[] = [];
      // Check which checkboxes are checked and push their values to an array
      for (let key in value) {
        if (value[key] === true) {
          subCat.push(key);
        }
      }
      // Join the array of subcategories into a string with commas
      let tmp = subCat.join(',');
      // Emit the string of subcategories to the parent component
      this.subCategories.emit(tmp);
    });
  }
}
