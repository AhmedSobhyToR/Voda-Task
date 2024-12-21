import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-unit-toggle',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './unit-toggle.component.html',
  styleUrl: './unit-toggle.component.css'
})
export class UnitToggleComponent {
  // true is C degree - false is F degree
  temperatureUnit:boolean = true;
  @Output() toggle = new EventEmitter<boolean>();
  
  onToggle(){
    this.toggle.emit(this.temperatureUnit);
  }
}
