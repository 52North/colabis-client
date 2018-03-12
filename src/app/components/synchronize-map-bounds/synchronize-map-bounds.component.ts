import { AfterViewInit, Component, Input } from '@angular/core';
import { MapCache } from '@helgoland/map';

require('leaflet.sync');
declare module 'leaflet' {
  interface Map {
    sync(map: Map): void;
    unsync(map: Map): void;
  }
}

@Component({
  selector: 'app-synchronize-map-bounds',
  templateUrl: './synchronize-map-bounds.component.html',
  styleUrls: ['./synchronize-map-bounds.component.scss']
})
export class SynchronizeMapBoundsComponent implements AfterViewInit {

  @Input()
  public mapIds: string[] = [];

  @Input()
  public activated: boolean;

  constructor(
    protected mapCache: MapCache
  ) { }

  public ngAfterViewInit(): void {
    if (this.activated) {
      this.activateSync();
    }
  }

  public toggleSync(toggled: boolean) {
    if (toggled) {
      this.activateSync();
    } else {
      this.deactivateSync();
    }
  }

  public activateSync() {
    this.mapIds.forEach(id => {
      this.mapIds.forEach(id2 => {
        if (id !== id2) {
          this.mapCache.getMap(id).sync(this.mapCache.getMap(id2));
        }
      });
    });
  }

  public deactivateSync() {
    this.mapIds.forEach(id => {
      this.mapIds.forEach(id2 => {
        if (id !== id2) {
          this.mapCache.getMap(id).unsync(this.mapCache.getMap(id2));
        }
      });
    });
  }
}
