import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainInfoComponent } from './train-info.component';

describe('TrainInfoComponent', () => {
  let component: TrainInfoComponent;
  let fixture: ComponentFixture<TrainInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrainInfoComponent]
    });
    fixture = TestBed.createComponent(TrainInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
