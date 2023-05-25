import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCategoriesComponent } from './sub-categories.component';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SubCategoriesComponent', () => {
  let component: SubCategoriesComponent;
  let fixture: ComponentFixture<SubCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubCategoriesComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
