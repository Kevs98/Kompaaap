import { TestBed } from '@angular/core/testing';

import { BarberiaService } from './barberia.service';

describe('BarberiaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BarberiaService = TestBed.get(BarberiaService);
    expect(service).toBeTruthy();
  });
});
