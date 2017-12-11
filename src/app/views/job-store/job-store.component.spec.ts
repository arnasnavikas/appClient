import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobStoreComponent } from './job-store.component';

describe('JobStoreComponent', () => {
  let component: JobStoreComponent;
  let fixture: ComponentFixture<JobStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
