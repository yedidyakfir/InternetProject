import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterGroupComponent } from './enter-group.component';

describe('EnterGroupComponent', () => {
  let component: EnterGroupComponent;
  let fixture: ComponentFixture<EnterGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
