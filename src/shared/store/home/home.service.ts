import { ICities, ILeagueConferences, ILeagues, ILeagueDivisions, ILeagueTeams, IArticles } from './home.models';
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ApiService } from "../api-controller/api.service";
import { IWriter } from '../writer/writer.models';

@Injectable({
  providedIn: "root",
})
export class HomeService {
  constructor(private http: HttpClient, private api: ApiService) { }

  getCities(id?: string): Observable<ICities> {
    let params = new HttpParams();
    params = params.set("home_page", true)
    params = params.set("city", true)
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
    params = params.set("status", "published")
    
    if (!!page){
      params = params.set("page", page);
    }
    if (!!size){
      params = params.set("size", size);
    }

    const url = this.api.getUrl(environment.baseEndpoints.consumer);
    return this.http.get<ILeagueConferences>(url, {params});
  }

  getLeagueDivisions(conference_league_id: string | number, page?: number, size?: number): Observable<ILeagueDivisions> {
    let params = new HttpParams();
    params = params.set("home_page", true)
    params = params.set("division", true)
    params = params.set("conference_league_id", conference_league_id)
    params = params.set("status", "published")
    
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
    division_id?: string | number, 
    page?: number, 
    size?: number
  ): Observable<ILeagueTeams> {
    let params = new HttpParams();
    params = params.set("home_page", true)
    params = params.set("team", true)
    params = params.set("status", "published")

    if (!!division_id){
      params = params.set("division_id", division_id);
    }
    if (!!page){
      params = params.set("page", page);
    }
    if (!!size){
      params = params.set("size", size);
    }

    const url = this.api.getUrl(environment.baseEndpoints.consumer);
    return this.http.get<ILeagueTeams>(url, {params});
  }

  getLeagueTeam(
    id: string | number
  ): Observable<ILeagueTeams> {
    let params = new HttpParams();
    params = params.set("home_page", true)
    params = params.set("team", true)
    params = params.set("id", id)
    // params = params.set("id", "published")

    const url = this.api.getUrl(environment.baseEndpoints.consumer);
    return this.http.get<ILeagueTeams>(url, {params});
  }

  getArticles(
    id?: string | number, 
    league?: string,
    keywords?: string, 
    author?: string,
    team?: string,
    city?: string,
    is_editor_pick?: boolean
  ): Observable<IArticles> {
    let params = new HttpParams();
    params = params.set("article", true)
    if (!!id){
      params = params.set("id", id);
    }
    if (!!league){
      params = params.set("league", league);
    }
    if (!!keywords){
      params = params.set("keyword", keywords);
    }
    if (!!author){
      params = params.set("author", author);
    }
    if (!!team){
      params = params.set("team", team);
    }
    if (!!city){
      params = params.set("city", city);
    }
    if (!!is_editor_pick){
      params = params.set("is_editor_pick", is_editor_pick);
    }

    const url = this.api.getUrl(environment.baseEndpoints.consumer);
    return this.http.get<IArticles>(url, {params});
  }

  getCityArticles( city: string, page?: number, size?: number ): Observable<IArticles> {
    let params = new HttpParams();
    params = params.set("article", true)
    params = params.set("city", city)
    
    if (!!page){
      params = params.set("page", 1);
    }
    if (!!size){
      params = params.set("size", size);
    }

    const url = this.api.getUrl(environment.baseEndpoints.consumer);
    return this.http.get<IArticles>(url, {params});
  }

  getSingleArticle( id: string | number ): Observable<IArticles> {
    let params = new HttpParams();
    params = params.set("article", true)
    params = params.set("id", id)
    
    const url = this.api.getUrl(environment.baseEndpoints.consumer);
    return this.http.get<IArticles>(url, {params});
  }

  getTeamArticles( team: string, page?: number, size?: number ): Observable<IArticles> {
    let params = new HttpParams();
    params = params.set("article", true)
    params = params.set("team", team)
    
    if (!!page){
      params = params.set("page", page);
    }
    if (!!size){
      params = params.set("size", size);
    }

    const url = this.api.getUrl(environment.baseEndpoints.consumer);
    return this.http.get<IArticles>(url, {params});
  }

  getLeagueArticles( league: string, page?: number, size?: number ): Observable<IArticles> {
    let params = new HttpParams();
    params = params.set("article", true)
    params = params.set("league", league)
    params = params.set("sort_order", 'DESC')
    
    if (!!page){
      params = params.set("page", page);
    }
    if (!!size){
      params = params.set("size", size);
    }

    const url = this.api.getUrl(environment.baseEndpoints.consumer);
    return this.http.get<IArticles>(url, {params});
  }

  getEditorPicksArticles( is_editor_pick: boolean, page?: number, size?: number ): Observable<IArticles> {
    let params = new HttpParams();
    params = params.set("article", true)
    params = params.set("is_editor_pick", is_editor_pick)
    params = params.set("sort_order", 'DESC')
    
    if (!!page){
      params = params.set("page", page);
    }
    if (!!size){
      params = params.set("size", size);
    }

    const url = this.api.getUrl(environment.baseEndpoints.consumer);
    return this.http.get<IArticles>(url, {params});
  }

  
  getRecentlyAddedWriters(writer: boolean, page?: number, size?: number, sort_order?, sort_by? ): Observable<IWriter> {
    let params = new HttpParams();
    params = params.set("home_page", true)
    params = params.set("author", writer)
    params = params.set("page", page )
    if (!!sort_order){
      params = params.set("sort_order", sort_order);
    }
    if (!!sort_by){
      params = params.set("sort_by", sort_by);
    }
    if (!!size){
      params = params.set("size", size);
    }

    const url = this.api.getUrl(environment.baseEndpoints.consumer);
    return this.http.get<IWriter>(url, {params});
  }

  
  
  getWritersByRanking(writer: boolean, page?: number, size?: number, sort_order?, sort_by? ): Observable<IWriter> {
    let params = new HttpParams();
    params = params.set("home_page", true)
    params = params.set("author", writer)
    params = params.set("page", page )
    if (sort_order){
      params = params.set("sort_order", sort_order);
    }
    if (sort_by){
      params = params.set("sort_by", sort_by);
    }
    if (size){
      params = params.set("size", size);
    }
   
    const url = this.api.getUrl(environment.baseEndpoints.consumer);
   
    return this.http.get<IWriter>(url, {params});
  }

}