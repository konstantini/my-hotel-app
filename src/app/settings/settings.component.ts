import { Component, OnInit } from '@angular/core';
import { RoomType } from './room-types/room-type';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  public setting = 'rooms';

  constructor() { }

  ngOnInit() {
  }

  setSetting(setting: string) {
    this.setting = setting;
  }

}
