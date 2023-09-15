import { ICities, ILeagueConferences, ILeagues, ILeagueDivisions, ILeagueTeams } from '../home/home.models';
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ApiService } from "../api-controller/api.service";

@Injectable({
  providedIn: "root",
})
export class HeaderService {
  constructor(private http: HttpClient, private api: ApiService) { }

  getCities(id?: string): Observable<ICities> {
    let params = new HttpParams();
    params = params.set("home_page", true)
    params = params.set("city", true)
    // params = params.set("size",100)
    // params = params.set("status", "published")
    if (!!id){
      params = params.set("id", id);
    }

    const url = this.api.getUrl(environment.baseEndpoints.consumer);
    return this.http.get<ICities>(url, {params});
  }

  getLeagues(id?: string | number, page?: number, size?: number): Observable<ILeagues> {
    let params = new HttpParams();
    params = params.set("home_page", true)
    params = params.set("league", true)
    params = params.set("status", "published")
    
    if (!!id){
      params = params.set("id", id);
    }
    if (!!page){
      params = params.set("page", page);
    }
    if (!!size){
      params = params.set("size", size);
    }

    const url = this.api.getUrl(environment.baseEndpoints.consumer);
    return this.http.get<ILeagues>(url, {params});
  }

  getLeagueConferences(league_id: string | number, page?: number, size?: number): Observable<ILeagueConferences> {
    let params = new HttpParams();
    params = params.set("home_page", true)
    params = params.set("league_conference", true)
    params = params.set("league_id", league_id)
    // params = params.set("status", "published")
    
    if (!!page){
      params = params.set("page", page);
    }
    if (!!size){
      params = params.set("size", size);
    }

    const url = this.api.getUrl(environment.baseEndpoints.consumer);
    return this.http.get<ILeagueConferences>(url, {params});
  }

  getLeagueDivisions(league_id: string | number, page?: number, size?: number): Observable<ILeagueDivisions> {
    let params = new HttpParams();
    params = params.set("home_page", true)
    params = params.set("division", true)
    params = params.set("league_id", league_id)
    // params = params.set("status", "published")
    
    if (!!page){
      params = params.set("page", page);
    }
    if (!!size){
      params = params.set("size", size);
    }

    const url = this.api.getUrl(environment.baseEndpoints.consumer);
    return this.http.get<ILeagueDivisions>(url, {params});
  }

  getLeagueTeams(
    division_id: string | number, 
    page?: number, 
    size?: number
  ): Observable<ILeagueTeams> {
    let params = new HttpParams();
    params = params.set("home_page", true)
    params = params.set("team", true)
    params = params.set("division_id", division_id);
    // params = params.set("status", "published")

    if (!!page){
      params = params.set("page", page);
    }
    if (!!size){
      params = params.set("size", size);
    }

    const url = this.api.getUrl(environment.baseEndpoints.consumer);
    return this.http.get<ILeagueTeams>(url, {params});
  }

}