import { Injectable } from '@angular/core';
import { Service } from './service';
import { Room } from './room';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoomsService extends Service<Room> {

  // private url = 'https://cryptic-bayou-86593.herokuapp.com/api/rooms';

  private url = 'http://localhost:5000/api/rooms';

  constructor(private http: HttpClient) {
    super();
  }

  public get(): Observable<Room[]> {
    return this.http.get<Room[]>(this.url)
      .pipe(catchError(super.handleError('getRooms', [])));
  }

  public update(item: Room): Observable<any> {
    console.log('Will update ' + item.id, item);
    return this.http.put(this.url + '/' + item.id, item, this.httpOptions)
      .pipe(
        catchError(this.handleError('updateRoom'))
      );
  }

  public delete(item: Room): Observable<any> {
    return this.http.delete(this.url + '/' + item.id, this.httpOptions)
      .pipe(
        catchError(this.handleError('deleteRoom'))
      );
  }

}
