import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutUsSharedComponent } from './about-us-shared.component';

describe('AboutUsSharedComponent', () => {
  let component: AboutUsSharedComponent;
  let fixture: ComponentFixture<AboutUsSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutUsSharedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutUsSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
