import { TestBed } from '@angular/core/testing';

import { AccountsViewApiService } from './accounts-view-api.service';

describe('AccountsViewApiService', () => {
  let service: AccountsViewApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountsViewApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
