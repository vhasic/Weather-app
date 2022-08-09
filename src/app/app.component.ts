import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { WeatherData } from './models/weather.model';
import { WeatherService } from './services/weather.service';

// This is where component is defined
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private savedResponse?: WeatherData;
  cityName?: string;
  searchedCity: string = 'Sarajevo';
  weatherData?: WeatherData;

  constructor(private weatherService: WeatherService, private notifier: NotifierService) { }

  ngOnInit(): void {
    this.getWeatherData(this.searchedCity);
    this.cityName = this.searchedCity;
  }
  
  onSubmit(): void {
    this.getWeatherData(this.searchedCity);
  }

  private getWeatherData(city: string): void {
    this.weatherService.getWeatherData(city)
    .subscribe(
      (response) => {
        console.log(response);
        this.savedResponse = response;
      },
      (error) => {
        this.notifier.notify('error', error);
      },
      () => {
        this.cityName = this.searchedCity;
        this.weatherData=this.savedResponse;
        this.notifier.notify('success', 'Weather data successfully fetched');
      }
    );
  }
}
