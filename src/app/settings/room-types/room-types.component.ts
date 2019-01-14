import { Component, OnInit, ViewChild, ElementRef, AfterViewInit  } from '@angular/core';
import { MatSort } from '@angular/material';

import { RoomType } from './room-type';
import { RoomTypeService } from './room-type.service';
import { RoomTypesDataSource } from './room-types.dataSource';

@Component({
  selector: 'app-settings-room-types',
  templateUrl: './room-types.component.html',
  styleUrls: ['./room-types.component.css']
})
export class RoomTypesComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['type', 'capacity', 'description', 'operations'];

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild('description') input: ElementRef;
  dataSource: RoomTypesDataSource;

  constructor(private roomTypeService: RoomTypeService) {}

  ngOnInit() {
    this.dataSource = new RoomTypesDataSource(this.roomTypeService, this.sort);
    console.log(this.dataSource);
    // this.dataSource.load();
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe();
  }

  edit(row: RoomType) {
    if (row.isForEdit) {
      row.isForEdit = !row.isForEdit;
      row.description = this.input.nativeElement.value;
      this.dataSource.update(row);
    } else {
      row.isForEdit = !row.isForEdit;
    }
  }

}
