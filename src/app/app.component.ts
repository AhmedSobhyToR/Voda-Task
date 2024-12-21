import { Component } from '@angular/core';
import { CitySearchComponent } from "./Components/city-search/city-search.component";
import { CityListComponent } from "./Components/city-list/city-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ CitySearchComponent, CityListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'VodaTask';
}
