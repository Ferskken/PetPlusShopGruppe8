import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrongPasswordDialogComponent } from './wrong-password-dialog.component';

describe('WrongPasswordDialogComponent', () => {
  let component: WrongPasswordDialogComponent;
  let fixture: ComponentFixture<WrongPasswordDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrongPasswordDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WrongPasswordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
