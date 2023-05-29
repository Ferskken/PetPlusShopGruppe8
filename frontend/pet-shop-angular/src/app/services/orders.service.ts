import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface CartItem {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface OrderAttributes {
  cartItems?: CartItem[];
  id?: number;
  quantity?: number;
  firstName?: string;
  lastName?: string;
  address?: string;
  address2?: string;
  zipCode?: number;
  city?: string;
  phone?: number;
}

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  // Method to retrieve all orders from the backend API
  getAllOrders() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<OrderAttributes[]>('/petapi/orders', { headers });
  }

  // Method to retrieve an order by ID from the backend API
  getOrder(id: number) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<OrderAttributes>(`/petapi/orders/${id}`, { headers });
  }

  // Method to create an order in the backend API
  createOrder(order: OrderAttributes) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<OrderAttributes>('/petapi/orders', order, { headers });
  }

  // Method to update an order in the backend API
  updateOrder(id: number, order: OrderAttributes) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put<OrderAttributes>(`/petapi/orders/${id}`, order, { headers });
  }

  // Method to delete an order in the backend API
  deleteOrder(id: number) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete<number>(`/petapi/orders/${id}`, { headers });
  }
}
