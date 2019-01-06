import { Component, OnInit, Input } from '@angular/core';
import { DataTableModel } from './data-table-model';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

  @Input() items: DataTableModel[];

  headers: string[];
  properties: string[];

  constructor() { }

  ngOnInit() {
    this.init();
  }

  private init() {
    const modelItem: DataTableModel = this.items[0];
    this.properties = Object.getOwnPropertyNames(modelItem).filter(header => header !== 'id');
    this.headers = this.properties.map(header => header.charAt(0).toUpperCase() + header.slice(1));
  }

}
