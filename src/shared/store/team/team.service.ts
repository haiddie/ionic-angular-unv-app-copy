import {
  IArticles,
  IStandings,
  ITeam,
  ITeamGameResults,
  ITeamStandings,
  ITweets,
  IUpcomingGameSchedule,
} from './team.models';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api-controller/api.service';
import { IWriter } from '../writer/writer.models';
import { SportsfeedApiService } from '../api-controller/sportsfeed_api.service';
import { IStats } from '../stats/stats.models';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  constructor(
    private http: HttpClient,
    private api: ApiService,
    private sportsFeedApi: SportsfeedApiService
  ) {}

  getTeam(slug: string): Observable<ITeam> {
    let params = new HttpParams();
    params = params.set('home_page', true);
    params = params.set('team', true);
    params = params.set('slug', slug);

    const url = this.api.getUrl(environment.baseEndpoints.consumer);
    return this.http.get<ITeam>(url, { params });
  }

  getArticle(slug: string | number): Observable<IArticles> {
    let params = new HttpParams();
    params = params.set('article', true);
    params = params.set('slug', slug);

    const url = this.api.getUrl(environment.baseEndpoints.consumer);
    return this.http.get<IArticles>(url, { params });
  }

  getTeamArticles(
    team: string,
    page?: number,
    size?: number,
    sort_order?: 'ASC' | 'DESC'
  ): Observable<IArticles> {
    let params = new HttpParams();
    params = params.set('article', true);
    params = params.set('team', team);

    if (!!page) {
      params = params.set('page', page);
    }
    if (!!size) {
      params = params.set('size', size);
    }
    if (!!sort_order) {
      params = params.set('sort_order', sort_order);
    }

    const url = this.api.getUrl(environment.baseEndpoints.consumer);
    return this.http.get<IArticles>(url, { params });
  }

  getTweetsByUserName(username: string, limit?: number): Observable<ITweets> {
    let params = new HttpParams();
    params = params.set('username', username);

    if (!!limit) params = params.set('limit', limit);

    const url = this.api.getUrl(environment.baseEndpoints.twitter);
    return this.http.get<ITweets>(url, { params });
  }

  getTrendingArticles(
    team: string,
    size?: number,
    sort_order?: 'ASC' | 'DESC'
  ): Observable<IArticles> {
    let params = new HttpParams();
    params = params.set('article', true);
    params = params.set('team', team);
    params = params.set('trending', 'true');

    if (!!size) params = params.set('size', size);
    if (!!sort_order) params = params.set('sort_order', sort_order);

    const url = this.api.getUrl(environment.baseEndpoints.consumer);
    return this.http.get<IArticles>(url, { params });
  }

  getTrendingContents(
    team: string,
    size?: number,
    sort_order?: 'ASC' | 'DESC'
  ): Observable<IArticles> {
    let params = new HttpParams();
    params = params.set('article', true);
    params = params.set('type', 'content');
    params = params.set('team', team);
    params = params.set('trending', 'true');

    if (!!size) params = params.set('size', size);
    if (!!sort_order) params = params.set('sort_order', sort_order);

    const url = this.api.getUrl(environment.baseEndpoints.consumer);
    return this.http.get<IArticles>(url, { params });
  }

  getCityTeams(city: string, page: number, size: number): Observable<ITeam> {
    let params = new HttpParams();
    params = params.set('home_page', true);
    params = params.set('team', true);
    params = params.set('city', city);

    if (!!page) {
      params = params.set('page', page);
    }
    if (!!size) {
      params = params.set('size', size);
    }

    const url = this.api.getUrl(environment.baseEndpoints.consumer);
    return this.http.get<ITeam>(url, { params });
  }

  getTeamWriters(
    team: string,
    page: number,
    size: number
  ): Observable<IWriter> {
    let params = new HttpParams();
    params = params.set('home_page', true);
    params = params.set('author', true);
    params = params.set('team', team);

    if (!!page) {
      params = params.set('page', page);
    }
    if (!!size) {
      params = params.set('size', size);
    }

    const url = this.api.getUrl(environment.baseEndpoints.consumer);
    return this.http.get<IWriter>(url, { params });
  }

  getStandings(
    league_name: string,
    team_ID: number,
    league_conference_ID: number,
    division_ID: number
  ): Observable<IStandings> {
    return this.sportsFeedApi.getStandings(
      league_name,
      team_ID,
      league_conference_ID,
      division_ID
    );
  }

  getTeamGameResults(
    league_name: string,
    team_ID: number,
    league_conference_ID: number,
    division_ID: number
  ): Observable<ITeamGameResults> {
    return this.sportsFeedApi.getGameResults(
      league_name,
      team_ID,
      league_conference_ID,
      division_ID
    );
  }

  getUpcomingGames(
    league_name: string,
    team_ID: number,
    league_conference_ID: number,
    division_ID: number
  ): Observable<IUpcomingGameSchedule> {
    return this.sportsFeedApi.getUpcomingGames(
      league_name,
      team_ID,
      league_conference_ID,
      division_ID
    );
  }

  getStats(
    league_name: string,
    type: string,
    property: string,
    sort_order: string,
    page: string,
    size: string,
    player_slug?: string,
    teamToFilter?: string,
    position?: string,
    season?: string,
    pool?: string,
    team_ID?: string,
    league_conference_ID?: string,
    division_ID?: string
  ): Observable<IStats> {
    return this.sportsFeedApi.getStats(
      league_name,
      type,
      property,
      sort_order,
      page,
      size,
      player_slug,
      teamToFilter,
      position,
      season,
      pool,
      team_ID,
      league_conference_ID,
      division_ID
    );
  }
}
