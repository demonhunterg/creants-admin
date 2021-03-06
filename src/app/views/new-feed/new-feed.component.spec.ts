import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFeedComponent } from './new-feed.component';

describe('NewFeedComponent', () => {
  let component: NewFeedComponent;
  let fixture: ComponentFixture<NewFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
