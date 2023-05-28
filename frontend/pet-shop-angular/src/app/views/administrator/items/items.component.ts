import { Component ,OnInit, OnChanges, Input, SimpleChanges} from '@angular/core';
import { MatDialog, MatDialogConfig,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {AddItemDialogComponent} from './add-item-dialog/add-item-dialog.component';
import { ItemsService,ItemAttributes} from 'src/app/services/items.service';
import { first } from 'rxjs/operators';



@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent {
  items: ItemAttributes[] = [];
  categories: string = "all"
  constructor(
    public dialog: MatDialog,
    private itemsService:ItemsService
    ) {
    // Do nothing
  
}

ngOnChanges(changes: SimpleChanges) {

  // if the 'categories' input property has changed
  if ('categories' in changes) {
    // call the service to get the items for the new category
    this.itemsService.getItems(changes['categories'].currentValue).pipe(first()).subscribe((data) => {
      // update the items array with the new items
      this.items = data as ItemAttributes[];
    });
  }
}
onOpenAddItemDialog(): void {
  const dialogConfig = new MatDialogConfig<ItemAttributes>();
  dialogConfig.width = '450px';
  
  const dialogRef = this.dialog.open(AddItemDialogComponent, {
      width: '450px',
      data: { name: 'name' } 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.itemsService.saveItem(result).pipe(first()).subscribe((res)=>{
        },(err)=>{
          console.error(err)
        })
      }
    });
  }
  onDeleteItem(id: number): void {
    // Call the deleteItem method of the ItemsService to delete the item from the backend API
    this.itemsService.deleteItem(id).pipe(first()).subscribe(
      (res) => {
        // Handle successful deletion
      },
      (err) => {
        // Handle error
        console.error(err);
      }
    );
  }
  
}
