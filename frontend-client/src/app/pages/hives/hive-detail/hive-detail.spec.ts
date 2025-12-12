import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiveDetail } from './hive-detail';

describe('HiveDetail', () => {
  let component: HiveDetail;
  let fixture: ComponentFixture<HiveDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HiveDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HiveDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
