import { TestBed } from '@angular/core/testing';

import { KompaService } from './kompa.service';

describe('KompaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KompaService = TestBed.get(KompaService);
    expect(service).toBeTruthy();
  });
});
