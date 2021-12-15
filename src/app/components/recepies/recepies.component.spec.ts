import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepiesComponent } from './recepies.component';

describe('RecepiesComponent', () => {
  let component: RecepiesComponent;
  let fixture: ComponentFixture<RecepiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecepiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecepiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
