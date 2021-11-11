import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailleEmployeeComponent } from './detaille-employee.component';

describe('DetailleEmployeeComponent', () => {
  let component: DetailleEmployeeComponent;
  let fixture: ComponentFixture<DetailleEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailleEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailleEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
