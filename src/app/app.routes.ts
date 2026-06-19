import { Routes } from '@angular/router';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { ClientComponent } from './shared/components/client/client.component';
import { AddClientComponent } from './shared/components/add-client/add-client.component';
import { ViewClientComponent } from './shared/components/view-client/view-client.component';
import { EditClientComponent } from './shared/components/edit-client/edit-client.component';
import { AddVehicleComponent } from './shared/components/add-vehicle/add-vehicle.component';
import { ViewVehicleComponent } from './shared/components/view-vehicle/view-vehicle.component';
import { EditVehicleComponent } from './shared/components/edit-vehicle/edit-vehicle.component';
import { LoginComponent } from './shared/components/login/login.component';
import {RegisterComponent} from './shared/components/register/register.component';

import {authGuard} from './auth/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'clients', component: ClientComponent, canActivate: [authGuard] },
  { path: 'add-client', component: AddClientComponent, canActivate: [authGuard] },
  { path: 'clients/:id', component: ViewClientComponent, canActivate: [authGuard] },
  { path: 'clients/edit-client/:id', component: EditClientComponent, canActivate: [authGuard] },
  { path: 'vehicles/add-vehicle/:clientId', component: AddVehicleComponent, canActivate: [authGuard] },
  { path: 'vehicles/view-vehicle/:id', component: ViewVehicleComponent, canActivate: [authGuard] },
  { path: 'vehicles/edit-vehicle/:id', component: EditVehicleComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '/login' },
];
