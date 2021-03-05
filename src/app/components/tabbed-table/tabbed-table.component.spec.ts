import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TabbedTableComponent } from './tabbed-table.component';

describe('TableComponent', () => {
  let component: TabbedTableComponent;
  let fixture: ComponentFixture<TabbedTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TabbedTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabbedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
