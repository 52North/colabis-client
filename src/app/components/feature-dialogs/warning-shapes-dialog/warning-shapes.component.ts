import { Component } from '@angular/core';

import { CommonFeatureDialogComponent } from '../common-feature-dialog/common-feature-dialog.component';

@Component({
  selector: 'app-warning-shapes-dialog',
  templateUrl: '../common-feature-dialog/common-feature-dialog.component.html',
  styleUrls: ['../common-feature-dialog/common-feature-dialog.component.scss']
})
export class WarningShapesDialogComponent extends CommonFeatureDialogComponent {
  protected setTitle(): string {
    return 'Warning Shapes';
  }
}
