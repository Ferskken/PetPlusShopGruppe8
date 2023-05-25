import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { BirdsComponent } from './birds.component';

describe('BirdsComponent', () => {
  let component: BirdsComponent;
  let fixture: ComponentFixture<BirdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BirdsComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BirdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
