import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '@helgoland/core';
import { Observable, timer } from 'rxjs';
import { concatMap, filter, take } from 'rxjs/operators';

interface WPSExecuteResponse {
  StatusInfo: {
    JobId: string;
    Output: string;
    Status: ExecuteStatus;
  };
}

interface WPSOutputs {
  Result: {
    JobID: string;
    Output: {
      ID: string;
      Reference: {
        _mimeType: string;
        _encoding: string;
        _href: string;
      };
    }[];
  };
}

enum ExecuteStatus {
  Succeeded = 'Succeeded',
  Running = 'Running'
}

@Injectable({
  providedIn: 'root'
})
export class WpsService {

  constructor(
    public httpService: HttpService
  ) { }

  public execute(url: string, body: any, headers: HttpHeaders, resultCb: (res: WPSExecuteResponse) => void) {
    this.httpService.client().post(url, body, { headers, observe: 'response' }).subscribe(postRes => {
      if (postRes.headers.has('location')) {
        const location = postRes.headers.get('location');
        timer(0, 500)
          .pipe(concatMap(() => this.httpService.client().get<WPSExecuteResponse>(location)))
          .pipe(filter(res => res.StatusInfo.Status === ExecuteStatus.Succeeded))
          .pipe(take(1))
          .subscribe(resultCb);
      }
    });
  }

  public handleWpsExecuteResponse(executeRes: WPSExecuteResponse): Observable<WPSOutputs> {
    return this.httpService.client().get<WPSOutputs>(executeRes.StatusInfo.Output);
  }

}
