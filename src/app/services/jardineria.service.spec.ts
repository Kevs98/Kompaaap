import { TestBed } from '@angular/core/testing';

import { JardineriaService } from './jardineria.service';

describe('JardineriaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JardineriaService = TestBed.get(JardineriaService);
    expect(service).toBeTruthy();
  });
});
