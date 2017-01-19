/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IqHqComponent } from './iq-hq.component';

describe('IqHqComponent', () => {
  let component: IqHqComponent;
  let fixture: ComponentFixture<IqHqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IqHqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IqHqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
