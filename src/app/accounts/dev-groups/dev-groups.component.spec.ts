import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevGroupsComponent } from './dev-groups.component';

describe('DevGroupsComponent', () => {
  let component: DevGroupsComponent;
  let fixture: ComponentFixture<DevGroupsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DevGroupsComponent]
    });
    fixture = TestBed.createComponent(DevGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
