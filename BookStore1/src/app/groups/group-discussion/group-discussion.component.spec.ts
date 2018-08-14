import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupDiscussionComponent } from './group-discussion.component';

describe('GroupDiscussionComponent', () => {
  let component: GroupDiscussionComponent;
  let fixture: ComponentFixture<GroupDiscussionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupDiscussionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupDiscussionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
