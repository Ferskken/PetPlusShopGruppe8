import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'app-wrong-password-dialog',
  templateUrl: './wrong-password-dialog.component.html',
  styleUrls: ['./wrong-password-dialog.component.scss']
})

export class WrongPasswordDialogComponent {

  constructor(public dialogRef: MatDialogRef<WrongPasswordDialogComponent>) { }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
