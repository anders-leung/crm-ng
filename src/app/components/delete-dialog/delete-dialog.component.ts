import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'delete-dialog',
  templateUrl: './delete-dialog.component.html',
})

export class DeleteDialogComponent {
  title: string = 'Are you sure you want to delete this ';

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    const { job } = this.data;
    if (job) {
      this.title += 'job?';
    } else {
      this.title += 'client?';
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
