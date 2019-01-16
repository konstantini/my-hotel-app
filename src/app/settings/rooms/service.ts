import { Observable, of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

export abstract class Service<T> {

  protected httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  abstract get(): Observable<T[]>;
  abstract update(item: T): Observable<any>;
  abstract delete(item: T): Observable<any>;

  handleError<K> (operation = 'operation', result?: K) {
    return (error: any): Observable<K> => {
      console.error(operation, error);
      return of(result as K);
    };
  }

}
