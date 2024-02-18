import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTagFeatureComponent } from './admin-tag-feature.component';

describe('AdminTagFeatureComponent', () => {
  let component: AdminTagFeatureComponent;
  let fixture: ComponentFixture<AdminTagFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTagFeatureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminTagFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
