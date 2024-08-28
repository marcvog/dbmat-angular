import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {InsertApiService} from '../insert-api.service';
import {DeleteApiService} from '../delete-api.service';
import {GetApiService} from '../get-api.service';
import {Message} from '../message';
import {ContactName} from '../contact-name';
import {Developer} from '../../accounts/developer.model';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@Component({
  selector: 'app-manage-developers',
  templateUrl: './manage-developers.component.html',
  styleUrls: ['./manage-developers.component.css']
})
export class ManageDevelopersComponent implements OnInit, OnDestroy{
  contactsListSubs!: Subscription;
  contactsList!: Developer[];
  developerSub!: Subscription;
  nameSub!: Subscription;
  developer: Message = {'message': ''};
  name: Message = {'message': ''};
  options = [{'action':'Enable', 'value':'1'}, {'action':'Disable', 'value':'0'}];
  dryrun = '1';
  deleteMe!: string;
  query='* FROM ATLAS_DBMON.DBMAT_DEVELOPERS WHERE DBMDEV_ID NOT IN (SELECT UNIQUE DBMDEV_ID FROM ATLAS_DBMON.DBMAT_DG2DEVS) ORDER BY CONTACT_NAME';

  // Access the newItem input field
  //@ViewChild('newItem') fullNameInput: any;
  @ViewChild('contact') contactInput: any;

  constructor(private insertApi: InsertApiService, private deleteApi: DeleteApiService, private getApi: GetApiService) {
  }

  ngOnInit() {
    this.contactsListSubs = this.getApi
      .get('DBMAT_DEVELOPERS', this.query)
      .subscribe(res => {
          this.contactsList = res;
          this.deleteMe = this.contactsList[0].CONTACT;
        },
        console.error
      ); 
 }

  ngOnDestroy() {
    this.contactsListSubs.unsubscribe();
  }

  // Do some checks on the developer entry
  checkContact(name: string): string {
    const contact = name;
    return contact;
  }

  insertDeveloper(name: string, dryrun: string) {
    this.resetName();
    const contact = this.checkContact(name);
    if (contact != ''){
       if (dryrun == '1'){
          this.developerSub = this.insertApi
            .insertDeveloper(contact,dryrun)
            .subscribe(res => {
                this.developer = res;
                console.log('new contact', this.developer);
              },
              console.error
            );
       }
       if (dryrun == '0'){
          this.developerSub = this.insertApi
            .insertDeveloper(contact,dryrun)
            .subscribe(res => {
                this.developer = res;
                console.log('new contact', this.developer);
                this.ngOnInit();
              },
              console.error
            );
       }
    }
    else {
       this.developer = {'message': 'Invalid contact for insertion'}
    }
  }

  deleteDeveloper(name: string, dryrun: string) {
    this.resetDeveloper();
    if (name != ''){
       if (dryrun == '1'){
          this.nameSub = this.deleteApi
            .deleteDeveloper(name,'1')
            .subscribe(res => {
                this.name = res;
                console.log('contact_name', this.name);
              },
              console.error
            );
       }
       if (dryrun == '0'){
          this.nameSub = this.deleteApi
            .deleteDeveloper(name,'0')
            .subscribe(res => {
                this.name = res;
                console.log('contact_name', this.name);
                this.ngOnInit();
              },
              console.error
            );
       }
    }
    else {
       this.name = {'message': 'Invalid contact for deletion'}
    }
  }

  resetDeveloper(){
    this.developer = {'message': ''};
    this.dryrun = '1';
    // Clear the input field
    //this.fullNameInput.nativeElement.value = '';
    this.contactInput.nativeElement.value = '';
  }

  resetName(){
    this.name = {'message': ''};
    this.dryrun = '1';
  }

}
