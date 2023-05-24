import { Component ,OnInit} from '@angular/core';
import { MatDialog, MatDialogConfig,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {AddItemDialogComponent} from './add-item-dialog/add-item-dialog.component';
import { ItemsService,ItemAttributes} from 'src/app/services/items.service';


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent {
  categories: string = "all"
  constructor(
    public dialog: MatDialog,
    private itemsService:ItemsService
    ) {
    // Do nothing
  
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
        this.itemsService.saveItem(result).subscribe((res)=>{
          console.log(res);
        },(err)=>{
          console.log(err)
        })
      }
    });
  }
}
