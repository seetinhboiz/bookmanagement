import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChapterFeatureComponent } from './admin-chapter-feature.component';

describe('AdminChapterFeatureComponent', () => {
  let component: AdminChapterFeatureComponent;
  let fixture: ComponentFixture<AdminChapterFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminChapterFeatureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminChapterFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
