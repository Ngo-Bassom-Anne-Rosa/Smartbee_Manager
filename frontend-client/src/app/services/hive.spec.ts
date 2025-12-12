import { TestBed } from '@angular/core/testing';

import { Hive } from './hive';

describe('Hive', () => {
  let service: Hive;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Hive);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
