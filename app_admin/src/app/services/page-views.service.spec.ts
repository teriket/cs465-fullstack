import { TestBed } from '@angular/core/testing';

import { PageViewsService } from './page-views.service';

describe('PageViewsService', () => {
  let service: PageViewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageViewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
