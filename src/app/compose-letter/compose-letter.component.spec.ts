import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComposeLetterComponent } from './compose-letter.component';

describe('ComposeLetterComponent', () => {
  let component: ComposeLetterComponent;
  let fixture: ComponentFixture<ComposeLetterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComposeLetterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComposeLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
