import { Component,ViewChild,ElementRef,Inject} from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ItemAttributes} from 'src/app/services/items.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-my-dialog',
  templateUrl: './add-item-dialog.component.html',
  styleUrls: ['./add-item-dialog.component.scss']
})

export class AddItemDialogComponent {
  
  form: FormGroup;
  catForm : FormGroup;

  
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ItemAttributes,

    ) {
      this.form = this.formBuilder.group({
        name: ['', Validators.required],
        description: ['', [Validators.required]],
        categories:"",
        price:['', Validators.required],
        image :['', Validators.required],
      });
      this.catForm = this.formBuilder.group({
        cat: false,
        dog: false,
        bird: false,
        winter: false,
        clothes: false,
        accessories: false,
        indoors: false,
      });
    }
  
   
    

  @ViewChild("fileupload") fileImport: ElementRef<HTMLElement> | undefined;

  loadImage(event:Event) {
    var input = event.target as HTMLInputElement;
    if (input && input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        var img = document.getElementById('image-preview') as HTMLImageElement
        if (img && e.target) {
          img.src = e.target.result as string;
        }
      };
      reader.readAsDataURL(input.files[0]);
    } 
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    // Add your save logic here
    var img = document.getElementById('image-preview') as HTMLImageElement
    this.form.patchValue({image : img.src});
    let trueCategories : string[]  = [];
    for (let key in this.catForm.value) {
      if (this.catForm.value[key] === true) {
        trueCategories.push(key);
      }
    }
    this.form.patchValue({categories : trueCategories.join(',')})
    this.dialogRef.close(this.form.value);
  }




  openButtonClick(event:Event):void{
    const el: HTMLElement = this.fileImport!.nativeElement;
    el.click();
  }
}
