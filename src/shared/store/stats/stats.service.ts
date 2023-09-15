import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { BehaviorSubject, Observable, of } from "rxjs";
import { environment } from "src/environments/environment";
import { ApiService } from "../api-controller/api.service";
import { IWriter } from '../writer/writer.models';
import { SportsfeedApiService } from '../api-controller/sportsfeed_api.service';
import { IStats, NhlScoringStats } from "./stats.models";

@Injectable({
  providedIn: "root",
})
export class StatsService {

    

  constructor(private http: HttpClient, private api: ApiService, private sportsFeedApi: SportsfeedApiService) { }

  getStats(
    league_name: string,
    type: string,
    property: string,
    sort_order: string,
    page: string,
    size: string,
    player_name?: string,
    team?: string,
    position?: string,
    season?: string,
    pool?:string,
    team_id?:string,
    league_conference_id?:string,
    division_id?:string
  ) : Observable<IStats>{
      
    return  this.sportsFeedApi.getStats(league_name , type,property, sort_order, page, size, player_name, team, position,season,pool, team_id, league_conference_id, division_id)
  }

  getPlayerStats(
    league_name: string,
    type: string,
    property: string,
    sort_order: string,
    page: string,
    size: string,
    player_slug?: string,
    team?: string,
    position?: string,
    season?: string,
    team_id?:string,
    league_conference_id?:string,
    division_id?:string
  ) : Observable<IStats>{
      
     
    return  this.sportsFeedApi.getPlayerStats(league_name , type,property, sort_order, page, size, player_slug, team, position,season, team_id, league_conference_id, division_id)
  }
  

  getStatsFilters(column: string, league: string) : Observable<any>{
    return this.sportsFeedApi.getStatsFilters(column, league)
  }





// getNhlScoring( league_name: string, player_keyword?: string ): Observable<NhlScoringStats> {
    
//   const stats = "Goals,Assists,Points,HatTricks,PlusMinus,Penalties,PenaltyMinutes,PowerplayGoals,PowerplayAssists,ShorthandedGoals,ShorthandedAssists";
 
//   let params = new HttpParams();
//   params = params.set("stats",stats )
//   // params = params.set("player",player_keyword )
   
//   const credentials = btoa(`${environment.SPORTSFEED_API}:${environment.SPORTSFEED_PASSWORD}`);
//   const headers = {
//     'Content-Type': 'application/json',
//     'Authorization': `Basic ${credentials}`
//   }
  
//   const endpoint = league_name + environment.baseEndpoints.sportsfeed.playerStats
  // const url = this.api.getPlayerStats(endpoint);
  // return of();
  // this.http.get<NhlScoringStats>(url,  { headers: new HttpHeaders(headers) , params: params});
// }



  
}