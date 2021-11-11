import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderPdfComponent } from './header-pdf.component';

describe('HeaderPdfComponent', () => {
  let component: HeaderPdfComponent;
  let fixture: ComponentFixture<HeaderPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
