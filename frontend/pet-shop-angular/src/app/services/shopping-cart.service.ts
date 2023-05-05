import { Injectable } from '@angular/core';

export interface CartItem {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor() { }

  addItemToCart(item: CartItem) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const existingItem = cartItems.find((i: CartItem) => i.id === item.id);
  
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      cartItems.push(item);
    }
  
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }
  
  removeItemFromCart(itemId: number) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const updatedCartItems = cartItems.filter((i: CartItem) => i.id !== itemId);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  }
  
  updateItemQuantity(itemId: number, quantity: number) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const updatedCartItems = cartItems.map((i: CartItem) => {
      if (i.id === itemId) {
        i.quantity = quantity;
      }
      return i;
    });
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  }
  
  getCartItems():CartItem[] {
    return JSON.parse(localStorage.getItem('cartItems') || '[]');

  }
  
  calculateCartTotal() {
    const cartItems = this.getCartItems();
    let total = 0;
  
    for (let item of cartItems) {
      total += item.price * item.quantity;
    }
  
    return total;
  }
  
}
