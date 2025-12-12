import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiaryDetail } from './apiary-detail';

describe('ApiaryDetail', () => {
  let component: ApiaryDetail;
  let fixture: ComponentFixture<ApiaryDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiaryDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiaryDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
