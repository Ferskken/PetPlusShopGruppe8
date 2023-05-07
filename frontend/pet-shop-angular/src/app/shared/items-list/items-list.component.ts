import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { ItemsService, ItemAttributes } from 'src/app/services/items.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnChanges {
  @Input() categories: string = "";
  items: ItemAttributes[] = [];

  constructor(private itemsService: ItemsService) { }

  ngOnChanges(changes: SimpleChanges) {
    // log the changes to the console
    console.log(changes);

    // if the 'categories' input property has changed
    if ('categories' in changes) {
      // call the service to get the items for the new category
      this.itemsService.getItems(changes['categories'].currentValue).subscribe((data) => {
        // update the items array with the new items
        this.items = data as ItemAttributes[];
      });
    }
  }
}

