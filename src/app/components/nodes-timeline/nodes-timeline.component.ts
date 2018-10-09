import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DatasetOptions, Timespan } from '@helgoland/core';
import { AdditionalData, D3PlotOptions } from '@helgoland/d3';
import {
  AdditionalDataEntry,
} from '@helgoland/d3/lib/extended-data-d3-timeseries-graph/extended-data-d3-timeseries-graph.component';

import { WpsDataAccessorService } from '../../services/wps-data-accessor.service';

@Component({
  selector: 'app-nodes-timeline',
  templateUrl: './nodes-timeline.component.html',
  styleUrls: ['./nodes-timeline.component.scss']
})
export class NodesTimelineComponent implements OnChanges {

  @Input()
  public nodeName: string;

  public additionalData: AdditionalData[];
  public timespan: Timespan;
  public loading: boolean;

  public graphOptions: D3PlotOptions = {
    showTimeLabel: false
  };

  constructor(
    private wpsData: WpsDataAccessorService
  ) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.nodeName) {
      this.createTimeline();
    }
  }

  public timespanChanged(timespan: Timespan) {
    this.timespan = timespan;
  }

  private createTimeline() {
    if (this.nodeName) {
      this.loading = true;
      this.wpsData.getTimeLine(this.nodeName).subscribe(timeline => {
        if (timeline.data.length > 0) {
          const end = timeline.data[timeline.data.length - 1].time.getTime();
          const start = timeline.data[0].time.getTime();
          this.timespan = new Timespan(start, end);
        }
        const data: AdditionalDataEntry[] = [];
        timeline.data.forEach(e => data.push({ timestamp: e.time.getTime(), value: e.value }));
        const datasetOption = new DatasetOptions(this.nodeName, 'red');
        datasetOption.pointRadius = 3;
        this.additionalData = [
          {
            yaxisLabel: this.nodeName,
            datasetOptions: datasetOption,
            data
          }
        ];
        this.loading = false;
      });
    }
  }
}
