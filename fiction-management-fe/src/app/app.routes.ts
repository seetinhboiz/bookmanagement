import { Routes } from '@angular/router';
import { AdminChapterFeatureComponent } from './component/admin-chapter-feature/admin-chapter-feature.component';
import { AdminFeatureComponent } from './component/admin-feature/admin-feature.component';
import { AdminFictionDetailFeatureComponent } from './component/admin-fiction-detail-feature/admin-fiction-detail-feature.component';
import { AdminFictionFeatureComponent } from './component/admin-fiction-feature/admin-fiction-feature.component';
import { AdminTagFeatureComponent } from './component/admin-tag-feature/admin-tag-feature.component';
import { AdminUserFeatureComponent } from './component/admin-user-feature/admin-user-feature.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { ExpenseGuard } from './guard/expense.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    // canActivate: [ExpenseGuard],
  },
  {
    path: 'admin',
    component: AdminFeatureComponent,
    canActivate: [ExpenseGuard],
  },

  {
    path: 'admin/tag',
    component: AdminTagFeatureComponent,
    canActivate: [ExpenseGuard],
  },
  {
    path: 'admin/user',
    component: AdminUserFeatureComponent,
    canActivate: [ExpenseGuard],
  },
  {
    path: 'admin/fiction',
    component: AdminFictionFeatureComponent,
    canActivate: [ExpenseGuard],
  },
  {
    path: 'admin/fiction/create',
    component: AdminFictionDetailFeatureComponent,
    canActivate: [ExpenseGuard],
  },
  {
    path: 'admin/fiction/update/:id',
    component: AdminFictionDetailFeatureComponent,
    canActivate: [ExpenseGuard],
  },
  {
    path: 'admin/fiction/update/:fictionId/chapter/create',
    component: AdminChapterFeatureComponent,
    canActivate: [ExpenseGuard],
  },
  {
    path: 'admin/fiction/update/:fictionId/chapter/update/:chapterId',
    component: AdminChapterFeatureComponent,
    canActivate: [ExpenseGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: '**', redirectTo: '/home' },
];
