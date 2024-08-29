import { TestBed } from '@angular/core/testing';

import { AsyncContactService } from './async-contact.service';

describe('AsyncContactService', () => {
  let service: AsyncContactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsyncContactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
