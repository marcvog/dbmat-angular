import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {HttpClientModule} from '@angular/common/http';
import { AccountsRoutingModule } from './accounts-routing.module';
import { DevelopersComponent } from './developers/developers.component';
import { AccountsComponent } from './accounts/accounts.component';
import { AccountsDashboardComponent } from './accounts-dashboard/accounts-dashboard.component';
import { AccountsViewComponent } from './accounts-view/accounts-view.component';
import { DevGroupsComponent } from './dev-groups/dev-groups.component';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { SummaryComponent } from './summary/summary.component';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    DevelopersComponent,
    AccountsComponent,
    AccountsDashboardComponent,
    AccountsViewComponent,
    DevGroupsComponent,
    SummaryComponent,
  ],
  imports: [
    FormsModule,
    MatFormFieldModule,
    CommonModule,
    HttpClientModule,
    AccountsRoutingModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
  ]
})
export class AccountsModule { }
