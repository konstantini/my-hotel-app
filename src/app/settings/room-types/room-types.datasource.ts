import { DataSource } from '@angular/cdk/collections';

import { MatSort, Sort } from '@angular/material';
import { RoomTypeService } from './room-type.service';
import { BehaviorSubject, Observable, Subscription, combineLatest, merge, of } from 'rxjs';

import { RoomType } from './room-type';
import { map, catchError, finalize } from 'rxjs/operators';

export class RoomTypesDataSource implements DataSource<RoomType> {

    private readonly renderData = new BehaviorSubject<RoomType[]>([]);

    private data: BehaviorSubject<RoomType[]>;

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

        const orderedData = combineLatest(dataStream, sortChange)
            .pipe(map(([data]) => this.orderData(data)));

        this.renderChangesSubscription.unsubscribe();
        this.renderChangesSubscription = orderedData.subscribe(data => this.renderData.next(data));
    }

    orderData(data: RoomType[]): RoomType[] {
        // If there is no active sort or direction, return the data without trying to sort.
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
