import { TestBed } from '@angular/core/testing';

import { FloristeriaService } from './floristeria.service';

describe('FloristeriaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FloristeriaService = TestBed.get(FloristeriaService);
    expect(service).toBeTruthy();
  });
});
