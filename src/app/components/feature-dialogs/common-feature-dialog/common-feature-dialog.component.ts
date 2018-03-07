import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

export interface Element {
  key: string;
  value: string;
}

@Component({
  selector: 'app-common-feature-dialog',
  templateUrl: './common-feature-dialog.component.html',
  styleUrls: ['./common-feature-dialog.component.scss']
})
export abstract class CommonFeatureDialogComponent implements OnInit {

  public title: string;
  public displayedColumns = ['key', 'value'];
  public dataSource: Element[] = [];

  constructor(
    public dialogRef: MatDialogRef<CommonFeatureDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  public ngOnInit() {
    for (const key in this.data) {
      if (this.data.hasOwnProperty(key)) {
        this.dataSource.push({ key, value: this.data[key] });
      }
    }
    this.title = this.setTitle();
  }

  public onOkClick() {
    this.dialogRef.close();
  }

  protected abstract setTitle(): string;
}
