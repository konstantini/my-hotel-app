import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

import { RoomType } from './room-type';
import { RoomTypeService } from './room-type.service';

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

  roomTypes: RoomType[];

  constructor(private roomTypeService: RoomTypeService) {}

  ngOnInit() {
    this.getRoomTypes();
    this.dataSource = new MatTableDataSource<RoomType>(this.roomTypes);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getRoomTypes(): void {
    this.roomTypeService.getRoomTypes().subscribe(roomTypes => this.roomTypes = roomTypes);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  edit(row: RoomType) {
    if (row.isForEdit) {
      // send update
    }
    row.isForEdit = !row.isForEdit;
  }

}
