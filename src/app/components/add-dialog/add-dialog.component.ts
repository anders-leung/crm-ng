import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'add-dialog',
  templateUrl: './add-dialog.component.html',
})

export class AddDialogComponent {
  row: any;
  config: any;

  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    const { row, config } = this.data;
    this.row = row;
    this.config = config;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
