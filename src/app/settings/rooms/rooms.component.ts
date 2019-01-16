import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, Inject } from '@angular/core';
import { RoomsService } from './rooms.service';
import { RoomsDataSource } from './rooms.datasource';
import { MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Room } from './room';
import { RoomTypeService } from '../room-types/room-type.service';
import { RoomType } from '../room-types/room-type';
import { RoomDialogComponent } from './room-dialog/room-dialog.component';

@Component({
  selector: 'app-settings-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['number', 'type', 'operations'];

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild('number') numberInput: ElementRef;
  @ViewChild('type') capacityInput: ElementRef;

  dataSource: RoomsDataSource;

  roomTypes: RoomType[];

  constructor(private roomsService: RoomsService, private rts: RoomTypeService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.dataSource = new RoomsDataSource(this.roomsService, this.sort);
    this.rts.getRoomTypes().subscribe(rt => this.roomTypes = rt);
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe();
  }

  edit(row: Room) {

    const dialogRef = this.dialog.open(RoomDialogComponent, {
      width: '250px',
      data: row
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        result.id = row.id;
        this.dataSource.update(result);
      }
    });

  }

  delete(row: Room) {
    this.dataSource.delete(row);
  }

}
