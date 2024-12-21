import { Component } from '@angular/core';
import { CitySearchService } from '../../Services/city-search.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-city-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './city-search.component.html',
  styleUrl: './city-search.component.css'
})
export class CitySearchComponent {
  cityId!: string;
  cityName!: string;
  date!: Date | string;
  constructor(private citySearchService: CitySearchService){}
 
  searchCityById(){
    this.citySearchService.searchCityById(this.cityId);
    this.cityName = '';
    this.date = '';
  }

  searchCityByName(){
    this.citySearchService.searchCityByName(this.cityName);
    this.cityId = '';
    this.date = '';
  }

  searchCityByDate(e:Event){
    const x = (e.target) as HTMLInputElement
    this.date = x.value;
    this.citySearchService.searchCityByDate(this.date)
    this.cityId = '';
    this.cityName = '';
  }


}
