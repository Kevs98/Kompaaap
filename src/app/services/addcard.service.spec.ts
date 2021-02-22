import { TestBed } from '@angular/core/testing';

import { AddcardService } from './addcard.service';

describe('AddcardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddcardService = TestBed.get(AddcardService);
    expect(service).toBeTruthy();
  });
});
