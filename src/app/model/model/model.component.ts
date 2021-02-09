import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

import { Globals } from '../../globals';

import { config } from './config';
import { ModelService } from '../model.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.sass']
})

export class ModelComponent implements OnInit {
  loading: boolean = true;
  page: string = 'Client Sheet';
  id: string;
  model: any = {};
  saving: boolean = false;

  constructor(
    private modelService: ModelService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private globals: Globals,
  ) { }

  ngOnInit() {
    if (this.globals.setupPage(this.page)) return;
    this.model = {
      name: 'String',
    };
    this.loading = false;
  }

  save(redirect = false) {
    this.saving = true;
  }

}
