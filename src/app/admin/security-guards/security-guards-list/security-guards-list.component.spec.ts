import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityGuardsListComponent } from './security-guards-list.component';

describe('SecurityGuardsListComponent', () => {
  let component: SecurityGuardsListComponent;
  let fixture: ComponentFixture<SecurityGuardsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityGuardsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityGuardsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
