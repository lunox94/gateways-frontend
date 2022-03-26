import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GatewayTableComponent } from './gateway-table.component';

describe('GatewayTableComponent', () => {
  let component: GatewayTableComponent;
  let fixture: ComponentFixture<GatewayTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GatewayTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GatewayTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
