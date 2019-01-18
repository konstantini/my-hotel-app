import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { RoomsService } from './rooms.service';
import { RoomsDataSource } from './rooms.datasource';
import { MatSort, MatDialog, MatDialogConfig } from '@angular/material';
import { Room } from './room';
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

  constructor(private roomsService: RoomsService, public dialog: MatDialog) { }

  ngOnInit() {
    this.dataSource = new RoomsDataSource(this.roomsService, this.sort);
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  add() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '250px';

    const dialogRef = this.dialog.open(RoomDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.dataSource.insert(result);
      }
    });
  }

  edit(row: Room) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = row;
    dialogConfig.width = '250px';

    const dialogRef = this.dialog.open(RoomDialogComponent, dialogConfig);

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
