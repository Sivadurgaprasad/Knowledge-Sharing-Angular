import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTechInfoComponent } from './update-tech-info.component';

describe('UpdateTechInfoComponent', () => {
  let component: UpdateTechInfoComponent;
  let fixture: ComponentFixture<UpdateTechInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTechInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTechInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
