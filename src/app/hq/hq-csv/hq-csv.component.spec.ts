/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HqCsvComponent } from './hq-csv.component';

describe('HqCsvComponent', () => {
  let component: HqCsvComponent;
  let fixture: ComponentFixture<HqCsvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HqCsvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HqCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
