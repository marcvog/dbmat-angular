import { Component, OnInit, OnDestroy, ViewChild, AfterContentInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Message} from '../message';

import {GetApiService} from '../get-api.service';
import {InsertApiService} from '../insert-api.service';
import {DeleteApiService} from '../delete-api.service';
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
  allDevelopersListSubs!: Subscription;
  allDevelopersList!: Developer[];
  allGroupsListSubs!: Subscription;
  allGroupsList!: DevGroup[];
  devgroupsListSubs!: Subscription;
  devgroupsList!: DevGroup[];
  developersListSubs!: Subscription;
  developersList!: Developer[];
  eligibleDevelopersListSubs!: Subscription;
  eligibleDevelopersList!: Developer[];
  eligibleGroupsListSubs!: Subscription;
  eligibleGroupsList!: DevGroup[];
  responseSub!: Subscription;
  response: Message = {'message': ''};
  itemsList!: any[];

  options = [{'action':'Enable', 'value':'1'}, {'action':'Disable', 'value':'0'}];
  items = [{'action':'Developer groups', 'value':'group'}, {'action':'Developer', 'value':'developer'}];
  dryrun = '1';
  workflow = 'group';
  developer_id!: number;
  group_id!: number;
  groupless_developer_id!: number;
  eligible_group_id!: number;

  displayedColumns_dev: string[] = ['select', 'DBMDEV_ID', 'CONTACT', 'DBMDEV_INS_DATE', 'DBMDEV_UPD_DATE', 'CONTACT_NAME', 'CONTACT_EMAIL'];
  displayedColumns_grp: string[] = ['select', 'DBMDG_ID', 'DBMDG_GROUP_NAME', 'DBMDG_GROUP_DESC', 'DBMDG_INS_DATE', 'DBMDG_UPD_DATE', 'DBMDEV_ID'];
  //dataSource_dev! : MatTableDataSource<Developer>;
  //dataSource_grp! : MatTableDataSource<DevGroup>;   
 
  getSelDevelopers = `DEV.* FROM ATLAS_DBMON.DBMAT_DEVELOPERS DEV, ATLAS_DBMON.DBMAT_DG2DEVS DG2DEV
                      WHERE DEV.DBMDEV_ID IN (SELECT UNIQUE DBMDEV_ID FROM ATLAS_DBMON.DBMAT_DG2DEVS)
                      AND DEV.DBMDEV_ID = DG2DEV.DBMDEV_ID AND DG2DEV.DBMDG_ID = `;

  getSelGroups = `DG.* FROM ATLAS_DBMON.DBMAT_DEV_GROUPS DG, ATLAS_DBMON.DBMAT_DG2DEVS DG2DEV
                  WHERE DG.DBMDG_ID IN (SELECT UNIQUE DBMDG_ID FROM ATLAS_DBMON.DBMAT_DG2DEVS)
                  AND DG.DBMDG_ID = DG2DEV.DBMDG_ID AND DG2DEV.DBMDEV_ID = `;

  selection_dev = new SelectionModel<Developer>(true, []);
  selection_grp = new SelectionModel<DevGroup>(true, []);

  dataSource_dev = new MatTableDataSource<Developer>();
  dataSource_grp = new MatTableDataSource<DevGroup>();

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


  constructor(private getApi: GetApiService, private insertApi: InsertApiService, private deleteApi: DeleteApiService) {
  }

  ngOnInit() {
    this.allDevelopersListSubs = this.getApi
      .getAllDevelopers()
      .subscribe(res => {
          this.allDevelopersList = res;
          this.developer_id = this.allDevelopersList[0].DBMDEV_ID;
          this.getSelectedGroups();
          this.getAllGroupsExcept();
        },
        console.error
      );
    this.allGroupsListSubs = this.getApi
      .getAllGroups()
      .subscribe(res => {
          this.allGroupsList = res;
          this.group_id = this.allGroupsList[0].DBMDG_ID;
          this.getSelectedDevelopers();
          this.getAllDevelopersExcept();
        },
        console.error
      );
  }

  ngOnDestroy() {
    this.allDevelopersListSubs.unsubscribe();
    this.allGroupsListSubs.unsubscribe();
    this.developersListSubs.unsubscribe();
    this.devgroupsListSubs.unsubscribe();
    this.eligibleDevelopersListSubs.unsubscribe();
    this.responseSub.unsubscribe();
  }

  getSelectedDevelopers () {
    this.selection_dev.clear();
    this.developersListSubs = this.getApi
      .get('DBMAT_DEVELOPERS', this.getSelDevelopers + this.group_id)
      .subscribe(res => {
          this.developersList = res;
          this.dataSource_dev.data = res;
        },
        console.error
      );  
  }

  getSelectedGroups () {
    this.selection_grp.clear();
    this.devgroupsListSubs = this.getApi
      .get('DBMAT_DEV_GROUPS', this.getSelGroups + this.developer_id)
      .subscribe(res => {
          this.devgroupsList = res;
          this.dataSource_grp.data = res;
        },
        console.error
      );
  }

  getAllDevelopersExcept() {
    this.eligibleDevelopersListSubs = this.getApi
      .getAllDevsNotInGroup(this.group_id)
      .subscribe(res => {
          this.eligibleDevelopersList = res;
          this.groupless_developer_id = this.eligibleDevelopersList[0].DBMDEV_ID;
        },
        console.error
      );
  }

  getAllGroupsExcept() {
    const query = "* FROM ATLAS_DBMON.DBMAT_DEV_GROUPS WHERE DBMDG_ID NOT IN (SELECT UNIQUE DBMDG_ID FROM ATLAS_DBMON.DBMAT_DG2DEVS WHERE DBMDEV_ID = "+String(this.developer_id)+") ORDER BY DBMDG_GROUP_NAME";
    this.eligibleGroupsListSubs = this.getApi
      .get('DBMAT_DEV_GROUPS', query)
      .subscribe(res => {
          this.eligibleGroupsList = res;
          this.eligible_group_id = this.eligibleGroupsList[0].DBMDG_ID;
        },
        console.error
      );
  }

  insertDeveloper(developer_id: number, group_id: number, dryrun: string) {

    let columns: Array<string> = ['DBMDEV_ID','DBMDG_ID'];
    let values: Array<string> = [String(developer_id),String(group_id)];
    let data = {'columns':columns,'values':values};
    const query = encodeURIComponent(JSON.stringify(data));

    if (developer_id != undefined && group_id != undefined){
       if (dryrun == '1'){
          this.responseSub = this.insertApi
            .insert('DBMAT_DG2DEVS',query,dryrun)
            .subscribe(res => {
                this.response = res;
                //console.log('query', query);
              },
              console.error
            );
       }
       if (dryrun == '0'){
          this.responseSub = this.insertApi
            .insert('DBMAT_DG2DEVS',query,dryrun)
            .subscribe(res => {
                this.response = res;
                //console.log('query', query);
                //this.ngOnInit();
                this.getAllDevelopersExcept();
                this.getSelectedDevelopers();
              },
              console.error
            );
       }
    }
    else {
       this.response = {'message': 'No items to insert'}
    }
  }


  insertGroup(developer_id: number, group_id: number, dryrun: string) {

    let columns: Array<string> = ['DBMDEV_ID','DBMDG_ID'];
    let values: Array<string> = [String(developer_id),String(group_id)];
    let data = {'columns':columns,'values':values};
    const query = encodeURIComponent(JSON.stringify(data));

    if (developer_id != undefined && group_id != undefined){
       if (dryrun == '1'){
          this.responseSub = this.insertApi
            .insert('DBMAT_DG2DEVS',query,dryrun)
            .subscribe(res => {
                this.response = res;
                //console.log('query', query);
              },
              console.error
            );
       }
       if (dryrun == '0'){
          this.responseSub = this.insertApi
            .insert('DBMAT_DG2DEVS',query,dryrun)
            .subscribe(res => {
                this.response = res;
                //console.log('query', query);
                //this.ngOnInit();
                this.getAllGroupsExcept();
                this.getSelectedGroups();
              },
              console.error
            );
       }
    }
    else {
       this.response = {'message': 'No items to insert'}
    }
  }

  delDevelopers (developers: Array<Developer>, dryrun: string) {    
    //this.reset();
    this.itemsList=developers.map(function(obj) { return obj.DBMDEV_ID; });
    //console.log('number of items in developers', this.itemsList.length);
    if (developers.length != 0){
       if (dryrun == '1'){
          this.responseSub = this.deleteApi
            .deleteDevelopersFromGroup('DBMAT_DG2DEVS',this.itemsList,this.group_id,'1')
            .subscribe(res => {
                this.response = res;
                console.log('Server response', this.response);
              },
              console.error
            );
       }
       if (dryrun == '0'){
          this.responseSub = this.deleteApi
            .deleteDevelopersFromGroup('DBMAT_DG2DEVS',this.itemsList,this.group_id,'0')
            .subscribe(res => {
                this.response = res;
                console.log('Server response', this.response);
                this.getSelectedDevelopers();
                this.getAllDevelopersExcept();
              },
              console.error
            );
       }
    }
    else {
       this.response = {'message': 'Empty list of selected developers'}
    }
  }

  delGroups (groups: Array<DevGroup>, dryrun: string) {
    //this.reset();
    this.itemsList=groups.map(function(obj) { return obj.DBMDG_ID; });
    //console.log('number of items in groups', this.itemsList.length);
    if (groups.length != 0){
       if (dryrun == '1'){
          this.responseSub = this.deleteApi
            .deleteGroupsFromDeveloper('DBMAT_DG2DEVS',this.itemsList,this.developer_id,'1')
            .subscribe(res => {
                this.response = res;
                console.log('Server response', this.response);
              },
              console.error
            );
       }
       if (dryrun == '0'){
          this.responseSub = this.deleteApi
            .deleteGroupsFromDeveloper('DBMAT_DG2DEVS',this.itemsList,this.developer_id,'0')
            .subscribe(res => {
                this.response = res;
                console.log('Server response', this.response);
                this.getSelectedGroups();
                this.getAllGroupsExcept();
              },
              console.error
            );
       }
    }
    else {
       this.response = {'message': 'Empty list of selected groups'}
    }
  }

  reset(){
    this.response = {'message': ''};
    this.dryrun = '1';
    //this.selection_dev.clear();
    this.selection_grp.clear();
  }

}
