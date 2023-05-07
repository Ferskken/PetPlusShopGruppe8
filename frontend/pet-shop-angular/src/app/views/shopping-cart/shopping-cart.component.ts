import { Component, OnInit } from '@angular/core';
import { ShoppingCartService, CartItem } from 'src/app/services/shopping-cart.service';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  cartItems: CartItem[] = [];
  cartTotal: number = 0;

  constructor(private cartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.cartTotal = this.cartService.calculateCartTotal();
  }

  removeItem(id: number): void {
    this.cartService.removeItemFromCart(id);
    this.cartItems = this.cartService.getCartItems();
    this.cartTotal = this.cartService.calculateCartTotal();
  }

  updateQuantity(id: number, quantity: number): void {
    this.cartService.updateItemQuantity(id, quantity);
    this.cartItems = this.cartService.getCartItems();
    this.cartTotal = this.cartService.calculateCartTotal();
  }
}