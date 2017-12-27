import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicesAreaComponent } from './devices-area.component';

describe('DevicesAreaComponent', () => {
  let component: DevicesAreaComponent;
  let fixture: ComponentFixture<DevicesAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevicesAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevicesAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
