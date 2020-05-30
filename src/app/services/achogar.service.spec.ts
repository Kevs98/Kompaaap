import { TestBed } from '@angular/core/testing';

import { ACHogarService } from './achogar.service';

describe('ACHogarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ACHogarService = TestBed.get(ACHogarService);
    expect(service).toBeTruthy();
  });
});
