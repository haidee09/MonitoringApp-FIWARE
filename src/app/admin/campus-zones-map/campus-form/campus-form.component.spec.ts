import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusFormComponent } from './campus-form.component';

describe('CampusFormComponent', () => {
  let component: CampusFormComponent;
  let fixture: ComponentFixture<CampusFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampusFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
