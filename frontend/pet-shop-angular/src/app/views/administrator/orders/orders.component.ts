import { Component } from '@angular/core';
import { OrdersService, OrderAttributes, CartItem } from 'src/app/services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {
  orders: OrderAttributes[] = [];
  isLoading = true;

  constructor(private ordersService: OrdersService) { }

  ngOnInit() {
    this.getAllOrders();
  }

  getAllOrders() {
    this.ordersService.getAllOrders().subscribe(
      (response: OrderAttributes[]) => {
        console.log('Fetched orders:', response);
        this.orders = response.map(order => ({
          ...order,
          cartItems: typeof order.cartItems === 'string' ? JSON.parse(order.cartItems) : order.cartItems,
        }));
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
    return cartItems.map(item => item.name ? `${item.name} (x${item.quantity})` : `(Item.ID: ${item.id} (Quantity x${item.quantity}))`).join(', ');
  }
  
}
