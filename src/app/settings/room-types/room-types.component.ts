import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

import { RoomType } from './room-type';
import { ROOM_TYPES } from './room-types-mock';

@Component({
  selector: 'app-settings-room-types',
  templateUrl: './room-types.component.html',
  styleUrls: ['./room-types.component.css']
})
export class RoomTypesComponent implements OnInit {

  displayedColumns: string[] = ['type', 'capacity', 'description', 'operations'];

  dataSource: MatTableDataSource<RoomType>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource<RoomType>(ROOM_TYPES);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    ROOM_TYPES.forEach(element => element.isForEdit = false);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  edit(row: RoomType) {
    if(row.isForEdit) {
      // send update
    }
    row.isForEdit = !row.isForEdit;
  }

}
