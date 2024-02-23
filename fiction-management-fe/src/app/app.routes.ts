import { Routes } from '@angular/router';
import { AdminFeatureComponent } from './component/admin-feature/admin-feature.component';
import { AdminFictionDetailFeatureComponent } from './component/admin-fiction-detail-feature/admin-fiction-detail-feature.component';
import { AdminFictionFeatureComponent } from './component/admin-fiction-feature/admin-fiction-feature.component';
import { AdminTagFeatureComponent } from './component/admin-tag-feature/admin-tag-feature.component';
import { AdminUserFeatureComponent } from './component/admin-user-feature/admin-user-feature.component';

export const routes: Routes = [
  {
    path: 'admin',
    component: AdminFeatureComponent,
  },
  {
    path: 'admin/tag',
    component: AdminTagFeatureComponent,
  },
  {
    path: 'admin/user',
    component: AdminUserFeatureComponent,
  },
  {
    path: 'admin/fiction',
    component: AdminFictionFeatureComponent,
  },
  {
    path: 'admin/fiction/create',
    component: AdminFictionDetailFeatureComponent,
  },
  {
    path: 'admin/fiction/update',
    component: AdminFictionDetailFeatureComponent,
  },
];
