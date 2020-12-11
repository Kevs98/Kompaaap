import { TestBed } from '@angular/core/testing';

import { MarketListService } from './market-list.service';

describe('MarketListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MarketListService = TestBed.get(MarketListService);
    expect(service).toBeTruthy();
  });
});
