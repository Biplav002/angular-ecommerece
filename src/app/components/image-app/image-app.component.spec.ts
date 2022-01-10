import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageAppComponent } from './image-app.component';

describe('ImageAppComponent', () => {
  let component: ImageAppComponent;
  let fixture: ComponentFixture<ImageAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
