import { Injectable } from '@angular/core';
import { HttpService } from '@helgoland/core';
import { Observable } from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class WpsDataAccessorService {

  constructor(
    public httpService: HttpService
  ) { }

  public getMinMaxValues(): Observable<MinMaxResult> {
    // tslint:disable-next-line:max-line-length
    const url = 'http://geoprocessing.demo.52north.org:8080/swmm-wps/RetrieveResultServlet?id=3a4cb7c7-42e2-4bbf-b652-5d38b111c379result.c8bfaa4e-0aad-48b7-96d8-9f7bd59f26c5';
    // TODO implement post request:
    // {
    //   "Execute": {
    //     "Identifier": "org.n52.wps.server.r.COLABIS_WPS2_Auslesen",
    //     "Input": [{
    //         "LiteralData": {
    //           "_text": "36Q173"
    //         },
    //         "_id": "name"
    //       },
    //       {
    //         "LiteralData": {
    //           "_text": "MinMax"
    //         },
    //         "_id": "method"
    //       },
    //       {
    //         "LiteralData": {
    //           "_text": "pb"
    //         },
    //         "_id": "pollutant"
    //       }
    //     ],
    //     "output": [{
    //       "_mimeType": "text/plain",
    //       "_id": "result",
    //       "_transmission": "reference"
    //     }],
    //     "_service": "WPS",
    //     "_version": "2.0.0"
    //   }
    // }
    return this.httpService.client().get(url).map((res: any) => {
      res['data'].forEach((entry: any) => {
        entry.x = parseFloat(entry.x);
        entry.y = parseFloat(entry.y);
      });
      return res as MinMaxResult;
    });
  }

  public getTimeLine(node: string): Observable<SingleNodeResult> {
    // tslint:disable-next-line:max-line-length
    const url = 'http://geoprocessing.demo.52north.org:8080/swmm-wps/RetrieveResultServlet?id=84ebd31c-0b97-41f0-be0a-39342ddb03b5result.175b451b-79d8-451b-9ffa-1e105466b6ee';
    // TODO implement post request:
    // {
    //   "Execute": {
    //     "Identifier": "org.n52.wps.server.r.COLABIS_WPS2_Auslesen",
    //     "Input": [{
    //         "LiteralData": {
    //           "_text": "36Q173"
    //         },
    //         "_id": "name"
    //       },
    //       {
    //         "LiteralData": {
    //           "_text": "SingleNode"
    //         },
    //         "_id": "method"
    //       },
    //       {
    //         "LiteralData": {
    //           "_text": "pb"
    //         },
    //         "_id": "pollutant"
    //       }
    //     ],
    //     "output": [{
    //       "_mimeType": "text/plain",
    //       "_id": "result",
    //       "_transmission": "reference"
    //     }],
    //     "_service": "WPS",
    //     "_version": "2.0.0"
    //   }
    // }
    return this.httpService.client().get(url).map((res: any) => {
      res.x = parseFloat(res.x);
      res.y = parseFloat(res.y);
      res['data'].forEach((entry: any) => {
        entry.time = new Date(entry.time);
      });
      return res as SingleNodeResult;
    });
  }

}
