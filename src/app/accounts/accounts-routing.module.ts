import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './accounts/accounts.component';
import { AccountsDashboardComponent } from './accounts-dashboard/accounts-dashboard.component';
import { DevelopersComponent } from './developers/developers.component';
import { AccountsViewComponent } from './accounts-view/accounts-view.component';
import { DevGroupsComponent } from './dev-groups/dev-groups.component';
import { SummaryComponent } from './summary/summary.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: AccountsDashboardComponent,
    children: [
      {
        path: '',
        children: [
          { path: 'accounts', component: AccountsComponent, canActivate: [AuthGuard], data: { roles: ["default-role"] } },
          { path: 'accounts/:filter', component: AccountsComponent, canActivate: [AuthGuard], data: { roles: ["default-role"] } },
          { path: 'developers', component: DevelopersComponent, canActivate: [AuthGuard], data: { roles: ["default-role"] } },
          { path: 'view', component: AccountsViewComponent, canActivate: [AuthGuard], data: { roles: ["default-role"] } },
	  { path: 'view/:filter', component: AccountsViewComponent, canActivate: [AuthGuard], data: { roles: ["default-role"] } },
          { path: 'groups', component: DevGroupsComponent, canActivate: [AuthGuard], data: { roles: ["default-role"] } },
          { path: 'groups/:filter', component: DevGroupsComponent, canActivate: [AuthGuard], data: { roles: ["default-role"] } },
          //{ path: 'summary', component: SummaryComponent, canActivate: [AuthGuard], data: { roles: ["default-role"] }},
          { path: 'summary', component: SummaryComponent, canActivate: [AuthGuard], data: { roles: ["default-role"] }},
	  { path: 'summary/:filter', component: SummaryComponent, canActivate: [AuthGuard], data: { roles: ["default-role"] }},
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }
