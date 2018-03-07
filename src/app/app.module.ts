import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule, MatTableModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HelgolandMapViewModule } from '@helgoland/map/view';

import { AppComponent } from './app.component';
import {
  HeavyMetalSamplesDialogComponent,
} from './components/feature-dialogs/heavy-metal-samples-dialog/heavy-metal-samples-dialog.component';
import {
  StreetCleaningDialogComponent,
} from './components/feature-dialogs/street-cleaning-dialog/street-cleaning-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeavyMetalSamplesDialogComponent,
    StreetCleaningDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatTableModule,
    HelgolandMapViewModule
  ],
  entryComponents: [
    HeavyMetalSamplesDialogComponent,
    StreetCleaningDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
