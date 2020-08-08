import { TestBed } from '@angular/core/testing';

import { OrderwFilterService } from './orderw-filter.service';

describe('OrderwFilterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderwFilterService = TestBed.get(OrderwFilterService);
    expect(service).toBeTruthy();
  });
});
