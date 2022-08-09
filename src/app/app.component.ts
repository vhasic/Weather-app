import { Component, OnInit } from '@angular/core';
import { WeatherData } from './models/weather.model';
import { WeatherService } from './services/weather.service';

// This is where component is defined
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  cityName: string = 'Sarajevo';
  weatherData?: WeatherData;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.getWeatherData(this.cityName);
  }
  
  onSubmit(): void {
    this.getWeatherData(this.cityName);
  }

  private getWeatherData(city: string): void {
    this.weatherService.getWeatherData(city)
    .subscribe({
      next: (response) => {
        this.weatherData=response;
        console.log(response);
      }
    });
  }
}
