import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LayerOptions } from '@helgoland/map';
import { circleMarker, geoJSON, LayerEvent } from 'leaflet';

import {
  HeavyMetalSamplesDialogComponent,
} from './components/feature-dialogs/heavy-metal-samples-dialog/heavy-metal-samples-dialog.component';
import {
  StreetCleaningDialogComponent,
} from './components/feature-dialogs/street-cleaning-dialog/street-cleaning-dialog.component';
import { HeavyMetalSamples } from './model/feature-properties/heavy-metal-samples';
import { tileLayer } from 'leaflet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public fitBounds: L.LatLngBoundsExpression = [[50.945, 13.566], [51.161, 13.910]];

  public overlayLeftMaps: Map<string, LayerOptions> = new Map<string, LayerOptions>();
  public overlayRightMaps: Map<string, LayerOptions> = new Map<string, LayerOptions>();

  public layerControlOptions: L.Control.LayersOptions = { position: 'bottomright' };

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
          const properties = ((event.layer as L.GeoJSON).feature as GeoJSON.Feature<GeoJSON.GeometryObject, HeavyMetalSamples>).properties;
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
          const properties = ((event.layer as L.GeoJSON)
            .feature as GeoJSON.Feature<GeoJSON.GeometryObject, GeoJSON.GeoJsonProperties>).properties;
          this.dialog.open(StreetCleaningDialogComponent, {
            data: properties,
            width: '500px'
          });
        });
        this.overlayLeftMaps.set('sc_geojson', { label: 'sc_geojson', visible: true, layer });
      });

    this.overlayRightMaps.set('warning-shapes-fine',
      {
        label: 'warning-shapes-fine',
        visible: false,
        layer: tileLayer.wms('https://geoserver.colabis.de/geoserver/ckan/wms?', {
          layers: 'ckan:_53fbae20_e2fb_4fd1_b5d6_c798e11b96d1',
          projection: 'EPSG:4326',
          format: 'image/png',
          transparent: true
        })
      }
    );
    this.overlayRightMaps.set('urban-atlas-2006-dresden',
      {
        label: 'urban-atlas-2006-dresden',
        visible: false,
        layer: tileLayer.wms('https://geoserver.colabis.de/geoserver/ckan/wms?', {
          layers: 'ckan:_7f1cce1a_62b3_49f3_ac3f_cf73ed1586fa',
          projection: 'EPSG:4326',
          transparent: true
        })
      }
    );
    this.overlayRightMaps.set('interpolated-emissions',
      {
        label: 'interpolated-emissions',
        visible: false,
        layer: tileLayer.wms('https://geoserver.colabis.de/geoserver/ckan/wms?', {
          layers: 'ckan:_8e2bef33_248f_42b5_bd50_0f474a54d11f',
          projection: 'EPSG:4326',
          transparent: true
        })
      },
    );
    this.overlayRightMaps.set('emission-simulation',
      {
        label: 'emission-simulation',
        visible: false,
        layer: tileLayer.wms('https://geoserver.colabis.de/geoserver/ckan/wms?', {
          layers: 'ckan:_9f064e17_799e_4261_8599_d3ee31b5392b',
          projection: 'EPSG:4326',
          transparent: true
        })
      }
    );
    this.overlayRightMaps.set('warning-shapes-coarse',
      {
        label: 'warning-shapes-coarse',
        visible: false,
        layer: tileLayer.wms('https://geoserver.colabis.de/geoserver/ckan/wms?', {
          layers: 'ckan:_b2fa0f61_6578_493d_815b_9bd8cfeb2313',
          projection: 'EPSG:4326',
          transparent: true
        })
      }
    );
    this.overlayRightMaps.set('Heavy Metal Samples',
      {
        label: 'Heavy Metal Samples',
        visible: false,
        layer: tileLayer.wms('https://geoserver.colabis.de/geoserver/ckan/wms?', {
          layers: 'ckan:_c8b2d332_2019_4311_a600_eefe94eb6b54',
          projection: 'EPSG:4326',
          transparent: true
        })
      }
    );
    this.overlayRightMaps.set('street-cleaning',
      {
        label: 'street-cleaning',
        visible: false,
        layer: tileLayer.wms('https://geoserver.colabis.de/geoserver/ckan/wms?', {
          layers: 'ckan:_d6bea91f_ac86_4990_a2d5_c603de92e22c',
          projection: 'EPSG:4326',
          transparent: true
        })
      }
    );
  }
}
