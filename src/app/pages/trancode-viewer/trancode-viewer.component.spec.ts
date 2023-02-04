import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrancodeViewerComponent } from './trancode-viewer.component';

describe('TrancodeViewerComponent', () => {
  let component: TrancodeViewerComponent;
  let fixture: ComponentFixture<TrancodeViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrancodeViewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrancodeViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
