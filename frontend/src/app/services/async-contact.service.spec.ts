import { TestBed } from '@angular/core/testing';

import { ContactService } from './async-contact.service';

describe('AsyncContactService', () => {
  let service: ContactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
