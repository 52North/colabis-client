import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule, MatSlideToggleModule, MatTableModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpCache, LocalHttpCache, CachingInterceptor, OnGoingHttpCache, LocalOngoingHttpCache } from '@helgoland/caching';
import { HelgolandMapViewModule } from '@helgoland/map/view';

import { AppComponent } from './app.component';
import {
  EmissionSimulationDialogComponent,
} from './components/feature-dialogs/emission-simulation-dialog/emission-simulation.component';
import {
  HeavyMetalSamplesDialogComponent,
} from './components/feature-dialogs/heavy-metal-samples-dialog/heavy-metal-samples-dialog.component';
import {
  StreetCleaningDialogComponent,
} from './components/feature-dialogs/street-cleaning-dialog/street-cleaning-dialog.component';
import { WarningShapesDialogComponent } from './components/feature-dialogs/warning-shapes-dialog/warning-shapes.component';
import { SynchronizeMapBoundsComponent } from './components/synchronize-map-bounds/synchronize-map-bounds.component';

@NgModule({
  declarations: [
    AppComponent,
    EmissionSimulationDialogComponent,
    HeavyMetalSamplesDialogComponent,
    StreetCleaningDialogComponent,
    SynchronizeMapBoundsComponent,
    WarningShapesDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatTableModule,
    MatSlideToggleModule,
    HelgolandMapViewModule
  ],
  entryComponents: [
    EmissionSimulationDialogComponent,
    HeavyMetalSamplesDialogComponent,
    StreetCleaningDialogComponent,
    WarningShapesDialogComponent
  ],
  providers: [
    {
      provide: HttpCache,
      useClass: LocalHttpCache
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CachingInterceptor,
      multi: true
    },
    {
      provide: OnGoingHttpCache,
      useClass: LocalOngoingHttpCache
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
