import { Component, Input, OnInit } from '@angular/core';
import { City } from '../../Models/city';
import { CitySearchService } from '../../Services/city-search.service';

@Component({
  selector: 'app-city',
  standalone: true,
  imports: [],
  templateUrl: './city.component.html',
  styleUrl: './city.component.css'
})
export class CityComponent implements OnInit{
  @Input({required:true})cityData!: City;
  @Input() unitTemperature!: boolean;

  startDate!: string | Date;
  endDate !: string | Date;

  constructor(private citySearchService: CitySearchService){}

  ngOnInit(): void {
    this.citySearchService.getCities.map(city=>{
      this.startDate =  city.forecast[0].date;
      this.endDate = city.forecast[city.forecast.length-1].date;
    })
  }



}
