import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LayerOptions } from '@helgoland/map';
import { Feature, FeatureCollection, GeoJsonProperties, GeometryObject } from 'geojson';
import { circleMarker, geoJSON, LayerEvent } from 'leaflet';

import {
  HeavyMetalSamplesDialogComponent,
} from './components/feature-dialogs/heavy-metal-samples-dialog/heavy-metal-samples-dialog.component';
import {
  StreetCleaningDialogComponent,
} from './components/feature-dialogs/street-cleaning-dialog/street-cleaning-dialog.component';
import { HeavyMetalSamples } from './model/feature-properties/heavy-metal-samples';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public fitBounds: L.LatLngBoundsExpression = [[50.945, 13.566], [51.161, 13.910]];

  public overlayLeftMaps: Map<string, LayerOptions> = new Map<string, LayerOptions>();
  public overlayRightMaps: Map<string, LayerOptions> = new Map<string, LayerOptions>();

  private hmsUrl = 'http://colabis.dev.52north.org/geocure/services/colabis-geoserver/features/'
    + '_c8b2d332_2019_4311_a600_eefe94eb6b54/data';

  private scUrl = 'http://colabis.dev.52north.org/geocure/services/colabis-geoserver/features/'
    + '_d6bea91f_ac86_4990_a2d5_c603de92e22c/data';

  private pointStyle: L.CircleMarkerOptions = {
    color: 'red',
    weight: 3,
    radius: 5,
    opacity: 1
  };

  private polygonStyle: L.PathOptions = {
    color: 'blue',
    weight: 3,
    opacity: 1
  };

  constructor(
    private httpClient: HttpClient,
    private dialog: MatDialog
  ) { }

  public ngOnInit(): void {
    this.httpClient
      .get<GeoJSON.FeatureCollection<GeoJSON.GeometryObject>>(this.hmsUrl)
      .subscribe((geojson) => {
        const layer = geoJSON<GeoJSON.FeatureCollection<GeoJSON.GeometryObject>>(geojson, {
          pointToLayer: (feature, latlng) => {
            return circleMarker(latlng, this.pointStyle);
          }
        }).on('click', (event: LayerEvent) => {
          const properties = ((event.layer as L.GeoJSON).feature as Feature<GeometryObject, HeavyMetalSamples>).properties;
          this.dialog.open(HeavyMetalSamplesDialogComponent, {
            data: properties,
            width: '500px'
          });
        });
        this.overlayLeftMaps.set('hms_geojson', { label: 'hms_geojson', visible: true, layer });
      });

    this.httpClient
      .get<GeoJSON.FeatureCollection<GeoJSON.GeometryObject>>(this.scUrl)
      .subscribe((geojson) => {
        const layer = geoJSON(geojson, {
          style: (feature) => this.polygonStyle
        }).on('click', (event: LayerEvent) => {
          const properties = ((event.layer as L.GeoJSON).feature as Feature<GeometryObject, GeoJsonProperties>).properties;
          this.dialog.open(StreetCleaningDialogComponent, {
            data: properties,
            width: '500px'
          });
        });
        this.overlayLeftMaps.set('sc_geojson', { label: 'sc_geojson', visible: true, layer });
      });
  }

}
