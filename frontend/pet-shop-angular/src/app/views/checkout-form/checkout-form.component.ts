import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrdersService, OrderAttributes, CartItem } from 'src/app/services/orders.service';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { StepperOrientation } from '@angular/material/stepper';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.scss']
})
export class CheckoutFormComponent {
  
  checkoutForm: FormGroup;

  orderData: OrderAttributes = {
    firstName: '',
    lastName: '',
    address: '',
    address2: '',
    zipCode: 0,
    city: '',
    phone: 0,
  };

  constructor(
    private orderService: OrdersService,
    private fb: FormBuilder,
    private http: HttpClient,
    private shoppingCartService: ShoppingCartService,
  ) { 
    this.checkoutForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      address2: [''],
      zipCode: ['', [Validators.required, Validators.pattern(/^[0-9]{4}$/)]],
      city: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^(4\d|5\d|9\d)\s?\d{2}\s?\d{3}$/)]]
    });
  }

  onSubmit(): void {
  console.log("yeet");
  if (this.checkoutForm.valid) {
    const cartItems: CartItem[] = this.shoppingCartService.getCartItems();
    
    const orderData: OrderAttributes = {
      cartItems: cartItems,
      quantity: cartItems.length,
      firstName: this.checkoutForm.value.firstName,
      lastName: this.checkoutForm.value.lastName,
      address: this.checkoutForm.value.address,
      address2: this.checkoutForm.value.address2,
      zipCode: this.checkoutForm.value.zipCode,
      city: this.checkoutForm.value.city,
      phone: this.checkoutForm.value.phone
    };

    console.log(orderData);
    this.orderService.createOrder(orderData).subscribe((res) => {
      console.log(res);
    });
  }
}

  
  
  
  PlaceOrder(order: any) {
    // Implement the logic for placing the order
  }  

  sendEmail() {
    // Implement the logic for sending an email
  }

  stepperOrientation: Observable<StepperOrientation> | undefined;
}
