import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { RoomType } from './room-type';
import { Service } from 'src/app/service/service';

@Injectable({
  providedIn: 'root'
})
export class RoomTypeService extends Service<RoomType> {

  constructor(http: HttpClient) {
    super(http);
  }

  endpoint(): string {
    return '/room-types';
  }

}
