import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicesStatusCellComponent } from './devices-status-cell.component';

describe('DevicesStatusCellComponent', () => {
  let component: DevicesStatusCellComponent;
  let fixture: ComponentFixture<DevicesStatusCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevicesStatusCellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevicesStatusCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
