import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.scss']
})
export class CheckoutFormComponent implements OnInit {
  checkoutForm!: FormGroup;

  constructor(private fb: FormBuilder, private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.checkoutForm = this.fb.group({
      shipping: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        address: ['', Validators.required],
        address2: [''],
        zipCode: ['', [Validators.required, Validators.pattern(/^[0-9]{4}$/)]],
        city: ['', Validators.required],
        phone: ['', [Validators.required, Validators.pattern(/^(4\d|5\d|9\d)\s?\d{2}\s?\d{3}$/)]]
      }),
      
    });
  }

  onSubmit(): void {
    let checkOutData = {
      cartItems:this.shoppingCartService.getCartItems().map((item)=>{return{id:item.id,quantity:item.quantity}}),
      checkoutForm:this.checkoutForm.value
    }
    console.log(checkOutData);
    
  }

  get shippingForm(): FormGroup {
    return this.checkoutForm.get('shipping') as FormGroup;
  }

  get billingForm(): FormGroup {
    return this.checkoutForm.get('billing') as FormGroup;
  }
  
}

