import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFictionDetailFeatureComponent } from './admin-fiction-detail-feature.component';

describe('AdminFictionDetailFeatureComponent', () => {
  let component: AdminFictionDetailFeatureComponent;
  let fixture: ComponentFixture<AdminFictionDetailFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminFictionDetailFeatureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminFictionDetailFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
