
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartItem } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
  
})
export class CartItemComponent implements OnInit {
  @Input() item: CartItem = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    quantity: 0,
    image: ''
  } //new CartItem();
  @Output() remove = new EventEmitter<number>();
  @Output() updateQuantity = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  removeItem(): void {
    this.remove.emit(this.item.id);
  }

  onQuantityChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const quantity = parseInt(input.value, 10);
    this.updateQuantity.emit(quantity);
  }
  
}