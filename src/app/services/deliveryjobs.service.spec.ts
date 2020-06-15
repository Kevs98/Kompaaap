import { TestBed } from '@angular/core/testing';

import { DeliveryjobsService } from './deliveryjobs.service';

describe('DeliveryjobsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeliveryjobsService = TestBed.get(DeliveryjobsService);
    expect(service).toBeTruthy();
  });
});
