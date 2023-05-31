import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrdersService, OrderAttributes, CartItem } from 'src/app/services/orders.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { StepperOrientation } from '@angular/material/stepper';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Router } from '@angular/router';

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
    email: '',
    zipCode: 0,
    city: '',
    phone: 0,
    cartItems: [] as CartItem[]
  };

  constructor(
    private orderService: OrdersService,
    private fb: FormBuilder,
    private http: HttpClient,
    private shoppingCartService: ShoppingCartService,
    private router: Router,
  ) { 
    this.checkoutForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      email: [''],
      zipCode: ['', [Validators.required, Validators.pattern(/^[0-9]{4}$/)]],
      city: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^(4\d|5\d|9\d)\s?\d{2}\s?\d{3}$/)]]
    });
  }
  getDeliveryFee(): number {
    const total = this.checkoutForm.value.total;
    if (total > 750) {
      return 0;
    } else {
      return 10;
    }
  }
  
  onSubmit(): void {
    console.log("yeet");
    if (this.checkoutForm.valid) {
      const requestOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      
      const checkOutData = {
        cartItems: this.shoppingCartService.getCartItems().map((item) => ({
          id: item.id,
          quantity: item.quantity
        })),
        checkoutForm: this.checkoutForm.value
      };
      
      const orderData: OrderAttributes = {
        firstName: checkOutData.checkoutForm.firstName,
        lastName: checkOutData.checkoutForm.lastName,
        address: checkOutData.checkoutForm.address,
        email: checkOutData.checkoutForm.email,
        zipCode: checkOutData.checkoutForm.zipCode,
        city: checkOutData.checkoutForm.city,
        phone: checkOutData.checkoutForm.phone,
        cartItems: checkOutData.cartItems as CartItem[]
      };

      console.log(orderData);
      if (window.confirm('Press ok to finalise your order?')) {
      this.orderService.createOrder(JSON.stringify(orderData), requestOptions).subscribe((res) => {
        this.shoppingCartService.clearCart();
        this.router.navigate(['/home']);
        console.log(res);
      });
    }
  }
}
}
