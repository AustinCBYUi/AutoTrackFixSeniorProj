import { Routes } from '@angular/router';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { ClientComponent } from './shared/components/client/client.component';
import { LoginComponent } from './shared/components/login/login.component';
import {RegisterComponent} from './shared/components/register/register.component';

import {authGuard} from './auth/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'clients', component: ClientComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '/login' },
];
