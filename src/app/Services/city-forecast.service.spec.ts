import { TestBed } from '@angular/core/testing';

import { CityForecastService } from './city-forecast.service';

describe('CityForecastService', () => {
  let service: CityForecastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CityForecastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
