/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HqComponent } from './hq.component';

describe('HqComponent', () => {
  let component: HqComponent;
  let fixture: ComponentFixture<HqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
