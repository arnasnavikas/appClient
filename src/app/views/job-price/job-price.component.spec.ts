import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPriceComponent } from './job-price.component';

describe('JobPriceComponent', () => {
  let component: JobPriceComponent;
  let fixture: ComponentFixture<JobPriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobPriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
