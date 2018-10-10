import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '@helgoland/core';
import { Observable, Observer } from 'rxjs';

import { WpsService } from './wps.service';

export interface MinMaxEntry {
  name: string;
  x: number;
  y: number;
  phenomenon: string;
  min: number;
  max: number;
}

export interface MinMaxResult {
  demo_data: boolean;
  data: MinMaxEntry[];
}

export interface DataEntry {
  time: Date;
  value: number;
}

export interface SingleNodeResult {
  name: string;
  x: number;
  y: number;
  phenomenon: string;
  demo_data: boolean;
  data: DataEntry[];
}

const WPS_URL = 'http://geoprocessing.demo.52north.org:8080/swmm-rest/processes/org.n52.wps.server.r.COLABIS_WPS2_Auslesen/jobs';

@Injectable({
  providedIn: 'root'
})
export class WpsDataAccessorService {

  constructor(
    public httpService: HttpService,
    public wps: WpsService
  ) { }

  public getMinMaxValues(): Observable<MinMaxResult> {
    const body = {
      'Execute': {
        'Identifier': 'org.n52.wps.server.r.COLABIS_WPS2_Auslesen',
        'Input': [{
          'LiteralData': {
            '_text': '36Q173'
          },
          '_id': 'name'
        },
        {
          'LiteralData': {
            '_text': 'MinMax'
          },
          '_id': 'method'
        },
        {
          'LiteralData': {
            '_text': 'pb'
          },
          '_id': 'pollutant'
        }
        ],
        'output': [{
          '_mimeType': 'text/plain',
          '_id': 'result',
          '_transmission': 'reference'
        }],
        '_service': 'WPS',
        '_version': '2.0.0'
      }
    };
    const headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    return new Observable<MinMaxResult>((observer: Observer<MinMaxResult>) => {
      this.wps.execute(
        WPS_URL,
        body,
        headers,
        (executeRes) => {
          this.wps.handleWpsExecuteResponse(executeRes).subscribe(result => {
            this.httpService.client().get(result.Result.Output[0].Reference._href).subscribe((res: any) => {
              res['data'].forEach((entry: any) => {
                entry.x = parseFloat(entry.x);
                entry.y = parseFloat(entry.y);
              });
              observer.next(res);
              observer.complete();
            });
          });
        }
      );
    });
  }

  public getTimeLine(node: string): Observable<SingleNodeResult> {
    node = node.replace('node', '');
    const body = {
      'Execute': {
        'Identifier': 'org.n52.wps.server.r.COLABIS_WPS2_Auslesen',
        'Input': [{
          'LiteralData': {
            '_text': node
          },
          '_id': 'name'
        },
        {
          'LiteralData': {
            '_text': 'SingleNode'
          },
          '_id': 'method'
        },
        {
          'LiteralData': {
            '_text': 'pb'
          },
          '_id': 'pollutant'
        }
        ],
        'output': [{
          '_mimeType': 'text/plain',
          '_id': 'result',
          '_transmission': 'reference'
        }],
        '_service': 'WPS',
        '_version': '2.0.0'
      }
    };
    const headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    return new Observable<SingleNodeResult>((observer: Observer<SingleNodeResult>) => {
      this.wps.execute(
        WPS_URL,
        body,
        headers,
        (executeRes) => {
          this.wps.handleWpsExecuteResponse(executeRes).subscribe((result) => {
            this.httpService.client().get(result.Result.Output[0].Reference._href).subscribe((res: any) => {
              res.x = parseFloat(res.x);
              res.y = parseFloat(res.y);
              res['data'].forEach((entry: any) => {
                entry.time = new Date(entry.time);
              });
              observer.next(res);
              observer.complete();
            });
          });
        }
      );
    });
  }

}
