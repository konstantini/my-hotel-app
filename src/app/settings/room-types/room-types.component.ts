import { Component, OnInit } from '@angular/core';
import { ROOM_TYPES } from './room-types-mock';
import { PagerService } from 'src/app/common/pager.service';
import { setIsParent } from '@angular/core/src/render3/state';

@Component({
  selector: 'settings-room-types',
  templateUrl: './room-types.component.html',
  styleUrls: ['./room-types.component.css']
})
export class RoomTypesComponent implements OnInit {

  // array of all items to be paged
  private allItems: any[];

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];

  pageSize: number = 10;

  constructor(private pagerService: PagerService) { }

  ngOnInit() {
    this.allItems = ROOM_TYPES;
    this.setPage(1);
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
        return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page, this.pageSize);
    console.log(this.pager);

    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    console.log(this.pagedItems);
  }

  onModelChange(event) {
    console.log(event);
    this.pageSize = +event;
    this.setPage(1);
  }




}
