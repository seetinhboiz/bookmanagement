import { Routes } from '@angular/router';
import { AdminFeatureComponent } from './component/admin-feature/admin-feature.component';
import { AdminFictionDetailFeatureComponent } from './component/admin-fiction-detail-feature/admin-fiction-detail-feature.component';
import { AdminFictionFeatureComponent } from './component/admin-fiction-feature/admin-fiction-feature.component';
import { AdminTagFeatureComponent } from './component/admin-tag-feature/admin-tag-feature.component';
import { AdminUserFeatureComponent } from './component/admin-user-feature/admin-user-feature.component';
import { AdminChapterFeatureComponent } from './component/admin-chapter-feature/admin-chapter-feature.component';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { expenseGuard } from './guard/expense.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [expenseGuard],
  },
  {
    path: 'admin',
    component: AdminFeatureComponent,
    canActivate: [expenseGuard],
  },
  {
    path: 'admin/tag',
    component: AdminTagFeatureComponent,
    canActivate: [expenseGuard],
  },
  {
    path: 'admin/user',
    component: AdminUserFeatureComponent,
    canActivate: [expenseGuard],
  },
  {
    path: 'admin/fiction',
    component: AdminFictionFeatureComponent,
    canActivate: [expenseGuard],
  },
  {
    path: 'admin/fiction/create',
    component: AdminFictionDetailFeatureComponent,
    canActivate: [expenseGuard],
  },
  {
    path: 'admin/fiction/update/:id',
    component: AdminFictionDetailFeatureComponent,
    canActivate: [expenseGuard],
  },
  {
    path: 'admin/fiction/update/:fictionId/chapter/create',
    component: AdminChapterFeatureComponent,
    canActivate: [expenseGuard],
  },
  {
    path: 'admin/fiction/update/:fictionId/chapter/update/:chapterId',
    component: AdminChapterFeatureComponent,
    canActivate: [expenseGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: '**', redirectTo: '/home' },
];
