import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityGuardsComponent } from './security-guards.component';

describe('SecurityGuardsComponent', () => {
  let component: SecurityGuardsComponent;
  let fixture: ComponentFixture<SecurityGuardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityGuardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityGuardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
