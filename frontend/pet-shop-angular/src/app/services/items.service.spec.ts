import { TestBed } from '@angular/core/testing';

import { ItemsService } from './items.service';

describe('ItemsService', () => {
  let service: ItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({}); // Create a test module with default configuration
    service = TestBed.inject(ItemsService); // Inject the ItemsService into the test environment
  });

  it('should be created', () => {
    expect(service).toBeTruthy(); // Assert that the service has been created and is truthy (i.e. not null or undefined)
  });
});