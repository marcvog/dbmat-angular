import { TestBed } from '@angular/core/testing';

import { QueryApiService } from './query-api.service';

describe('QueryApiService', () => {
  let service: QueryApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueryApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
