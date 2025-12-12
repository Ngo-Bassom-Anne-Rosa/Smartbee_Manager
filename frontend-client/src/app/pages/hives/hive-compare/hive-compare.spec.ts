import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiveCompare } from './hive-compare';

describe('HiveCompare', () => {
  let component: HiveCompare;
  let fixture: ComponentFixture<HiveCompare>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HiveCompare]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HiveCompare);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
