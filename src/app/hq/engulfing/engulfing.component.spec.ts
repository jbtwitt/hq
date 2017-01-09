/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EngulfingComponent } from './engulfing.component';

describe('EngulfingComponent', () => {
  let component: EngulfingComponent;
  let fixture: ComponentFixture<EngulfingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EngulfingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EngulfingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
