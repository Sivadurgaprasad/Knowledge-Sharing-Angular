import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTechInfoComponent } from './add-tech-info.component';

describe('AddTechInfoComponent', () => {
  let component: AddTechInfoComponent;
  let fixture: ComponentFixture<AddTechInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTechInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTechInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
