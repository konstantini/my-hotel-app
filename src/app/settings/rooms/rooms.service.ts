import { Injectable } from '@angular/core';
import { Service } from '../../service/service';
import { Room } from './room';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoomsService extends Service<Room> {

  constructor(http: HttpClient) {
    super(http);
  }

  endpoint(): string {
    return '/rooms';
  }

}
