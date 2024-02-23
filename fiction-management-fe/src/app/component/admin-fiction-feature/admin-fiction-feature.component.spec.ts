import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFictionFeatureComponent } from './admin-fiction-feature.component';

describe('AdminFictionFeatureComponent', () => {
  let component: AdminFictionFeatureComponent;
  let fixture: ComponentFixture<AdminFictionFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminFictionFeatureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminFictionFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
