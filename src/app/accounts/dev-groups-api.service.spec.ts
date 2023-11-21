import { TestBed } from '@angular/core/testing';

import { DevGroupsApiService } from './dev-groups-api.service';

describe('DevGroupsApiService', () => {
  let service: DevGroupsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DevGroupsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
