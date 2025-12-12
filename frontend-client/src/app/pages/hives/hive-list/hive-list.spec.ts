import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiveList } from './hive-list';

describe('HiveList', () => {
  let component: HiveList;
  let fixture: ComponentFixture<HiveList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HiveList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HiveList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
