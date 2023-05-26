import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ItemAttributes, ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit{

  name="";
  items: ItemAttributes[]=[];
  searchForm = this.fb.nonNullable.group({
    name:"",
  });

    constructor(private itemsService: ItemsService, private fb: FormBuilder){}
    
    ngOnInit(): void{
      this.fetchData();
    }

    fetchData(): void {
      this.itemsService.searchItems(this.name).subscribe((items) => {
        // update the items array with the new items
        this.items = items;
      });
    }
    onSearchSubmit():void{
      this.name = this.searchForm.value.name ?? '';
      this.fetchData();
    }

}
