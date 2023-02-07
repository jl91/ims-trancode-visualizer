import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportDatabaseModalComponent } from './import-database-modal.component';

describe('ImportDatabaseModalComponent', () => {
  let component: ImportDatabaseModalComponent;
  let fixture: ComponentFixture<ImportDatabaseModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportDatabaseModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportDatabaseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
