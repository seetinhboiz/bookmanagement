import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FictionDetailComponent } from './fiction-detail.component';

describe('FictionDetailComponent', () => {
  let component: FictionDetailComponent;
  let fixture: ComponentFixture<FictionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FictionDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FictionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
