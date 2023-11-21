import { TestBed } from '@angular/core/testing';

import { InsertApiService } from './insert-api.service';

describe('InsertApiService', () => {
  let service: InsertApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsertApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
