import { Routes } from '@angular/router';
import { AdminFeatureComponent } from './component/admin-feature/admin-feature.component';
import { AdminTagFeatureComponent } from './component/admin-tag-feature/admin-tag-feature.component';

export const routes: Routes = [
  {
    path: 'admin',
    component: AdminFeatureComponent,
  },
  {
    path: 'admin/tag',
    component: AdminTagFeatureComponent,
  },
];
