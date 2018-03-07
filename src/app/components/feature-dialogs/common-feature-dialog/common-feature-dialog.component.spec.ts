import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonFeatureDialogComponent } from './common-feature-dialog.component';

describe('CommonFeatureDialogComponent', () => {
  let component: CommonFeatureDialogComponent;
  let fixture: ComponentFixture<CommonFeatureDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonFeatureDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonFeatureDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
