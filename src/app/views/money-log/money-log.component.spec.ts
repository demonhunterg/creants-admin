import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyLogComponent } from './money-log.component';

describe('MoneyLogComponent', () => {
  let component: MoneyLogComponent;
  let fixture: ComponentFixture<MoneyLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
