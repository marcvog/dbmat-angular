import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDevelopersComponent } from './manage-developers.component';

describe('ManageDevelopersComponent', () => {
  let component: ManageDevelopersComponent;
  let fixture: ComponentFixture<ManageDevelopersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageDevelopersComponent]
    });
    fixture = TestBed.createComponent(ManageDevelopersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
