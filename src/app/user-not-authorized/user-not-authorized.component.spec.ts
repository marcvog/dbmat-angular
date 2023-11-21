import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNotAuthorizedComponent } from './user-not-authorized.component';

describe('UserNotAuthorizedComponent', () => {
  let component: UserNotAuthorizedComponent;
  let fixture: ComponentFixture<UserNotAuthorizedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserNotAuthorizedComponent]
    });
    fixture = TestBed.createComponent(UserNotAuthorizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
