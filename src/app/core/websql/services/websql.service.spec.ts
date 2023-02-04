import { TestBed } from '@angular/core/testing';

import { WebsqlService } from './websql.service';

describe('WebsqlService', () => {
  let service: WebsqlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebsqlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
