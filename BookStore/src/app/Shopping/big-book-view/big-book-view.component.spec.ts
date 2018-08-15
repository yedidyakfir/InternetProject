import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BigBookViewComponent } from './big-book-view.component';

describe('BigBookViewComponent', () => {
  let component: BigBookViewComponent;
  let fixture: ComponentFixture<BigBookViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BigBookViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BigBookViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
