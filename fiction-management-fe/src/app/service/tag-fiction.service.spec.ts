import { TestBed } from '@angular/core/testing';

import { TagFictionService } from './tag-fiction.service';

describe('TagFictionService', () => {
  let service: TagFictionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TagFictionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
