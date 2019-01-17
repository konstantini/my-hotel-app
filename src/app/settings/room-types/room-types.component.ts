import { Component, OnInit, ViewChild, ElementRef, AfterViewInit  } from '@angular/core';
import { MatSort, MatDialog, MatDialogConfig } from '@angular/material';

import { RoomType } from './room-type';
import { RoomTypeService } from './room-type.service';
import { RoomTypesDataSource } from './room-types.datasource';
import { RoomTypeDialogComponent } from './room-type-dialog/room-type-dialog.component';

@Component({
  selector: 'app-settings-room-types',
  templateUrl: './room-types.component.html',
  styleUrls: ['./room-types.component.css']
})
export class RoomTypesComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['type', 'capacity', 'description', 'operations'];

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild('type') typeInput: ElementRef;
  @ViewChild('capacity') capacityInput: ElementRef;
  @ViewChild('description') descriptionInput: ElementRef;
  dataSource: RoomTypesDataSource;

  constructor(private roomTypeService: RoomTypeService, public dialog: MatDialog) {}

  ngOnInit() {
    this.dataSource = new RoomTypesDataSource(this.roomTypeService, this.sort);
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

    const dialogRef = this.dialog.open(RoomTypeDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        console.log(result);
        this.dataSource.insert(result);
      }
    });
  }

  edit(row: RoomType) {
    const dialogRef = this.dialog.open(RoomTypeDialogComponent, {
      // width: '250px',
      data: row
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        result.id = row.id;
        this.dataSource.update(result);
      }
    });
  }

  delete(row: RoomType) {
    this.dataSource.delete(row);
  }

}
