import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { RoomType } from './room-type';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RoomTypeService {

  private roomTypesUrl = 'api/room-types';

  constructor(private http: HttpClient) { }

  getRoomTypes(): Observable<RoomType[]> {
    return this.http.get<RoomType[]>(this.roomTypesUrl)
      .pipe(catchError(this.handleError('getRoomTypes', [])));
  }

  updateRoomType(roomType: RoomType): Observable<any> {
    return this.http.put(this.roomTypesUrl + '/' + roomType.id, roomType, httpOptions)
      .pipe(
        catchError(this.handleError('updateRoomType'))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation, error);
      return of(result as T);
    };
  }


}
