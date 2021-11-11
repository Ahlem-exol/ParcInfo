import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeLogicielComponent } from './liste-logiciel.component';

describe('ListeLogicielComponent', () => {
  let component: ListeLogicielComponent;
  let fixture: ComponentFixture<ListeLogicielComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeLogicielComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeLogicielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
