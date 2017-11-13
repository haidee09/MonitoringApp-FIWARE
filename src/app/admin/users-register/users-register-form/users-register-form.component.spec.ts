import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersRegisterFormComponent } from './users-register-form.component';

describe('UsersRegisterFormComponent', () => {
  let component: UsersRegisterFormComponent;
  let fixture: ComponentFixture<UsersRegisterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersRegisterFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersRegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
