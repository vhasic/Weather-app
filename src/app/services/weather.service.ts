import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WeatherData } from '../models/weather.model';


/* 
  This app uses procedural way of fetching and showing data and it is synchronous.
  ServerManagement app uses reactive way of fetching and showing data and it is asynchronous, 
  which is better way, but I wanted to have examples for both ways.
*/

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
    }).pipe(
      tap(console.log),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    return throwError (`An error occurred - Error code: ${error.status} Message: ${error.error.message}`);
  }
}

// To generate service from console:
// 1. cd src\app\services
// 2. ng g s weather (generates weather.service.ts)) 