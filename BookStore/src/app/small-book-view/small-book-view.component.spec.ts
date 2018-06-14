import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallBookViewComponent } from './small-book-view.component';

describe('SmallBookViewComponent', () => {
  let component: SmallBookViewComponent;
  let fixture: ComponentFixture<SmallBookViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmallBookViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallBookViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
