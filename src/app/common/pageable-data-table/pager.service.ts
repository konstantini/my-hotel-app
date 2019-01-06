import { Injectable } from '@angular/core';
import { Pager } from './pager';

@Injectable({
  providedIn: 'root'
})
export class PagerService {

  constructor() { }

  getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10): Pager {

    const totalPages: number = Math.ceil(totalItems / pageSize);

    let startPage: number,
        endPage: number;

    if (totalPages <= 5) {
        startPage = 1;
        endPage = totalPages;
    } else {
        if (currentPage <= 3) {
            startPage = 1;
            endPage = 5;
        } else if (currentPage + 1 >= totalPages) {
            startPage = totalPages - 4;
            endPage = totalPages;
        } else {
            startPage = currentPage - 2;
            endPage = currentPage + 2;
        }
    }

    const startIndex: number = (currentPage - 1) * pageSize;
    const endIndex: number = Math.min(startIndex + pageSize - 1, totalItems - 1);

    const pages: number[] = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

    return new Pager(
        totalItems,
        currentPage,
        pageSize,
        totalPages,
        startPage,
        endPage,
        startIndex,
        endIndex,
        pages
    );
  }

}
