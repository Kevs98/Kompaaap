import { TestBed } from '@angular/core/testing';

import { GruaService } from './grua.service';

describe('GruaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GruaService = TestBed.get(GruaService);
    expect(service).toBeTruthy();
  });
});
