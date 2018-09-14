import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodesTimelineComponent } from './nodes-timeline.component';

describe('NodesTimelineComponent', () => {
  let component: NodesTimelineComponent;
  let fixture: ComponentFixture<NodesTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodesTimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodesTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
