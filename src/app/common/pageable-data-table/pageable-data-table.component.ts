import { Component, OnInit, Input } from '@angular/core';
import { Pager } from './pager';
import { PagerService } from './pager.service';
import { DataTableModel } from '../data-table/data-table-model';

@Component({
  selector: 'app-pageable-data-table',
  templateUrl: './pageable-data-table.component.html',
  styleUrls: ['./pageable-data-table.component.css']
})
export class PageableDataTableComponent implements OnInit {

  @Input() items: DataTableModel[];

  pager: Pager;

  pagedItems: DataTableModel[];

  pageSize = 10;

  constructor(private pagerService: PagerService) { }

  ngOnInit() {
    this.setPage(1);
  }

  setPage(page: number) {
    this.pager = this.pagerService.getPager(this.items.length, page, this.pageSize);

    if (page < 1 || page > this.pager.totalPages) {
        return;
    }

    this.pagedItems = this.items.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  onModelChange(event) {
    this.pageSize = +event;
    this.setPage(1);
  }

}
