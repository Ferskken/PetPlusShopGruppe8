import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { first } from 'rxjs/operators';
import { ItemsService, ItemAttributes } from 'src/app/services/items.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';


@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnChanges {

  @Input() categories: string = "";
  items: ItemAttributes[] = [];

  constructor(private itemsService: ItemsService, private shoppingCartService: ShoppingCartService) { }

  ngOnChanges(changes: SimpleChanges) {

    // if the 'categories' input property has changed
    if ('categories' in changes) {
      // call the service to get the items for the new category
      this.itemsService.getItems(changes['categories'].currentValue).pipe(first()).subscribe((data) => {
        // update the items array with the new items
        this.items = data as ItemAttributes[];
      });
    }
  }
  addToShoppingCart(item: ItemAttributes) {
    let cartItem = {
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      quantity:1,
      image: item.image,
    }
    this.shoppingCartService.addItemToCart(cartItem)
}
}
