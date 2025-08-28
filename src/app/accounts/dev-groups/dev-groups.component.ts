import {LiveAnnouncer} from '@angular/cdk/a11y';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import {Subscription} from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {DevGroupsApiService} from '../dev-groups-api.service';
import {DevGroup} from '../dev-group.model';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatSort, Sort, MatSortModule} from '@angular/material/sort';
import { ActivatedRoute, ParamMap, Router, Route } from '@angular/router';

@Component({
  selector: 'app-dev-groups',
  templateUrl: './dev-groups.component.html',
  styleUrls: ['./dev-groups.component.css']
})
export class DevGroupsComponent {
  devgroupsListSubs!: Subscription;
  devgroupsList!: DevGroup[];
  displayedColumns: string[] = ['DBMDG_ID', 'DBMDG_GROUP_NAME', 'DBMDG_GROUP_DESC', 'DBMDG_INS_DATE', 'DBMDG_UPD_DATE', 'DBMDEV_ID'];
  dataSource! : MatTableDataSource<DevGroup>;
  filter = '';

  constructor(private devgroupsApi: DevGroupsApiService, private route: ActivatedRoute, private _liveAnnouncer: LiveAnnouncer) {
  }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.filter = this.route.snapshot.params['filter'];
    this.devgroupsListSubs = this.devgroupsApi
      .getDevGroups('*','DBMAT_DEV_GROUPS','DBMDG_GROUP_NAME','like','ATLAS_%25','DBMDG_GROUP_NAME')
      .subscribe(res => {
          this.devgroupsList = res;
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.sort = this.sort;
          this.dataSource.filter = this.filter;
        },
        console.error
      );
      //this.dataSource.filter = this.route.snapshot.params['filter'];
  }

  ngOnDestroy() {
    this.devgroupsListSubs.unsubscribe();
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
