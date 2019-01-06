import { Component, OnInit } from '@angular/core';
import { RoomType } from './room-type';
import { ROOM_TYPES } from './room-types-mock';

@Component({
  selector: 'app-settings-room-types',
  templateUrl: './room-types.component.html',
  styleUrls: ['./room-types.component.css']
})
export class RoomTypesComponent implements OnInit {

  roomTypes: RoomType[] = ROOM_TYPES;

  constructor() {}

  ngOnInit() {}

}
