import { IArticles, ITweets } from './city.models';
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ApiService } from "../api-controller/api.service";
import { ICities } from '../home/home.models';
import { ITeam } from '../team/team.models';
import { IWriter } from '../writer/writer.models';

@Injectable({
  providedIn: "root",
})
export class CityService {
  constructor(private http: HttpClient, private api: ApiService) { }

  getCity(slug: string | number): Observable<ICities> {
    let params = new HttpParams();
    params = params.set("home_page", true)
    params = params.set("city", true)
    params = params.set("status", "published")
    params = params.set("slug", slug)
    
    const url = this.api.getUrl(environment.baseEndpoints.consumer);
    return this.http.get<ICities>(url, {params});
  }

  getCityLandmarks(slug: string | number): Observable<ICities> {
    let params = new HttpParams();
    params = params.set("home_page", true)
    params = params.set("slug", slug)
    params = params.set("landmark", true)
    params = params.set("status", "published")
    
    const url = this.api.getUrl(environment.baseEndpoints.consumer);
    return this.http.get<ICities>(url, {params});
  }

  getCityArticles( city: string, page?: number, size?: number, sort_order?: 'ASC' | 'DESC' ): Observable<IArticles> {
    let params = new HttpParams();
    params = params.set("article", true)
    params = params.set("team", city)
    
    if (!!page){
      params = params.set("page", page);
    }
    if (!!size){
      params = params.set("size", size);
    }
    if (!!sort_order){
      params = params.set("sort_order", sort_order);
    }
  
    const url = this.api.getUrl(environment.baseEndpoints.consumer);
    return this.http.get<IArticles>(url, {params});
  }

  getTweetsByUserName( username: string, limit?: number,sort_order?:string ): Observable<ITweets> {
    let params = new HttpParams();
    params = params.set("username", username)

    if (!!limit) params = params.set('limit', limit)
    if(sort_order) params = params.set('sort_order',sort_order)
    const url = this.api.getUrl(environment.baseEndpoints.twitter);
    return this.http.get<ITweets>(url, {params});
  }

  getTrendingArticles( city: string, size?: number, sort_order?: 'ASC' | 'DESC' ): Observable<IArticles> {
    let params = new HttpParams();
    params = params.set("article", true)
    params = params.set("city", city)
    params = params.set("trending", 'true')

    if (!!size) params = params.set('size', size)
    if (!!sort_order) params = params.set("sort_order", sort_order)
    
    const url = this.api.getUrl(environment.baseEndpoints.consumer);
    return this.http.get<IArticles>(url, {params});
  }

  getTrendingContent( city: string, size?: number, sort_order?: 'ASC' | 'DESC' ): Observable<any> {
    let params = new HttpParams();
    params = params.set("article", true)
    params = params.set("city", city)
    params = params.set("trending", 'true')
    params = params.set("type", 'content')

    if (!!size) params = params.set('size', size)
    if (!!sort_order) params = params.set("sort_order", sort_order)
    
    const url = this.api.getUrl(environment.baseEndpoints.consumer);
    return this.http.get<any>(url, {params});
  }

  getWeatherInfo(lat: string, lon: string): Observable<any> {
    let params = new HttpParams()
    params = params.set("current",true)
    params = params.set("lat", lat)
    params = params.set("long", lon)
   
    // params = params.set("appid", environment.openWeatherMapKey)

    const url = environment.baseURL+'/api/weather'
    return this.http.get<any>(url, {params});
  }

  getWeatherForCastInfo(lat: string, lon: string): Observable<any> {
    let params = new HttpParams()
   
    params = params.set("lat", lat)
    params = params.set("long", lon)
    params = params.set("days",4)
    // params = params.set("appid", environment.openWeatherMapKey)

    const url = environment.baseURL+'/api/weather'
    return this.http.get<any>(url, {params});
  }

  getCityTeams(city: string, page: number, size: number): Observable<ITeam> {
    let params = new HttpParams
    params = params.set('home_page', true)
    params = params.set('team', true)
    params = params.set('city', city)

    if (!!page){
      params = params.set("page", page);
    }
    if (!!size){
      params = params.set("size", size);
    }

    const url = this.api.getUrl(environment.baseEndpoints.consumer);
    return this.http.get<ITeam>(url, {params});
  }

  getCityWriters(team: string, page: number, size: number): Observable<IWriter> {
    let params = new HttpParams
    params = params.set('home_page', true)
    params = params.set('author', true)
    params = params.set('team', team)

    if (!!page){
      params = params.set("page", page);
    }
    if (!!size){
      params = params.set("size", size);
    }

    const url = this.api.getUrl(environment.baseEndpoints.consumer);
    return this.http.get<IWriter>(url, {params});
  }

}
