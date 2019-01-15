import { DataSource } from '@angular/cdk/collections';

import { MatSort, Sort } from '@angular/material';
import { RoomTypeService } from './room-type.service';
import { BehaviorSubject, Observable, Subscription, combineLatest, merge, of } from 'rxjs';

import { RoomType } from './room-type';
import { map, catchError, finalize } from 'rxjs/operators';

export class RoomTypesDataSource implements DataSource<RoomType> {

    private readonly renderData = new BehaviorSubject<RoomType[]>([]);

    private data: BehaviorSubject<RoomType[]>;

    private readonly _filter = new BehaviorSubject<string>('');

    get filter(): string { return this._filter.value; }
    set filter(filter: string) { this._filter.next(filter); }


    filteredData: RoomType[];

    renderChangesSubscription = Subscription.EMPTY;

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private roomTypeService: RoomTypeService, private sort: MatSort) {
        this.data = new BehaviorSubject<RoomType[]>([]);
        this.load();
        this.updateChangeSubscription();
    }

    updateChangeSubscription() {
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

    filterData(data: RoomType[]): RoomType[] {
        this.filteredData = !this.filter ? data : data.filter(obj => this.filterPredicate(obj, this.filter));

        return this.filteredData;
    }

    orderData(data: RoomType[]): RoomType[] {
        if (!this.sort) { return data; }

        return this.sortData(data.slice(), this.sort);
    }

    load() {
        this.loadingSubject.next(true);
        this.roomTypeService.getRoomTypes()
            .pipe(
                catchError(() => of([])),
                finalize(() => {
                    this.loadingSubject.next(false);
                })
            ).subscribe(roomTypes => this.data.next(roomTypes));
    }

    update(roomType: RoomType) {
        this.roomTypeService.updateRoomType(roomType).subscribe(item => {
            const data = this.data.getValue();
            const index = data.findIndex(i => i.id === item.id);
            if (index > -1) {
              data[index] = item;
            }
            this.data.next(data);
        });
        this.updateChangeSubscription();
    }

    delete(roomType: RoomType) {
        this.roomTypeService.deleteRoomType(roomType).subscribe(() => {
            const data = this.data.getValue();
            const index = data.findIndex(i => i.id === roomType.id);
            if (index > -1) {
                data.splice(index, 1);
            }
            this.data.next(data);
        });
        this.updateChangeSubscription();
    }

    connect(): Observable<RoomType[]> {
        return this.renderData;
    }

    disconnect(): void {
        this.data.complete();
        this.loadingSubject.complete();
    }

    filterPredicate: ((data: RoomType, filter: string) => boolean) = (data: RoomType, filter: string): boolean => {
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

        // Transform the filter by converting it to lowercase and removing whitespace.
        const transformedFilter = filter.trim().toLowerCase();

        return dataStr.indexOf(transformedFilter) !== -1;
    }

    sortData(data: RoomType[], sort: MatSort): RoomType[] {
        if (!sort.active || sort.direction === '') { return data; }


        return data.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
          switch (sort.active) {
            case 'id': return compare(a.id, b.id, isAsc); break;
            case 'type': return compare(a.type, b.type, isAsc); break;
            case 'capacity': return compare(a.capacity, b.capacity, isAsc); break;
            case 'description': return compare(a.description, b.description, isAsc); break;
            default: return 0;
          }
        });
    }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
