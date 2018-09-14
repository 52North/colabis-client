import { TestBed, inject } from '@angular/core/testing';

import { WpsDataAccessorService } from './wps-data-accessor.service';

describe('WpsDataAccessorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WpsDataAccessorService]
    });
  });

  it('should be created', inject([WpsDataAccessorService], (service: WpsDataAccessorService) => {
    expect(service).toBeTruthy();
  }));
});
