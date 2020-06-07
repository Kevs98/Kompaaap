import { TestBed } from '@angular/core/testing';

import { AparatosService } from './aparatos.service';

describe('AparatosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AparatosService = TestBed.get(AparatosService);
    expect(service).toBeTruthy();
  });
});
