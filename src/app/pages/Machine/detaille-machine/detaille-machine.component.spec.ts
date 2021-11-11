import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailleMachineComponent } from './detaille-machine.component';

describe('DetailleMachineComponent', () => {
  let component: DetailleMachineComponent;
  let fixture: ComponentFixture<DetailleMachineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailleMachineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailleMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
