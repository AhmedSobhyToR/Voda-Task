import {  Component, OnInit } from '@angular/core';
import { City } from '../../Models/city';
import { CityComponent } from "../city/city.component";
import { CitySearchService } from '../../Services/city-search.service';
import { CityForecastService } from '../../Services/city-forecast.service';
import { UnitToggleComponent } from "../unit-toggle/unit-toggle.component";

@Component({
  selector: 'app-city-list',
  standalone: true,
  imports: [CityComponent, UnitToggleComponent],
  templateUrl: './city-list.component.html',
  styleUrl: './city-list.component.css'
})
export class CityListComponent implements OnInit{
  filteredCities!: City[];
  errorMessage!:string;
  unitTemperature!: boolean;

  constructor(private forecastService: CityForecastService,
    private citySearchService: CitySearchService,){}

  ngOnInit(): void {
    // There's another approach to retrieve data from BE by using resolvers and resolver guard
    // to make sure all data is retrieved before entering component while routing and show a loading spinner till then
      this.forecastService.getCitiesWeather().subscribe({
        next:(data) => {
          this.citySearchService.setCities(data);
          this.filteredCities =data;
        }
      })
      // using Subject to listen to changes happening in the other component(City Search)
      // (Observer design pattern)
      this.citySearchService.searchedCity$.subscribe({
        next:() => {
          this.filteredCities = this.citySearchService.getFilteredCities;
          this.errorMessage = this.citySearchService.errorMessage;
        }
      })
  }

  onToggle(unitTemperature: boolean){
    this.unitTemperature = unitTemperature;
  }

}
