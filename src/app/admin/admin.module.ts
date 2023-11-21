import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ManageDevelopersComponent } from './manage-developers/manage-developers.component';
import { ManageGroupsComponent } from './manage-groups/manage-groups.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    ManageDevelopersComponent,
    ManageGroupsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatButtonToggleModule,
    FormsModule,
    MatTableModule,
    MatCheckboxModule,
  ]
})
export class AdminModule { }
