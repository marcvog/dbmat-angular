import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {Message} from '../message';

import {GetApiService} from '../get-api.service';
import {DevGroupsApiService} from '../../accounts/dev-groups-api.service';
import {ContactName} from '../contact-name';
import {Developer} from '../../accounts/developer.model';
import {DevGroup} from '../../accounts/dev-group.model';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-manage-groups',
  templateUrl: './manage-groups.component.html',
  styleUrls: ['./manage-groups.component.css']
})
export class ManageGroupsComponent implements OnInit, OnDestroy {
  contactsListSubs!: Subscription;
  contactsList!: Developer[];
  allGroupsListSubs!: Subscription;
  allGroupsList!: DevGroup[];
  devgroupsListSubs!: Subscription;
  devgroupsList!: DevGroup[];
  developersListSubs!: Subscription;
  developersList!: Developer[];

  name: Message = {'message': ''};
  options = [{'action':'Enable', 'value':'1'}, {'action':'Disable', 'value':'0'}];
  items = [{'action':'Developer groups', 'value':'group'}, {'action':'Developer', 'value':'developer'}];
  dryrun = '1';
  table!: string;
  workflow = 'group';
  developer_id!: number;
  group_id!: number;

  displayedColumns_dev: string[] = ['select', 'DBMDEV_ID', 'CONTACT', 'DBMDEV_INS_DATE', 'DBMDEV_UPD_DATE', 'CONTACT_NAME', 'CONTACT_EMAIL'];
  displayedColumns_grp: string[] = ['select', 'DBMDG_ID', 'DBMDG_GROUP_NAME', 'DBMDG_GROUP_DESC', 'DBMDG_INS_DATE', 'DBMDG_UPD_DATE', 'DBMDEV_ID'];
  dataSource_dev! : MatTableDataSource<Developer>;
  dataSource_grp! : MatTableDataSource<DevGroup>;   
 
  getAllDevelopers='* FROM ATLAS_DBMON.DBMAT_DEVELOPERS ORDER BY CONTACT_NAME';

  getAllGroups='* FROM ATLAS_DBMON.DBMAT_DEV_GROUPS WHERE DBMDG_GROUP_NAME%20like%20%27ATLAS_%25%27 ORDER BY DBMDG_GROUP_NAME';

  getSelDevelopers = `DEV.* FROM ATLAS_DBMON.DBMAT_DEVELOPERS DEV, ATLAS_DBMON.DBMAT_DG2DEVS DG2DEV
                      WHERE DEV.DBMDEV_ID IN (SELECT UNIQUE DBMDEV_ID FROM ATLAS_DBMON.DBMAT_DG2DEVS)
                      AND DEV.DBMDEV_ID = DG2DEV.DBMDEV_ID AND DG2DEV.DBMDG_ID = `;

  getSelGroups = `DG.* FROM ATLAS_DBMON.DBMAT_DEV_GROUPS DG, ATLAS_DBMON.DBMAT_DG2DEVS DG2DEV
                  WHERE DG.DBMDG_ID IN (SELECT UNIQUE DBMDG_ID FROM ATLAS_DBMON.DBMAT_DG2DEVS)
                  AND DG.DBMDG_ID = DG2DEV.DBMDG_ID AND DG2DEV.DBMDEV_ID = `;


  selection_dev = new SelectionModel<Developer>(true, []);
  selection_grp = new SelectionModel<DevGroup>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllDevSelected() {
    const numSelected = this.selection_dev.selected.length;
    const numRows = this.dataSource_dev.data.length;
    return numSelected === numRows;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllGrpSelected() {
    const numSelected = this.selection_grp.selected.length;
    const numRows = this.dataSource_grp.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllDevRows() {
    if (this.isAllDevSelected()) {
      this.selection_dev.clear();
      return;
    }
    this.selection_dev.select(...this.dataSource_dev.data);
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllGrpRows() {
    if (this.isAllGrpSelected()) {
      this.selection_grp.clear();
      return;
    }
    this.selection_grp.select(...this.dataSource_grp.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabelDev(row?: Developer): string {
    if (!row) {
      return `${this.isAllDevSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection_dev.isSelected(row) ? 'deselect' : 'select'} row ${row.DBMDEV_ID + 1}`;
  }

  /** The label for the checkbox on the passed row */
  checkboxLabelGrp(row?: DevGroup): string {
    if (!row) {
      return `${this.isAllGrpSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection_grp.isSelected(row) ? 'deselect' : 'select'} row ${row.DBMDG_ID + 1}`;
  }


  constructor(private getApi: GetApiService, private devgroupsApi: DevGroupsApiService) {
  }

  ngOnInit() {
    this.contactsListSubs = this.getApi
      .get('DBMAT_DEVELOPERS', this.getAllDevelopers)
      .subscribe(res => {
          this.contactsList = res;
          this.developer_id = this.contactsList[0].DBMDEV_ID;
        },
        console.error
      );
    this.allGroupsListSubs = this.getApi
      .get('DBMAT_DEV_GROUPS', this.getAllGroups)
      .subscribe(res => {
          this.allGroupsList = res;
          this.group_id = this.allGroupsList[0].DBMDG_ID;
        },
        console.error
      ); 
  }
  ngOnDestroy() {
    this.contactsListSubs.unsubscribe();
    this.allGroupsListSubs.unsubscribe();
    this.developersListSubs.unsubscribe();
    this.devgroupsListSubs.unsubscribe();
  }

  getDevelopers () {
    this.selection_dev.clear();
    this.developersListSubs = this.getApi
      .get('DBMAT_DEVELOPERS', this.getSelDevelopers + this.group_id)
      .subscribe(res => {
          this.developersList = res;
          this.dataSource_dev = new MatTableDataSource(res);
          this.table = 'developers'
        },
        console.error
      );  
  }

  getGroups () {
    this.selection_grp.clear();
    this.devgroupsListSubs = this.getApi
      .get('DBMAT_DEV_GROUPS', this.getSelGroups + this.developer_id)
      .subscribe(res => {
          this.devgroupsList = res;
          this.dataSource_grp = new MatTableDataSource(res);
          this.table = 'groups'
        },
        console.error
      );
  }
}
