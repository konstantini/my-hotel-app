import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { Entity } from './entity';

export abstract class Service<T extends Entity> {

  private http: HttpClient;

  protected APIEndpoint: string = environment.APIEndpoint || 'http://localhost:5000/api';

  protected httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(http: HttpClient) {
    this.http = http;
  }

  public get(): Observable<T[]> {
    return this.http.get<T[]>(this.url)
      .pipe(catchError(this.handleError('get', [])));
  }

  public insert(item: T): Observable<any> {
    return this.http.post(this.url, item, this.httpOptions)
      .pipe(
        catchError(this.handleError('insert'))
      );
  }

  public update(item: T): Observable<any> {
    return this.http.put(this.url + '/' + item.id, item, this.httpOptions)
      .pipe(
        catchError(this.handleError('update'))
      );
  }

  public delete(roomType: T): Observable<any> {
    return this.http.delete(this.url + '/' + roomType.id, this.httpOptions)
      .pipe(
        catchError(this.handleError('delete'))
      );
  }

  public abstract endpoint(): string;

  private get url() { return this.APIEndpoint + this.endpoint(); }

  protected handleError<K> (operation = 'operation', result?: K) {
    return (error: any): Observable<K> => {
      console.error(operation, error);
      return of(result as K);
    };
  }
}
