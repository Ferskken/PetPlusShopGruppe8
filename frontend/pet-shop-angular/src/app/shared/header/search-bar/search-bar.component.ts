import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ItemAttributes, ItemsService } from 'src/app/services/items.service';

@Component({
 selector: 'app-search-bar',
 templateUrl: './search-bar.component.html',
 styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit{

 name='';
 items: ItemAttributes[]=[];
 searchForm = this.fb.nonNullable.group({
 name:'',
 });

 constructor(
 private itemsService: ItemsService,
 private fb: FormBuilder,
 private router: Router
 ){}
 
 ngOnInit(): void{
 this.fetchData();
 }

 fetchData(): void {

 this.itemsService.searchItems(this.name).subscribe((items) => {
 this.items = items;
 this.itemsService.setItems(this.items);
 let navigationExtras: NavigationExtras = {
 state: {
 items: this.items
 }
 };
 this.router.navigate(['/searchPage'], navigationExtras);
 });
 }
 onSearchSubmit(): void{
 this.name = this.searchForm.value.name ?? '';
 this.fetchData();
 }

}
