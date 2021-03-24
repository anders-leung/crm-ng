import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import JSONEditor from 'jsoneditor';
import { find, get, isEmpty, set } from 'lodash';

import { EditorService } from './editor.service';

import { Globals } from 'src/app/globals';
import { concatMap, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.sass']
})

export class EditorComponent implements OnInit {
  container: any;
  editor: JSONEditor;
  editorOptions: object = {};
  type: string;
  types: string[];
  name: string;
  names: any[];
  options: any[];

  constructor(
    public globals: Globals,
    private editorService: EditorService,
    private toastrService: ToastrService,
  ) { }

  ngOnInit() {
    this.globals.loading = true;
    this.globals.setupPage('Editor');
    this.container = document.getElementById('jsoneditor');
    this.editor = new JSONEditor(this.container, this.editorOptions);
    this.editorService.getOptions()
      .subscribe((options) => {
        this.updateOptions(options);
        this.globals.loading = false;
      });
  }

  updateOptions(options) {
    this.options = options;
    this.types = Object.keys(options);
  }

  updateType(value) {
    this.type = value;
    const data = this.options[value];
    if (data) {
      this.names = Object.values(data).map((d: any) => ({ label: d.name, value: d._id }));
    } else {
      this.names = [];
    }
  }

  updateName(value) {
    this.name = value;
    const { type } = this;
    const initialJson = find(this.options[type], (data) => data.name === value);
    if (initialJson) this.editor.set(initialJson);
  }

  setupEditor() {
    // set json
    const initialJson = {
      "Array": [1, 2, 3],
      "Boolean": true,
      "Null": null,
      "Number": 123,
      "Object": { "a": "b", "c": "d" },
      "String": "Hello World"
    }
    this.editor.set(initialJson)
  }

  save() {
    // get json
    const updatedJson = this.editor.get();
    const { type, name } = this;
    const data = { type, name, data: updatedJson };
    let error = false;
    if (isEmpty(updatedJson)) {
      error = true;
      this.toastrService.error("JSON cannot be empty");
    }
    if (!name) {
      error = true;
      this.toastrService.error('Name must be filled in');
    }

    if (error) return;

    // save the new json and grab new options
    this.editorService.create(data).pipe(
      concatMap((data) => this.editorService.getOptions())
    ).subscribe((updatedOptions) => {
      this.updateOptions(updatedOptions);
    });
  }
}
