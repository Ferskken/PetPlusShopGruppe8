import { Component, OnInit } from '@angular/core';
import { ItemAttributes } from 'src/app/services/items.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
 selector: 'app-view-item',
 templateUrl: './view-item.component.html',
 styleUrls: ['./view-item.component.scss']
})
export class ViewItemComponent implements OnInit {

 item!: ItemAttributes;

 constructor(
    private router: Router,
    private shoppingCartService: ShoppingCartService

 ) {}

 ngOnInit(): void {
    this.item = history.state.item;
 }
 addToShoppingCart(item: ItemAttributes) {
    let cartItem = {
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      quantity: 1,
      image: item.image,
    };
    this.shoppingCartService.addItemToCart(cartItem);
  }
  goToShoppingCart() {
    this.router.navigate(['/shoppingCart']);
  }

}
