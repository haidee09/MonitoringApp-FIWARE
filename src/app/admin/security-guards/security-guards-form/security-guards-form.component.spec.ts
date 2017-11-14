import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityGuardsFormComponent } from './security-guards-form.component';

describe('SecurityGuardsFormComponent', () => {
  let component: SecurityGuardsFormComponent;
  let fixture: ComponentFixture<SecurityGuardsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityGuardsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityGuardsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
