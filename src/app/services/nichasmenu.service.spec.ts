import { TestBed } from '@angular/core/testing';

import { NichasmenuService } from './nichasmenu.service';

describe('NichasmenuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NichasmenuService = TestBed.get(NichasmenuService);
    expect(service).toBeTruthy();
  });
});
