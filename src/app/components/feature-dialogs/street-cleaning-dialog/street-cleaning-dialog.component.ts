import { Component } from '@angular/core';

import { CommonFeatureDialogComponent } from '../common-feature-dialog/common-feature-dialog.component';

@Component({
  selector: 'app-street-cleaning-dialog',
  templateUrl: '../common-feature-dialog/common-feature-dialog.component.html',
  styleUrls: ['../common-feature-dialog/common-feature-dialog.component.scss']
})
export class StreetCleaningDialogComponent extends CommonFeatureDialogComponent {
  protected setTitle(): string {
    return 'Street Cleaning';
  }
}
