import { Component } from '@angular/core';

import { CommonFeatureDialogComponent } from '../common-feature-dialog/common-feature-dialog.component';

@Component({
  selector: 'app-heavy-metal-samples-dialog',
  templateUrl: '../common-feature-dialog/common-feature-dialog.component.html',
  styleUrls: ['../common-feature-dialog/common-feature-dialog.component.scss']
})
export class HeavyMetalSamplesDialogComponent extends CommonFeatureDialogComponent {
  protected setTitle(): string {
    return 'Heavy Metal Sample';
  }
}
