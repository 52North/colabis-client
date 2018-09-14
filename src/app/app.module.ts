import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule, MatSlideToggleModule, MatTableModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatasetApiInterface, SplittedDataDatasetApiInterface } from '@helgoland/core';
import { HelgolandD3Module } from '@helgoland/d3';
import { HelgolandMapViewModule } from '@helgoland/map';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

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
import { NodesTimelineComponent } from './components/nodes-timeline/nodes-timeline.component';
import { SynchronizeMapBoundsComponent } from './components/synchronize-map-bounds/synchronize-map-bounds.component';
import { WpsDataAccessorService } from './services/wps-data-accessor.service';

@NgModule({
  declarations: [
    AppComponent,
    EmissionSimulationDialogComponent,
    HeavyMetalSamplesDialogComponent,
    StreetCleaningDialogComponent,
    SynchronizeMapBoundsComponent,
    WarningShapesDialogComponent,
    NodesTimelineComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatToolbarModule,
    MatTableModule,
    MatSlideToggleModule,
    HelgolandMapViewModule,
    HelgolandD3Module,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json'),
        deps: [HttpClient]
      }
    })
  ],
  entryComponents: [
    EmissionSimulationDialogComponent,
    HeavyMetalSamplesDialogComponent,
    StreetCleaningDialogComponent,
    WarningShapesDialogComponent
  ],
  providers: [
    WpsDataAccessorService,
    {
      provide: DatasetApiInterface,
      useClass: SplittedDataDatasetApiInterface
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
