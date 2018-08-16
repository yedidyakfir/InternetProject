import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogDiscussionComponent } from './blog-discussion.component';

describe('BlogDiscussionComponent', () => {
  let component: BlogDiscussionComponent;
  let fixture: ComponentFixture<BlogDiscussionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogDiscussionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogDiscussionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
