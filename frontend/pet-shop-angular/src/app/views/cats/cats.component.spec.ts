import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CatsComponent } from './cats.component';

describe('CatsComponent', () => {
  let component: CatsComponent;
  let fixture: ComponentFixture<CatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatsComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
