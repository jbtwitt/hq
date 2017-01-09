/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HqStatComponent } from './hq-stat.component';

describe('HqStatComponent', () => {
  let component: HqStatComponent;
  let fixture: ComponentFixture<HqStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HqStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HqStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
