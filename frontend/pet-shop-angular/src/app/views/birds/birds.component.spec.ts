import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallAnimalsComponent } from './birds.component';

describe('SmallAnimalsComponent', () => {
  let component: SmallAnimalsComponent;
  let fixture: ComponentFixture<SmallAnimalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmallAnimalsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmallAnimalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
