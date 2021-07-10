import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateWeeklyMenuComponent } from './update-weekly-menu.component';

describe('UpdateWeeklyMenuComponent', () => {
  let component: UpdateWeeklyMenuComponent;
  let fixture: ComponentFixture<UpdateWeeklyMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateWeeklyMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateWeeklyMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
