import { Component, OnInit } from '@angular/core';
import { ItemAttributes } from 'src/app/services/items.service';
import { ItemsService } from 'src/app/services/items.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
 selector: 'app-search-page',
 templateUrl: './search-page.component.html',
 styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

 items: ItemAttributes[] = [];

 constructor(private itemsService: ItemsService, private shoppingCartService: ShoppingCartService) {}

 ngOnInit(): void {
 // Subscribe to changes in the search results
 this.itemsService.items$.subscribe(items => {
 this.items = items;
 });
 }

 addToShoppingCart(item: ItemAttributes) {
  console.log(item)
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
