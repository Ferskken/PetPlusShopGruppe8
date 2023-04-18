import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatTabsModule} from '@angular/material/tabs'
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdministratorComponent } from './views/administrator/administrator.component';
import { DogsComponent } from './views/dogs/dogs.component';
import { CatsComponent } from './views/cats/cats.component';
import { BirdsComponent } from './views/birds/birds.component';
import { ItemsComponent } from './views/administrator/items/items.component';
import { UsersComponent } from './views/administrator/users/users.component';
import { OrdersComponent } from './views/administrator/orders/orders.component';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule} from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button'; 
import { MatDialogModule} from '@angular/material/dialog';
import { MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { AddItemDialogComponent } from './views/administrator/items/add-item-dialog/add-item-dialog.component';
import { ItemsListComponent } from './shared/items-list/items-list.component';
import { SubCategoriesComponent } from './shared/sub-categories/sub-categories.component';
import { MatMenuModule} from '@angular/material/menu';
import { BecomeMemberComponent } from './views/my-page/become-member/become-member.component';
import { LoginDialogComponent } from './views/my-page/login/login-dialog.component'

@NgModule({
  declarations: [ 
    AppComponent,
    HeaderComponent,
    AdministratorComponent,
    DogsComponent,
    CatsComponent,
    BirdsComponent,
    ItemsComponent,
    UsersComponent,
    OrdersComponent,
    AddItemDialogComponent,
    ItemsListComponent,
    SubCategoriesComponent,
    BecomeMemberComponent,
    LoginDialogComponent
  ],
  imports: [ 
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTabsModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatMenuModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }