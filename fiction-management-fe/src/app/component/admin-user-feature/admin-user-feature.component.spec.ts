import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserFeatureComponent } from './admin-user-feature.component';

describe('AdminUserFeatureComponent', () => {
  let component: AdminUserFeatureComponent;
  let fixture: ComponentFixture<AdminUserFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminUserFeatureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminUserFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
