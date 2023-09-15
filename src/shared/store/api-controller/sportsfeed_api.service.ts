import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { IStats } from '../stats/stats.models';
import { IStandings, ITeamGameResults, ITeamStandings, IUpcomingGameSchedule } from '../team/team.models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class SportsfeedApiService {
  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private authService:AuthService
  ) { }


  /**
   * get URL to hit api
   * @param endpoint Receive endpoint
   * @returns complete endpoint
   */

  // https://api.mysportsfeeds.com/v2.1/pull/nfl/2022-regular/standings.json
  getSportsFeedUrl(endpoint: string): string {
    const baseURL: string = environment.SPORTSFEED_URL + '/' + environment.SPORTSFEED_VERSION + '/pull/';
    return baseURL + endpoint;
  }

  
  getGameResults(league_name: string, team_id: number, league_conference_id: number, division_id: number): Observable<ITeamGameResults> {

    let params = new HttpParams
    params = params.set('result', true)
   params = params.set('size', 6)
    params = params.set('page', 1)


    if (team_id) {
      params = params.set("team_id", team_id);
    }
    if (league_conference_id) {
      params = params.set("league_conference_id", league_conference_id);
    }
    if (division_id) {
      params = params.set("division_id", division_id);
    }
    if (league_name) {
      params = params.set("league", league_name);
    }

    const url = this.apiService.getUrl(environment.baseEndpoints.consumer);
    return this.http.get<ITeamGameResults>(url, { params });
  }

  getUpcomingGames(league_name: string, team_id: number, league_conference_id: number, division_id: number): Observable<IUpcomingGameSchedule> {

    let params = new HttpParams
    params = params.set('result', true)
    params = params.set('schedule', "upcomings")
    params = params.set('size', 6)
    params = params.set('page', 1)


    if (team_id) {
      params = params.set("team_id", team_id);
    }
    if (league_conference_id) {
      params = params.set("league_conference_id", league_conference_id);
    }
    if (division_id) {
      params = params.set("division_id", division_id);
    }
    if (league_name) {
      params = params.set("league", league_name);
    }

    const url = this.apiService.getUrl(environment.baseEndpoints.consumer);
    return this.http.get<IUpcomingGameSchedule>(url, { params });
  }


  getStandings(league_name: string, team_id: number, league_conference_id: number, division_id: number): Observable<IStandings> {

    let params = new HttpParams
    params = params.set('standings', true)
    params = params.set('size', 50)
    params = params.set('page', 1)

    if (league_name) {
      params = params.set("league", league_name.toUpperCase());
    }
    if (team_id) {
      params = params.set("team_id", team_id);
    }
    if (league_conference_id) {
      params = params.set("league_conference_id", league_conference_id);
    }
    if (division_id) {
      params = params.set("division_id", division_id);
    }
    const url = this.apiService.getUrl(environment.baseEndpoints.consumer);
    return this.http.get<IStandings>(url, { params });
  }


  getStats(league_name: string,type: string,property: string, sort_order: string,  page: string, size: string, player_name?: string, teamToFilter?: string, position?: string, season?: string,pool?:string, team_ID?: string,  league_conference_ID?: string, division_ID?: string): Observable<IStats> {
    let params = new HttpParams;
    params = params.set('full_table_stats_v2', true)
    if (league_name) {
      params = params.set('league', league_name);
    }
    if (type) {
      params = params.set('type', type)
    }
    if (property) {
      params = params.set('property', property);
    }
    if (sort_order) {
      params = params.set("sort_order", sort_order);
    }
    if (page) {
      params = params.set("page", page);
    }
    if (size) {
      params = params.set("size", size);
    }
    if (player_name) {
      params = params.set("player", player_name);
    }
    if (teamToFilter) {
      params = params.set('team', teamToFilter);
    }
    if (team_ID) {
      params = params.set('team_id', team_ID);
    }
    if (position) {
      params = params.set("position", position);
    }
    if (season) {
      params = params.set("season", season);
    }
    if (pool) {
      params = params.set("player_pool", pool);
    }
    if (league_conference_ID) {
      params = params.set('league_conference_id', league_conference_ID);
    }
    if (division_ID) {
      params = params.set('division_id', division_ID);
    }
    const url = this.apiService.getUrl(environment.baseEndpoints.consumer);
   
      return this.http.get<IStats>(url, { params });
    
  }

  getPlayerStats(league_name: string,type: string,property: string, sort_order: string,  page: string, size: string, player_slug?: string, teamToFilter?: string, position?: string, season?: string, team_ID?: string,  league_conference_ID?: string, division_ID?: string): Observable<IStats> {
    let params = new HttpParams;
    params = params.set('full_table_stats_v2', true)
    if (league_name) {
      params = params.set('league', league_name);
    }
    if (type) {
      params = params.set('type', type)
    }
    if (property) {
      params = params.set('property', property);
    }
    if (sort_order) {
      params = params.set("sort_order", sort_order);
    }
    if (page) {
      params = params.set("page", page);
    }
    if (size) {
      params = params.set("size", size);
    }
    if (player_slug) {
      params = params.set("player_slug", player_slug);
    }
    if (teamToFilter) {
      params = params.set('team', teamToFilter);
    }
    if (team_ID) {
      params = params.set('team_id', team_ID);
    }
    if (position) {
      params = params.set("position", position);
    }
    if (season) {
      params = params.set("season", season);
    }
    if (league_conference_ID) {
      params = params.set('league_conference_id', league_conference_ID);
    }
    if (division_ID) {
      params = params.set('division_id', division_ID);
    }
    const url = this.apiService.getUrl(environment.baseEndpoints.consumer);
   
      return this.http.get<IStats>(url, { params });
    
  }

  
  getStatsFilters(column: string, league: string): Observable<IStats> {
    let params = new HttpParams;
    params = params.set('stats_filter', true)
    if (column) {
      params = params.set('column', column);
    }
    if (league) {
      params = params.set('league', league)
    }
    
    const url = this.apiService.getUrl(environment.baseEndpoints.consumer);
    return this.http.get<IStats>(url, { params });
  }


   //  feedback api

   submitFeedback(data,token ) {

   
   let   headers=new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
      
    const url = this.apiService.getUrl(environment.baseEndpoints.consumer);
    return this.http.post<any>(url,data, {headers:headers} );

  }

  get_league_conferences(data) {
    const headers = {
      'Content-Type': 'application/json',
    };
       
     let url = this.apiService.getUrl(environment.baseEndpoints.consumer);
     url+=data;
     return this.http.get<any>(url,  {
      headers: new HttpHeaders(headers),
    } );
 
   }

   get(data,token) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };
       
     let url = environment.baseURL+'/api/'
     url+=data;
     return this.http.get<any>(url,  {
      headers: new HttpHeaders(headers),
    } );
 
   }


  

  // https://sportswriters-qa.azurewebsites.net/api/consumer?stats_filter=true&column=team&league=MLB

}



