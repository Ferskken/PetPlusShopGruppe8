import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


describe('UsersService', () => {
  let service: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersService);
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
