import { TestBed } from '@angular/core/testing';

import { FictionService } from './fiction.service';

describe('FictionService', () => {
  let service: FictionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FictionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
