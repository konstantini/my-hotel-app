import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Room } from '../room';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RoomTypeService } from '../../room-types/room-type.service';
import { RoomType } from '../../room-types/room-type';

@Component({
  selector: 'app-room-dialog',
  templateUrl: './room-dialog.component.html',
  styleUrls: ['./room-dialog.component.css']
})
export class RoomDialogComponent {

  form: FormGroup;

  roomTypes: RoomType[];

  constructor(
    private fb: FormBuilder,
    private roomTypeService: RoomTypeService,
    public dialogRef: MatDialogRef<RoomDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Room) {

      this.roomTypeService.get().subscribe(rts => this.roomTypes = rts);

      this.form = this.fb.group({
        number: [data ? data.number : 0, Validators.required],
        type: [data ? data.type : undefined, Validators.required]
      });

    }

  close(): void {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  compare(val1, val2) {
    return val1.id === val2.id;
  }

}
