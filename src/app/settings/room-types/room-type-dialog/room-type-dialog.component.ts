import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RoomType } from '../room-type';

@Component({
  selector: 'app-room-type-dialog',
  templateUrl: './room-type-dialog.component.html',
  styleUrls: ['./room-type-dialog.component.css']
})
export class RoomTypeDialogComponent {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RoomTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RoomType) {


      this.form = this.fb.group({
        type: [data ? data.type : '', Validators.required],
        capacity: [data ? data.capacity : 0, Validators.required],
        description: [data ? data.description : ''],
      });

    }

  close(): void {
    this.dialogRef.close();
  }

  save() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

}
