import { TestBed } from '@angular/core/testing';

import { AlbañileriaService } from './albañileria.service';

describe('AlbañileriaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlbañileriaService = TestBed.get(AlbañileriaService);
    expect(service).toBeTruthy();
  });
});
