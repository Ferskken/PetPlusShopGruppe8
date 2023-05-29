import { Component, OnInit } from '@angular/core';
import { ItemAttributes } from 'src/app/services/items.service';
import { ItemsService } from 'src/app/services/items.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Router, NavigationExtras } from '@angular/router';
@Component({
 selector: 'app-search-page',
 templateUrl: './search-page.component.html',
 styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

 items: ItemAttributes[] = [];

 constructor(
  private itemsService: ItemsService,
  private shoppingCartService: ShoppingCartService,
  private router: Router ) {}

 ngOnInit(): void {
    // Subscribe to changes in the search results
    this.itemsService.items$.subscribe(items => {
      this.items = items;
    });
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
  viewItem(item: ItemAttributes) {
    let navigationExtras: NavigationExtras = {
      state: {
        item: item
      }
    };
    this.router.navigate(['/viewItem'], navigationExtras);
   }
} 