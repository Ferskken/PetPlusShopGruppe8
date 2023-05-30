import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importing the components for the different routes
import { AdministratorComponent } from "./views/administrator/administrator.component";
import { CatsComponent } from "./views/cats/cats.component";
import { DogsComponent } from "./views/dogs/dogs.component";
import { BirdsComponent } from "./views/birds/birds.component";
import { BecomeMemberComponent } from "./views/my-page/become-member/become-member.component";
import { ShoppingCartComponent } from "./views/shopping-cart/shopping-cart.component";
import { CheckoutFormComponent } from "./views/checkout-form/checkout-form.component";
import { HomeComponent } from "./views/home/home.component";
import { AboutUsComponent } from "./views/about-us/about-us.component";
import { RoleGuard } from '../app/helpers/role-guard.can-activale';
import { SearchPageComponent } from "./views/search-page/search-page.component";
import { MyOrdersComponent } from "./views/my-page/my-orders/my-orders.component";
import { ViewItemComponent } from "./views/view-item/view-item.component";

const routes: Routes = [
  // Defining the routes and mapping them to their corresponding components
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { 
    path: 'administrator', 
    component: AdministratorComponent, 
    canActivate: [RoleGuard],
    data: { roles: ['Admin'] }
  },
  { path: 'cats', component: CatsComponent },
  { path: 'dogs', component: DogsComponent },
  { path: 'birds', component: BirdsComponent },
  { path: 'becomeMember', component: BecomeMemberComponent },
  { path: 'shoppingCart', component: ShoppingCartComponent },
  { path: 'checkout', component: CheckoutFormComponent },
  { path: 'aboutUs', component: AboutUsComponent },
  { path: 'searchPage', component: SearchPageComponent },
  { path: 'myOrders', component: MyOrdersComponent },
  { path: 'viewItem', component: ViewItemComponent },
];

@NgModule({
  // Configuring the router module with the defined routes
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
