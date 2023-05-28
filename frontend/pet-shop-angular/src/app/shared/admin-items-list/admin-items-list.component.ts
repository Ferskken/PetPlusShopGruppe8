import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { ItemsService, ItemAttributes } from 'src/app/services/items.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-admin-items-list',
  templateUrl: './admin-items-list.component.html',
  styleUrls: ['./admin-items-list.component.scss']
})
export class AdminItemsListComponent implements OnChanges{

  @Input() categories: string = "";
  items: ItemAttributes[] = [];

  constructor(private itemsService: ItemsService, private shoppingCartService: ShoppingCartService) { }
  
  ngOnChanges(changes: SimpleChanges) {
    // log the changes to the console

    // if the 'categories' input property has changed
    if ('categories' in changes) {
      // call the service to get the items for the new category
      this.itemsService.getItems(changes['categories'].currentValue).subscribe((data) => {
        // update the items array with the new items
        this.items = data as ItemAttributes[];
      });
    }
  }
  onDeleteItem(id: number): void {
    // Display a confirmation dialog
    if (window.confirm('Are you sure you want to delete this item?')) {
      // If the user clicked "OK", delete the item
      // Call the deleteItem method of the ItemsService to delete the item from the backend API
      this.itemsService.deleteItem(id).subscribe(
        (res) => {
          // Handle successful deletion
          // Remove the deleted item from the items array
          this.items = this.items.filter(item => item.id !== id);
        },
        (err) => {
          // Handle error
          console.error(err);
        }
      );
    }
  }
  
}
