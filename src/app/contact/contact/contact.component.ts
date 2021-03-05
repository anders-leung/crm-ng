import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Globals } from '../../globals';

import { config } from './config';
import { ContactService } from '../contact.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass']
})

export class ContactComponent implements OnInit {
  loading: boolean = true;
  page: string = 'Contact Page';
  id: string;
  config: any;
  contact: any = {};

  saving: boolean = false;

  constructor(
    private contactService: ContactService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    public globals: Globals,
  ) {
    if (this.globals.setupPage(this.page)) return;

    this.id = this.route.snapshot.paramMap.get("id");    
    this.contactService.getOptions()
      .subscribe((options) => {
        this.config = config(options);
        this.contactService.getContact(this.id)
          .subscribe((contact) => {
            if (this.id) this.globals.page += ' - ' + contact.name;
            else this.globals.page += ' - New Contact';
            this.contact = contact;
            this.loading = false;
          });
      });
  }

  ngOnInit() { }

  save() {
    this.saving = true;
    this.contactService.saveContact(this.contact)
      .subscribe((response) => {
        // this.toastr.success('Contact saved!');
        const { _id } = response;
        this.saving = false;
        this.router.navigate([`/contacts/contact/${_id}`]);
      // }, (err) => {
      //   this.toastr.error('Failed to save contact!');
      });
  }

}
