import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeavyMetalSamplesDialogComponent } from './heavy-metal-samples-dialog.component';

describe('HeavyMetalSamplesDialogComponent', () => {
  let component: HeavyMetalSamplesDialogComponent;
  let fixture: ComponentFixture<HeavyMetalSamplesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeavyMetalSamplesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeavyMetalSamplesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
