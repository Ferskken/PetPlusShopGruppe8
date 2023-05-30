import { Component, OnInit } from '@angular/core';
import { OrdersService, OrderAttributes, CartItem } from 'src/app/services/orders.service';


@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {
  orders: OrderAttributes[] = [];
  isLoading = true;
  email: string = ''; // Set the email value for fetching orders

  constructor(private ordersService: OrdersService) {}

  ngOnInit() {
    this.getOrdersByEmail();
  }

  getOrdersByEmail() {
    this.ordersService.getOrdersByEmail(this.email).subscribe(
      (response: OrderAttributes[]) => {
        console.log('Fetched orders:', response);
        this.orders = response;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching orders:', error);
        this.isLoading = false;
      }
    );
  }
  getCartItemsAsString(cartItems: CartItem[] | undefined): string {
    if (!cartItems) {
      return '';
    }
    return cartItems.map(item => {
      if (item.name && item.quantity) {
        return `${item.name} (x${item.quantity})`;
      } else {
        return `(Item.ID: ${item.id} (Quantity x${item.quantity}))`;
      }
    }).join(', ');
  }
  
}

