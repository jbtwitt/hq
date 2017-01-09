/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IqCsvComponent } from './iq-csv.component';

describe('IqCsvComponent', () => {
  let component: IqCsvComponent;
  let fixture: ComponentFixture<IqCsvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IqCsvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IqCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
