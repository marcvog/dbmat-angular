import {LiveAnnouncer} from '@angular/cdk/a11y';
import { Component, OnInit, OnDestroy, EventEmitter, Input, Output, AfterViewInit, ViewChild } from '@angular/core';
import {Subscription} from 'rxjs';
import {DevelopersApiService} from '../developers-api.service';
import {Developer} from '../developer.model';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatSort, Sort, MatSortModule} from '@angular/material/sort';

@Component({
  selector: 'app-developers',
  templateUrl: './developers.component.html',
  styleUrls: ['./developers.component.css'],
})
export class DevelopersComponent implements OnInit, OnDestroy {
  developersListSubs!: Subscription;
  developersList!: Developer[];
  displayedColumns: string[] = ['DBMDEV_ID', 'CONTACT', 'DBMDEV_INS_DATE', 'DBMDEV_UPD_DATE', 'CONTACT_NAME', 'CONTACT_EMAIL'];
  dataSource! : MatTableDataSource<Developer>;
  @Output() newDeveloper = new EventEmitter();

  constructor(private developersApi: DevelopersApiService, private _liveAnnouncer: LiveAnnouncer) {
  }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.developersListSubs = this.developersApi
      .getDevelopers('*','DBMAT_DEVELOPERS','CONTACT_NAME')
      .subscribe(res => {
          this.developersList = res;
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.sort = this.sort;
        },
        console.error
      );
  }

  ngOnDestroy() {
    this.developersListSubs.unsubscribe();
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
