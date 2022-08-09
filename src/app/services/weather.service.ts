import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WeatherData } from '../models/weather.model';


// To generate service from console:
// 1. cd src\app\services
// 2. ng g s weather (generates weather.service.ts)) 

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private httpClient: HttpClient) { }


  // getting data from API
  getWeatherData(city: string): Observable<WeatherData> {
    // environment variables are in src\environments\environment.ts
    // get<WeatherData> automatically converts the response to WeatherData model
    return this.httpClient.get<WeatherData>(environment.weatherApiBaseUrl, {
      // query parameters are in the url after the ?
      params: new HttpParams()
              .set('q',city)
              .set('APPID', environment.APIKey)
              .set('units', 'metric')
              .set('exclude','minutely,hourly,daily,alerts')
    });
  }

  /* // this API does exist any more
  getWeatherData(city: string): Observable<WeatherData> {
    // environment variables are in src\environments\environment.ts
    // get<WeatherData> automatically converts the response to WeatherData model
    return this.httpClient.get<WeatherData>(environment.weatherApiBaseUrl, {
      headers: new HttpHeaders()
              .set(environment.XRapidApiHostHeaderName, environment.XRapidApiHostHeaderValue)
              .set(environment.XRapidApiKeyHeaderName, environment.XRapidApiKeyHeaderValue),
      // query parameters are in the url after the ?
      params: new HttpParams()
              .set('q', city)
              .set('units', 'metric')
              .set('APPID', environment.XRapidApiKeyHeaderValue)
              .set('mode', 'json')
    });
  } */
}
