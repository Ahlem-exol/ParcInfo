import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailleProjectComponent } from './detaille-project.component';

describe('DetailleProjectComponent', () => {
  let component: DetailleProjectComponent;
  let fixture: ComponentFixture<DetailleProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailleProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailleProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
