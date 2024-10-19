import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import {ManageDevelopersComponent} from './manage-developers/manage-developers.component';
import {ManageGroupsComponent} from './manage-groups/manage-groups.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: 'admindash',
    component: AdminDashboardComponent,
    children: [
      {
        path: '',
        children: [
          { path: 'manage-developers', component: ManageDevelopersComponent, canActivate: [AuthGuard], data: { roles: ["dbmat_users", "dbmat_admins"] } },
          { path: 'manage-groups', component: ManageGroupsComponent, canActivate: [AuthGuard], data: { roles: ["dbmat_users", "dbmat_admins"] } },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
