import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminItemsListComponent } from './admin-items-list.component';

describe('AdminItemsListComponent', () => {
  let component: AdminItemsListComponent;
  let fixture: ComponentFixture<AdminItemsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminItemsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminItemsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
