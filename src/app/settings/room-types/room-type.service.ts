import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { RoomType } from './room-type';
import { ROOM_TYPES } from './room-types-mock';

@Injectable({
  providedIn: 'root'
})
export class RoomTypeService {

  constructor() { }

  getRoomTypes(): Observable<RoomType[]> {
    return of(ROOM_TYPES);
  }
}
