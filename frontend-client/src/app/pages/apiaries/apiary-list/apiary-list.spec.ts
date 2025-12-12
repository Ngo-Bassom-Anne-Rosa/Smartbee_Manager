import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiaryList } from './apiary-list';

describe('ApiaryList', () => {
  let component: ApiaryList;
  let fixture: ComponentFixture<ApiaryList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiaryList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiaryList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
