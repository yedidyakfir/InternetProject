import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainBlogViewComponent } from './main-blog-view.component';

describe('MainBlogViewComponent', () => {
  let component: MainBlogViewComponent;
  let fixture: ComponentFixture<MainBlogViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainBlogViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainBlogViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
