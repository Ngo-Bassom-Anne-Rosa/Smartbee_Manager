import { TestBed } from '@angular/core/testing';

import { Apiary } from './apiary';

describe('Apiary', () => {
  let service: Apiary;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Apiary);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
