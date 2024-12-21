import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from '../Models/city';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../Environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CityForecastService {
  private backendUrl = enviroment.origin
  constructor(private httpClient: HttpClient) { }

  getCitiesWeather(): Observable<City[]>{
    return this.httpClient.get<City[]>(`${this.backendUrl}/forecast`)
  }

  getCityWeather(cityId: number | string): Observable<City>{
    return this.httpClient.get<City>(`${this.backendUrl}/cityForecast/${cityId}`)
  }
}
