import {LiveAnnouncer} from '@angular/cdk/a11y';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { Subscription} from 'rxjs';
import { AccountsViewApiService} from '../accounts-view-api.service';
import { AccountsView } from '../accounts-view.model';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-accounts-view',
  templateUrl: './accounts-view.component.html',
  styleUrls: ['./accounts-view.component.css']
})
export class AccountsViewComponent implements OnInit, OnDestroy, AfterViewInit {
  accountsviewListSubs!: Subscription;
  accountsviewList!: AccountsView[];
  developerOptions!: string[];
  devGroupOptions!: string[];
  filters = ['Developer', 'Developer Group', 'Expression'];
  filterBy!: any;
  dataSource = new MatTableDataSource<AccountsView>();
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

  ckdColumns = [
    {
      columnDef: 'GLOBAL_NAME',
      header: 'GLOBAL',
      display: true,
    },
    {
      columnDef: 'USERNAME',
      header: 'USERNAME',
      display: true,
    },
    {
      columnDef: 'ACCOUNT_STATUS',
      header: 'STATUS',
      display: true,
    },
    {
      columnDef: 'CREATED',
      header: 'CREATED',
      display: true,
    },
    {
      columnDef: 'LOCK_DATE',
      header: 'LOCK',
      display: false,
    },
    {
      columnDef: 'EXPIRY_DATE',
      header: 'EXPIRY',
      display: true,
    },
    {
      columnDef: 'PASSWORD_CHANGE_DATE',
      header: 'PASSWORD_CHANGE',
      display: true,
    },
    {
      columnDef: 'LAST_LOGIN_DATE',
      header: 'LAST_LOGIN',
      display: true,
    },
    {
      columnDef: 'PASSWORD_VERSIONS',
      header: 'PASSWORD_VERSIONS',
      display: false,
    },
    {
      columnDef: 'COUNT_TABLES',
      header: 'TABLES',
      display: true,
    },
    {
      columnDef: 'DBMACC_USER_PREFIX',
      header: 'DBMACC_USER_PREFIX',
      display: false,
    },
    {
      columnDef: 'DBMDG_GROUP_NAME',
      header: 'DBMDG_GROUP_NAME',
      display: false,
    },
    {
      columnDef: 'DBMDG_GROUP_DESC',
      header: 'DBMDG_GROUP_DESC',
      display: false,
    },
    {
      columnDef: 'CONTACT',
      header: 'CONTACT',
      display: false,
    },
    {
      columnDef: 'CONTACT_NAME',
      header: 'CONTACT_NAME',
      display: true,
    },
    {
      columnDef: 'CONTACT_EMAIL',
      header: 'CONTACT_EMAIL',
      display: false,
    },
    {
      columnDef: 'DEVELOPER_ROLE',
      header: 'DEVELOPER_ROLE',
      display: false,
    },
  ];
  reducedDisplayedColumns!: any[];
  //reducedDisplayedColumns = this.ckdColumns.map(c => c.columnDef);

  constructor(private accountsviewApi: AccountsViewApiService, private _liveAnnouncer: LiveAnnouncer) {
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: string;
  //@ViewChild('reducedDisplayedColumns') reducedDisplayedColumns: string[];
  //reducedDisplayedColumns: string[];

  ngOnInit() {
    this.accountsviewListSubs = this.accountsviewApi
      .getAccountsView('DBMAT_V_ACCOUNTS')
      .subscribe(res => {
          this.accountsviewList = res;
          //this.dataSource = new MatTableDataSource(res);
          this.dataSource.data = res as AccountsView[];
          this.dataSource.sort = this.sort;
          this.dataSource.filter = this.filter;
          var options: string[];
          options = this.accountsviewList.map(function(obj) { return obj.CONTACT_NAME; });
          options = options.filter(function(v,i) { return options.indexOf(v) == i; });
          this.developerOptions = options.sort();
          options = this.accountsviewList.map(function(obj) { return obj.DBMDG_GROUP_NAME; });
          options = options.filter(function(v,i) { return options.indexOf(v) == i; });
          this.devGroupOptions = options.sort();
          this.reducedDisplayedColumns = this.ckdColumns.filter(c => c.display===true).map(c => c.columnDef);
        },
        console.error
      );
  }

  ngOnDestroy() {
    this.accountsviewListSubs.unsubscribe();
  }

  ngAfterViewInit() {
    //this.dataSource.filter = this.filter;
    //this.dataSource.sort = this.sort;
    //this.reducedDisplayedColumns = this.ckdColumns.filter(c => c.display===true).map(c => c.columnDef);
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  clearFilters(){
     this.dataSource.filter = '';
     this.filter = '';
     this.filterBy = undefined;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addColumn(column: string) {
    this.ckdColumns.forEach((element, index)=>{
        if(element.columnDef==column && element.display==false) {
           this.ckdColumns[index].display = true;
           this.reducedDisplayedColumns.push(column);
        }        
    }); 
  }

  removeColumn(column: string) {
    this.reducedDisplayedColumns.forEach((value, index)=>{
        if(value==column) this.reducedDisplayedColumns.splice(index,1);
    });
    this.ckdColumns.forEach((element, index)=>{
        if(element.columnDef==column) this.ckdColumns[index].display = false;
    });
  }
}
