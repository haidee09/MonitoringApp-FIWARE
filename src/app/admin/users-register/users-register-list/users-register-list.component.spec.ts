import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersRegisterListComponent } from './users-register-list.component';

describe('UsersRegisterListComponent', () => {
  let component: UsersRegisterListComponent;
  let fixture: ComponentFixture<UsersRegisterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersRegisterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersRegisterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
