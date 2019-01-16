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

      this.roomTypeService.getRoomTypes().subscribe(rts => this.roomTypes = rts);

      this.form = this.fb.group({
        number: [data.number, Validators.required],
        type: [data.type, Validators.required]
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
