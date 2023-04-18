import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importing the components for the different routes
import { AdministratorComponent } from "./views/administrator/administrator.component";
import { CatsComponent } from "./views/cats/cats.component";
import { DogsComponent } from "./views/dogs/dogs.component";
import { BirdsComponent } from "./views/birds/birds.component";
import { BecomeMemberComponent } from "./views/my-page/become-member/become-member.component";

const routes: Routes = [
  // Defining the routes and mapping them to their corresponding components
  { path: 'administrator', component: AdministratorComponent },
  { path: 'cats', component: CatsComponent },
  { path: 'dogs', component: DogsComponent },
  { path: 'birds', component: BirdsComponent },
  { path: 'becomeMember', component: BecomeMemberComponent },
];

@NgModule({
  // Configuring the router module with the defined routes
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
