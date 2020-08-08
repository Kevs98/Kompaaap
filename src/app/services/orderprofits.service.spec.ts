import { TestBed } from '@angular/core/testing';

import { OrderprofitsService } from './orderprofits.service';

describe('OrderprofitsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderprofitsService = TestBed.get(OrderprofitsService);
    expect(service).toBeTruthy();
  });
});
