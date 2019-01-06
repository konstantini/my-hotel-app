import { Component, OnInit } from '@angular/core';
import { ROOM_TYPES } from './room-types/room-types-mock';
import { RoomType } from './room-types/room-type';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  public setting = 'rooms';

  roomTypes: RoomType[] = ROOM_TYPES;

  constructor() { }

  ngOnInit() {
  }

  setSetting(setting: string) {
    this.setting = setting;
  }

}
