import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailleInterventionComponent } from './detaille-intervention.component';

describe('DetailleInterventionComponent', () => {
  let component: DetailleInterventionComponent;
  let fixture: ComponentFixture<DetailleInterventionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailleInterventionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailleInterventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
