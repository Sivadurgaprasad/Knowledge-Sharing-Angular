import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTechInfoComponent } from './delete-tech-info.component';

describe('DeleteTechInfoComponent', () => {
  let component: DeleteTechInfoComponent;
  let fixture: ComponentFixture<DeleteTechInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteTechInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTechInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
