import { DataSource } from '@angular/cdk/collections';
import { _isNumberValue } from '@angular/cdk/coercion';
import { MatSort, Sort } from '@angular/material';

import { BehaviorSubject, Observable, Subscription, combineLatest, merge, of } from 'rxjs';

import { map, catchError, finalize } from 'rxjs/operators';
import { Service } from '../service/service';
import { Entity } from '../service/entity';

const MAX_SAFE_INTEGER = 9007199254740991;

export abstract class MyDataSource<T extends Entity> implements DataSource<T> {

    private readonly renderData = new BehaviorSubject<T[]>([]);

    private data: BehaviorSubject<T[]>;

    private readonly _filter = new BehaviorSubject<string>('');

    get filter(): string { return this._filter.value; }
    set filter(filter: string) { this._filter.next(filter); }

    private filteredData: T[];

    renderChangesSubscription = Subscription.EMPTY;

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    private service: Service<T>;
    private sort: MatSort;

    constructor(service: Service<T>, sort: MatSort) {
        this.service = service;
        this.sort = sort;
        this.data = new BehaviorSubject<T[]>([]);
        this.load();
        this.updateChangeSubscription();
    }

    public load(): void {
        this.loadingSubject.next(true);
        this.service.get()
            .pipe(
                catchError(() => of([])),
                finalize(() => {
                    this.loadingSubject.next(false);
                })
            ).subscribe(items => this.data.next(items));
    }

    public connect(): Observable<T[]> {
        return this.renderData;
    }

    public disconnect(): void {
        this.data.complete();
        this.loadingSubject.complete();
    }

    public insert(item: T): void {
        this.service.insert(item).subscribe(result => {
            const data = this.data.getValue();
            data.push(result);
            this.data.next(data);
        });
        this.updateChangeSubscription();
    }

    public update(item: T): void {
        this.service.update(item).subscribe(result => {
            const data = this.data.getValue();
            const index = data.findIndex(i => this.compare(i, result));
            if (index > -1) {
              data[index] = result;
            }
            this.data.next(data);
        });
        this.updateChangeSubscription();
    }

    public delete(item: T): void {
        this.service.delete(item).subscribe(() => {
            const data = this.data.getValue();
            const index = data.findIndex(i => this.compare(i, item));
            if (index > -1) {
                data.splice(index, 1);
            }
            this.data.next(data);
        });
        this.updateChangeSubscription();
    }

    private compare(item: T, other: T): boolean {
        return item.id === other.id;
    }

    private updateChangeSubscription() {
        const sortChange: Observable<Sort|null|void> = this.sort ?
            merge<Sort|void>(this.sort.sortChange, this.sort.initialized) :
            of(null);

        const dataStream = this.data;

        const filteredData = combineLatest(dataStream, this._filter)
            .pipe(map(([data]) => this.filterData(data)));

        const orderedData = combineLatest(filteredData, sortChange)
            .pipe(map(([data]) => this.orderData(data)));

        this.renderChangesSubscription.unsubscribe();
        this.renderChangesSubscription = orderedData.subscribe(data => this.renderData.next(data));
    }

    private filterData(data: T[]): T[] {
        this.filteredData = !this.filter ? data : data.filter(obj => this.filterPredicate(obj, this.filter));

        return this.filteredData;
    }

    private orderData(data: T[]): T[] {
        if (!this.sort) { return data; }

        return this.sortData(data.slice(), this.sort);
    }


    private filterPredicate: ((data: T, filter: string) => boolean) = (data: T, filter: string): boolean => {
        // Transform the data into a lowercase string of all property values.
        const dataStr = Object.keys(data).reduce((currentTerm: string, key: string) => {
          // Use an obscure Unicode character to delimit the words in the concatenated string.
          // This avoids matches where the values of two columns combined will match the user's query
          // (e.g. `Flute` and `Stop` will match `Test`). The character is intended to be something
          // that has a very low chance of being typed in by somebody in a text field. This one in
          // particular is "White up-pointing triangle with dot" from
          // https://en.wikipedia.org/wiki/List_of_Unicode_characters
          return currentTerm + (data as {[key: string]: any})[key] + '◬';
        }, '').toLowerCase();

        const transformedFilter = filter.trim().toLowerCase();

        return dataStr.indexOf(transformedFilter) !== -1;
    }

    private sortingDataAccessor: ((data: T, sortHeaderId: string) => string|number) =
      (data: T, sortHeaderId: string): string|number => {
        const value = (data as {[key: string]: any})[sortHeaderId];

        if (_isNumberValue(value)) {
            const numberValue = Number(value);

            // Numbers beyond `MAX_SAFE_INTEGER` can't be compared reliably so we
            // leave them as strings.
            return numberValue < MAX_SAFE_INTEGER ? numberValue : value;
        }

        return value;
    }

    private sortData(data: T[], sort: MatSort): T[] {
        if (!sort.active || sort.direction === '') { return data; }

        return data.sort((a, b) => {
            const valueA = this.sortingDataAccessor(a, sort.active);
            const valueB = this.sortingDataAccessor(b, sort.active);

            let comparatorResult = 0;
            if (valueA != null && valueB != null) {
                if (valueA > valueB) {
                comparatorResult = 1;
                } else if (valueA < valueB) {
                comparatorResult = -1;
                }
            } else if (valueA != null) {
                comparatorResult = 1;
            } else if (valueB != null) {
                comparatorResult = -1;
            }

            return comparatorResult * (sort.direction === 'asc' ? 1 : -1);
        });
    }

}
