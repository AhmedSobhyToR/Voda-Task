import { Injectable } from '@angular/core';
import { City } from '../Models/city';
import { CityForecastService } from './city-forecast.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitySearchService {
  private cities!: City[];
  private filteredCities!: City[];
  errorMessage!:string;
  searchedCity$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  
  constructor(private forecastService: CityForecastService) {}

  setCities(cities: City[]){
    this.cities = cities;
    this.filteredCities = this.cities;
  }

  searchCityById(cityId: string | number){
    this.filteredCities = this.cities;
    this.errorMessage = '';
    if(!this.validateNoLeadingZeroes(cityId)){
      this.errorMessage = "Invalid ID, Please don't add Zeroes at the beginning of ID";
      this.searchedCity$.next(true);
      return;
    }

    if(cityId){
      this.forecastService.getCityWeather(cityId).subscribe({
        next:(data) => {
          this.filteredCities = [data];
          this.searchedCity$.next(true);
        },
        error:(err) =>{
          this.errorMessage = "City Not Found, Please Write a Valid City ID!!";
          this.searchedCity$.next(true);
        }
      })
    }
    else{
      this.filteredCities = this.cities;
      this.searchedCity$.next(true);
    }

  }

  searchCityByName(cityName: string){
    this.filteredCities = this.cities;
    this.errorMessage = '';
    this.filteredCities = this.cities.filter(city => city.city.toLowerCase().includes(cityName.toLowerCase()));
    if(this.filteredCities.length === 0){
      this.errorMessage = "City Not Found, Please Write a Valid City Name!!";
    }

    this.searchedCity$.next(true);
  }

  searchCityByDate(date: Date | string){
    this.filteredCities = this.cities;
    this.errorMessage = '';
    if(date){
      this.filteredCities = this.cities.map((city)=> {
        return {
          ...city, forecast: city.forecast.filter(forecast => forecast.date === date)
        }
      })
    }

    this.searchedCity$.next(true);
  }

  validateNoLeadingZeroes(cityId: string | number): boolean{
    const regexLeadingZeroes = /^0[0-9]*$/;
    const cityIdStr = cityId.toString();
    return !regexLeadingZeroes.test(cityIdStr);
  }

  get getCities(){
    return this.cities;
  }

  get getFilteredCities(){
    return this.filteredCities;
  }

}
