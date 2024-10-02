import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { Subscription} from 'rxjs';
import { AccountsViewApiService} from '../accounts-view-api.service';
import { AccountsView } from '../accounts-view.model';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { Router, ActivatedRoute } from '@angular/router';


export interface DevGroup {
  DBMDG_GROUP_NAME: string;
}

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit, OnDestroy {

  accountsviewListSubs!: Subscription;
  developerOptions!: string[];
  clickedRows = new Set<AccountsView>();

  columns = [
    {
      columnDef: 'GLOBAL_NAME',
      header: 'GLOBAL',
      cell: (view: AccountsView) => `${view.GLOBAL_NAME}`,
    },
    {
      columnDef: 'USERNAME',
      header: 'USERNAME',
      cell: (view: AccountsView) => `${view.USERNAME}`,
    },
    {
      columnDef: 'ACCOUNT_STATUS',
      header: 'STATUS',
      cell: (view: AccountsView) => `${view.ACCOUNT_STATUS}`,
    },
    {
      columnDef: 'CREATED',
      header: 'CREATED',
      cell: (view: AccountsView) => `${view.CREATED}`,
    },
    {
      columnDef: 'LOCK_DATE',
      header: 'LOCK',
      cell: (view: AccountsView) => `${view.LOCK_DATE}`,
    },
    {
      columnDef: 'EXPIRY_DATE',
      header: 'EXPIRY',
      cell: (view: AccountsView) => `${view.EXPIRY_DATE}`,
    },
    {
      columnDef: 'PASSWORD_CHANGE_DATE',
      header: 'PASSWORD_CHANGE',
      cell: (view: AccountsView) => `${view.PASSWORD_CHANGE_DATE}`,
    },
    {
      columnDef: 'LAST_LOGIN_DATE',
      header: 'LAST_LOGIN',
      cell: (view: AccountsView) => `${view.LAST_LOGIN_DATE}`,
    },
    {
      columnDef: 'PASSWORD_VERSIONS',
      header: 'PASSWORD_VERSIONS',
      cell: (view: AccountsView) => `${view.PASSWORD_VERSIONS}`,
    },
    {
      columnDef: 'COUNT_TABLES',
      header: 'TABLES',
      cell: (view: AccountsView) => `${view.COUNT_TABLES}`,
    },
    {
      columnDef: 'DBMACC_USER_PREFIX',
      header: 'DBMACC_USER_PREFIX',
      cell: (view: AccountsView) => `${view.DBMACC_USER_PREFIX}`,
    },
    {
      columnDef: 'DBMDG_GROUP_NAME',
      header: 'DBMDG_GROUP_NAME',
      cell: (view: AccountsView) => `${view.DBMDG_GROUP_NAME}`,
    },
    {
      columnDef: 'DBMDG_GROUP_DESC',
      header: 'DBMDG_GROUP_DESC',
      cell: (view: AccountsView) => `${view.DBMDG_GROUP_DESC}`,
    },
    {
      columnDef: 'CONTACT',
      header: 'CONTACT',
      cell: (view: AccountsView) => `${view.CONTACT}`,
    },
    {
      columnDef: 'CONTACT_NAME',
      header: 'CONTACT_NAME',
      cell: (view: AccountsView) => `${view.CONTACT_NAME}`,
    },
    {
      columnDef: 'CONTACT_EMAIL',
      header: 'CONTACT_EMAIL',
      cell: (view: AccountsView) => `${view.CONTACT_EMAIL}`,
    },
    {
      columnDef: 'DEVELOPER_ROLE',
      header: 'DEVELOPER_ROLE',
      cell: (view: AccountsView) => `${view.DEVELOPER_ROLE}`,
    },
  ];

  constructor(private accountsviewApi: AccountsViewApiService, private route: ActivatedRoute, private router: Router) {
  }

  reducedDisplayedColumns1=['GLOBAL_NAME', 'USERNAME'];
  reducedDisplayedColumns2=['DBMDG_GROUP_NAME'];

  dataSource = new MatTableDataSource<AccountsView>();

  @ViewChild(MatSort) sort: MatSort;
  filter: string;

  ngOnInit() {
    this.filter = this.route.snapshot.params['filter'];
    if (!this.filter) {
	    this.filter = 'Aleksandr Alekseev'};
    this.accountsviewListSubs = this.accountsviewApi
      .getAccountsView('DBMAT_V_ACCOUNTS')
      .subscribe(res => {
          this.dataSource.data = res as AccountsView[];
          this.dataSource.sort = this.sort;
          this.dataSource.filter = this.filter;
          var options: string[];
          options = this.dataSource.data.map(function(obj) { return obj.CONTACT_NAME; });
          options = options.filter(function(v,i) { return options.indexOf(v) == i; });
          this.developerOptions = options.sort();
        },
        console.error
      );
  }

  ngOnDestroy() {
    this.accountsviewListSubs.unsubscribe();
  }

  clearFilters(){
     this.filter = '';
     this.dataSource.filter = '';
  }

  //Basically this method only needs the name of the field/key you are searching
  nonRepeated(field: string ): any[] {
  //First we create the array that we want to return transformed
      let arrayField = [];
  //We iterate over our filteredData
      for (let item of this.dataSource.filteredData) {
  //We push the value of the field to our previous array
        arrayField.push(item[field as keyof AccountsView]);
      }
  //Here we sort the Array alphabetically
      arrayField = arrayField.sort();
  //Finally we return the array with non-repeated values thanks to ES6
      return [...new Set(arrayField)];
  }

  devGroups(columns: string[]): DevGroup[] {
      //let devGroups: DevGroup[];
      let devGroups = [];
      for (let item of columns) {
        //console.log(item)
        devGroups.push({'DBMDG_GROUP_NAME': item});
      }
      return devGroups;
  }

  goToDevGroup(filter: string) {
    let route = '/dashboard/groups/';
    this.router.navigate([route, filter]);
  }

  goToAccount(filter: string) {
    let route = '/dashboard/accounts/';
    this.router.navigate([route, filter]);
  }

}
