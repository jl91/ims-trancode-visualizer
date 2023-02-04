import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrancodeMapperComponent } from './trancode-mapper.component';

describe('TrancodeMapperComponent', () => {
  let component: TrancodeMapperComponent;
  let fixture: ComponentFixture<TrancodeMapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrancodeMapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrancodeMapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
