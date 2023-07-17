import { TestBed } from '@angular/core/testing';

import { PostSerService } from './post-ser.service';

describe('PostSerService', () => {
  let service: PostSerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostSerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
