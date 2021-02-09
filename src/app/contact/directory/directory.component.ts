import { Component, OnInit } from '@angular/core';

import { table } from '../tables/directory';
import { ContactService } from '../contact.service';
import { Globals } from 'src/app/globals';

@Component({
  selector: 't2-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.sass']
})

export class DirectoryComponent implements OnInit {
  redirectUrl: string = '/contacts/contact';
  page: string = 'Contacts Directory';
  table: any;
  getter: any;
  setter: any;
  deleter: any;

  constructor(
    private globals: Globals,
    private contactService: ContactService
  ) { }

  ngOnInit() {
    this.getter = this.contactService.getContacts;
    this.setter = this.contactService.updateContact;
    this.deleter = this.contactService.deleteContact;
    this.table = table(this.globals.user);
  }
}
