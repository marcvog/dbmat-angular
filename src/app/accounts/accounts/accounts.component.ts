import {LiveAnnouncer} from '@angular/cdk/a11y';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import {Subscription} from 'rxjs';
import {AccountsApiService} from '../accounts-api.service';
import {Account} from '../account.model';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit, OnDestroy, AfterViewInit {
  accountsListSubs!: Subscription;
  accountsList!: Account[];
  columns = [
    {
      columnDef: 'DBMACC_ID',
      header: 'DBMACC_ID',
      cell: (account: Account) => `${account.DBMACC_ID}`,
    },
    {
      columnDef: 'GLOBAL_NAME',
      header: 'GLOBAL',
      cell: (account: Account) => `${account.GLOBAL_NAME}`,
    },
    {
      columnDef: 'USERNAME',
      header: 'USERNAME',
      cell: (account: Account) => `${account.USERNAME}`,
    },
    {
      columnDef: 'ACCOUNT_STATUS',
      header: 'STATUS',
      cell: (account: Account) => `${account.ACCOUNT_STATUS}`,
    },
    {
      columnDef: 'CREATED',
      header: 'CREATED',
      cell: (account: Account) => `${account.CREATED}`,
    },
    {
      columnDef: 'LOCK_DATE',
      header: 'LOCK',
      cell: (account: Account) => `${account.LOCK_DATE}`,
    },
    {
      columnDef: 'EXPIRY_DATE',
      header: 'EXPIRY',
      cell: (account: Account) => `${account.EXPIRY_DATE}`,
    },
    {
      columnDef: 'PASSWORD_CHANGE_DATE',
      header: 'PASSWORD_CHANGE',
      cell: (account: Account) => `${account.PASSWORD_CHANGE_DATE}`,
    },
    {
      columnDef: 'LAST_LOGIN_DATE',
      header: 'LAST_LOGIN',
      cell: (account: Account) => `${account.LAST_LOGIN_DATE}`,
    },
    {
      columnDef: 'PASSWORD_VERSIONS',
      header: 'PASSWORD_VERSIONS',
      cell: (account: Account) => `${account.PASSWORD_VERSIONS}`,
    },
    {
      columnDef: 'COUNT_TABLES',
      header: 'TABLES',
      cell: (account: Account) => `${account.COUNT_TABLES}`,
    },
    {
      columnDef: 'DBMACC_USER_PREFIX',
      header: 'DBMACC_USER_PREFIX',
      cell: (account: Account) => `${account.DBMACC_USER_PREFIX}`,
    },
    {
      columnDef: 'DBMACC_INS_DATE',
      header: 'DBMACC_INS',
      cell: (account: Account) => `${account.DBMACC_INS_DATE}`,
    },
    {
      columnDef: 'DBMACC_UPD_DATE',
      header: 'DBMACC_UPD',
      cell: (account: Account) => `${account.DBMACC_UPD_DATE}`,
    },
    {
      columnDef: 'DBMDG_ID',
      header: 'DBMDG_ID',
      cell: (account: Account) => `${account.DBMDG_ID}`,
    },
  ];
  
  displayedColumns = this.columns.map(c => c.columnDef);
  dataSource = new MatTableDataSource<Account>();
  //dataSource: any;
  filterValues = {};
  filterSelectObj : any[];
  filter = '';
 
  constructor(private accountsApi: AccountsApiService, private route: ActivatedRoute, private _liveAnnouncer: LiveAnnouncer) {
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.filter = this.route.snapshot.params['filter'];
    this.accountsListSubs = this.accountsApi
      .getAccounts('*','DBMAT_ACCOUNTS','USERNAME')
      .subscribe(res => {
          this.accountsList = res;
          //this.dataSource = new MatTableDataSource(res);
          this.dataSource.data = res as Account[];
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.dataSource.filter = this.filter;
        },
        console.error
      );
  }

  ngAfterViewInit() {
    //console.log('Values on ngAfterViewInit():');
    //console.log("sort:", this.sort);
    //console.log("dataSource:", this.dataSource);
    //this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.accountsListSubs.unsubscribe();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
