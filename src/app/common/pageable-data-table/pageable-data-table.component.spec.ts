import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageableDataTableComponent } from './pageable-data-table.component';

describe('PageableDataTableComponent', () => {
  let component: PageableDataTableComponent;
  let fixture: ComponentFixture<PageableDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageableDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageableDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
