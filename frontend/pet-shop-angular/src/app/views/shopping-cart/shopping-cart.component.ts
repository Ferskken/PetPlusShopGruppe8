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
  deliveryFee: number = 49;

  constructor(private cartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.cartTotal = this.cartService.calculateCartTotal();
    this.calculateCartTotal();
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
  getDeliveryFee(): number {
  return this.cartTotal >= 750 ? 0 : 50;
}
  calculateCartTotal() {
    this.cartTotal = 0;
    for (let item of this.cartItems) {
      this.cartTotal += item.price * item.quantity;
    }
    this.deliveryFee = this.getDeliveryFee();
  }
}