import { Component, OnInit } from '@angular/core';
import { ItemAttributes } from 'src/app/services/items.service';

@Component({
 selector: 'app-view-item',
 templateUrl: './view-item.component.html',
 styleUrls: ['./view-item.component.scss']
})
export class ViewItemComponent implements OnInit {

 item!: ItemAttributes;

 constructor() {}

 ngOnInit(): void {
 this.item = history.state.item;
 }

}
