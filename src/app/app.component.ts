import { ComponentType } from '@angular/cdk/portal';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { GeoCureGeoJSON, GeoCureGeoJSONOptions, LayerOptions } from '@helgoland/map';
import { circleMarker, LayerEvent, tileLayer } from 'leaflet';

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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public leftMap = 'left-map';
  public rightMap = 'right-map';

  public fitBounds: L.LatLngBoundsExpression = [[50.945, 13.566], [51.161, 13.910]];

  public overlayLeftMaps: Map<string, LayerOptions> = new Map<string, LayerOptions>();
  public overlayRightMaps: Map<string, LayerOptions> = new Map<string, LayerOptions>();

  public layerControlOptions: L.Control.LayersOptions = { position: 'bottomright' };

  private hmsUrl = 'http://colabis.dev.52north.org/geocure/services/colabis-geoserver/features/'
    + '_c8b2d332_2019_4311_a600_eefe94eb6b54/data';

  private scUrl = 'http://colabis.dev.52north.org/geocure/services/colabis-geoserver/features/'
    + '_d6bea91f_ac86_4990_a2d5_c603de92e22c/data';

  private emissionSimulationUrl = 'http://colabis.dev.52north.org/geocure/services/colabis-geoserver/features/'
    + '_9f064e17_799e_4261_8599_d3ee31b5392b/data';

  private uadUrl = 'http://colabis.dev.52north.org/geocure/services/colabis-geoserver/features/'
    + '_7f1cce1a_62b3_49f3_ac3f_cf73ed1586fa/data';

  private wscUrl = 'http://colabis.dev.52north.org/geocure/services/colabis-geoserver/features/'
    + '_b2fa0f61_6578_493d_815b_9bd8cfeb2313/data';

  private wsfUrl = 'http://colabis.dev.52north.org/geocure/services/colabis-geoserver/features/'
    + '_53fbae20_e2fb_4fd1_b5d6_c798e11b96d1/data';

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
    this.addEsGeoCure();
    this.addScGeoCure();
    this.addHmsGeoCure();
    // this.addUadGeoCure();
    this.addWscGeoCure();
    this.addWsfGeoCure();
    this.addWmsLayer();
  }

  private addWmsLayer() {
    this.overlayRightMaps.set('warning-shapes-fine', {
      label: 'warning-shapes-fine',
      visible: false,
      layer: tileLayer.wms('https://geoserver.colabis.de/geoserver/ckan/wms?', {
        layers: 'ckan:_53fbae20_e2fb_4fd1_b5d6_c798e11b96d1',
        projection: 'EPSG:4326',
        format: 'image/png',
        transparent: true
      })
    });
    this.overlayRightMaps.set('urban-atlas-2006-dresden', {
      label: 'urban-atlas-2006-dresden',
      visible: false,
      layer: tileLayer.wms('https://geoserver.colabis.de/geoserver/ckan/wms?', {
        layers: 'ckan:_7f1cce1a_62b3_49f3_ac3f_cf73ed1586fa',
        projection: 'EPSG:4326',
        transparent: true
      })
    });
    this.overlayRightMaps.set('interpolated-emissions', {
      label: 'interpolated-emissions',
      visible: false,
      layer: tileLayer.wms('https://geoserver.colabis.de/geoserver/ckan/wms?', {
        layers: 'ckan:_8e2bef33_248f_42b5_bd50_0f474a54d11f',
        projection: 'EPSG:4326',
        transparent: true
      })
    });
    this.overlayRightMaps.set('emission-simulation', {
      label: 'emission-simulation',
      visible: false,
      layer: tileLayer.wms('https://geoserver.colabis.de/geoserver/ckan/wms?', {
        layers: 'ckan:_9f064e17_799e_4261_8599_d3ee31b5392b',
        projection: 'EPSG:4326',
        transparent: true
      })
    });
    this.overlayRightMaps.set('warning-shapes-coarse', {
      label: 'warning-shapes-coarse',
      visible: false,
      layer: tileLayer.wms('https://geoserver.colabis.de/geoserver/ckan/wms?', {
        layers: 'ckan:_b2fa0f61_6578_493d_815b_9bd8cfeb2313',
        projection: 'EPSG:4326',
        transparent: true
      })
    });
    this.overlayRightMaps.set('Heavy Metal Samples', {
      label: 'Heavy Metal Samples',
      visible: false,
      layer: tileLayer.wms('https://geoserver.colabis.de/geoserver/ckan/wms?', {
        layers: 'ckan:_c8b2d332_2019_4311_a600_eefe94eb6b54',
        projection: 'EPSG:4326',
        transparent: true
      })
    });
    this.overlayRightMaps.set('street-cleaning', {
      label: 'street-cleaning',
      visible: false,
      layer: tileLayer.wms('https://geoserver.colabis.de/geoserver/ckan/wms?', {
        layers: 'ckan:_d6bea91f_ac86_4990_a2d5_c603de92e22c',
        projection: 'EPSG:4326',
        transparent: true
      })
    });
  }

  private addEsGeoCure() {
    const options: GeoCureGeoJSONOptions = {
      url: this.emissionSimulationUrl,
      httpClient: this.httpClient,
      showOnMinZoom: 14,
      pointToLayer: (feature, latlng) => {
        const props = feature.properties;
        const obs: number = props['observations.gesamt_mg_m2'];
        return circleMarker(latlng, {
          color: this.getObsColor(obs),
          weight: 2,
          radius: 4,
          opacity: 1,
          fillOpacity: 1
        });
      },
    };
    const layer = new GeoCureGeoJSON(options);
    layer.on('click', (event: LayerEvent) => this.featureClick(event, EmissionSimulationDialogComponent));
    this.overlayLeftMaps.set('es', { label: 'Emission Simulation', visible: true, layer });
  }

  private addScGeoCure() {
    const options: GeoCureGeoJSONOptions = {
      url: this.scUrl,
      httpClient: this.httpClient,
      showOnMinZoom: 12,
      style: (feature) => this.polygonStyle
    };
    const layer = new GeoCureGeoJSON(options);
    layer.on('click', (event: LayerEvent) => this.featureClick(event, StreetCleaningDialogComponent));
    this.overlayLeftMaps.set('sc', { label: 'Street Cleaning', visible: false, layer });
  }

  private addHmsGeoCure() {
    const options: GeoCureGeoJSONOptions = {
      url: this.hmsUrl,
      httpClient: this.httpClient,
      showOnMinZoom: 5,
      pointToLayer: (feature, latlng) => {
        return circleMarker(latlng, this.pointStyle);
      },
    };
    const layer = new GeoCureGeoJSON(options);
    layer.on('click', (event: LayerEvent) => this.featureClick(event, HeavyMetalSamplesDialogComponent));
    this.overlayLeftMaps.set('hms', { label: 'Heavy Metal Samples', visible: false, layer });
  }

  private addUadGeoCure() {
    const options: GeoCureGeoJSONOptions = {
      url: this.uadUrl,
      httpClient: this.httpClient,
      showOnMinZoom: 18,
    };
    const layer = new GeoCureGeoJSON(options);
    layer.on('click', (event: LayerEvent) => this.featureClick(event, HeavyMetalSamplesDialogComponent));
    this.overlayLeftMaps.set('uad', { label: 'Urban Atlas 2006 Dresden', visible: false, layer });
  }

  private addWscGeoCure() {
    const options: GeoCureGeoJSONOptions = {
      url: this.wscUrl,
      httpClient: this.httpClient,
      showOnMinZoom: 10,
    };
    const layer = new GeoCureGeoJSON(options);
    layer.on('click', (event: LayerEvent) => this.featureClick(event, WarningShapesDialogComponent));
    this.overlayLeftMaps.set('wsc', { label: 'Warning Shapes Coarse', visible: false, layer });
  }

  private addWsfGeoCure() {
    const options: GeoCureGeoJSONOptions = {
      url: this.wsfUrl,
      httpClient: this.httpClient,
      showOnMinZoom: 6,
      style: (feature) => {
        const props = feature.properties;
        const height: number = props['max_height'];
        return {
          color: 'black',
          fillColor: this.getHeightColor(height),
          weight: 1,
          opacity: 1,
          fillOpacity: 1
        };
      }
    };
    const layer = new GeoCureGeoJSON(options);
    layer.on('click', (event: LayerEvent) => this.featureClick(event, WarningShapesDialogComponent));
    this.overlayLeftMaps.set('wsf', { label: 'Warning Shapes Fine', visible: false, layer });
  }

  private getHeightColor(height: number): string {
    switch (height) {
      case 200:
        return '#9FDF00';
      case 400:
        return '#A6BF00';
      case 600:
        return '#AC9F00';
      case 800:
        return '#B27F00';
      case 1000:
        return '#B95F00';
      case 1500:
        return '#BF3F00';
      case 2000:
        return '#FF0000';
      case 2500:
      case 3000:
        return '#A10EE8';
      default:
        return '#0000FF';
    }
  }

  private getObsColor(obs: number): string {
    const color1 = 'FF0000';
    const color2 = '00FF00';
    const ratio = obs / 60;
    const hex = function (x: number) {
      const v = x.toString(16);
      return (v.length === 1) ? '0' + v : v;
    };
    const r = Math.ceil(parseInt(color1.substring(0, 2), 16) * ratio + parseInt(color2.substring(0, 2), 16) * (1 - ratio));
    const g = Math.ceil(parseInt(color1.substring(2, 4), 16) * ratio + parseInt(color2.substring(2, 4), 16) * (1 - ratio));
    const b = Math.ceil(parseInt(color1.substring(4, 6), 16) * ratio + parseInt(color2.substring(4, 6), 16) * (1 - ratio));
    return '#' + hex(r) + hex(g) + hex(b);
  }

  private featureClick<T>(event: LayerEvent, ct: ComponentType<T>) {
    const properties = ((event.layer as L.GeoJSON).feature as GeoJSON.Feature<GeoJSON.GeometryObject, any>).properties;
    this.dialog.open(ct, {
      data: properties,
      width: '500px'
    });
  }
}
