import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogedNavBarComponent } from './loged-nav-bar.component';

describe('LogedNavBarComponent', () => {
  let component: LogedNavBarComponent;
  let fixture: ComponentFixture<LogedNavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogedNavBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogedNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
