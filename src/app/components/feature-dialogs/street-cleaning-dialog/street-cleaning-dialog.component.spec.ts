import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StreetCleaningDialogComponent } from './street-cleaning-dialog.component';

describe('StreetCleaningDialogComponent', () => {
  let component: StreetCleaningDialogComponent;
  let fixture: ComponentFixture<StreetCleaningDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StreetCleaningDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StreetCleaningDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
