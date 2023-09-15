import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api-controller/api.service';
import {
  IArticles,
  ILeagues,
  ITweets,
  ILeagueConferences,
  ILeagueDivisions,
} from '../home/home.models';
import {
  IConferenceStandings,
  IConferenceUpcomingGames,
} from './conference.models';
import { ITeam } from '../team/team.models';
import { IWriter } from '../writer/writer.models';
import { AuthService } from '../auth/auth.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ConferenceService {
  constructor(
    private http: HttpClient,
    private api: ApiService,
    private authService: AuthService
  ) {}

  getConference(slug: string, league?: string): Observable<ILeagueConferences> {
    let params = new HttpParams();
    params = params.set('home_page', true);
    params = params.set('league_conference', true);
    params = params.set('slug', slug);
    if (league) {
      params = params.set('league', league);
    }

    const url = this.api.getUrl(environment.baseEndpoints.consumer);
    return this.http.get<ILeagueConferences>(url, { params });
  }

  getConferenceTeams(league_conference_id: string | number): Observable<ITeam> {
    let params = new HttpParams();
    params = params.set('home_page', true);
    params = params.set('team', true);
    params = params.set('league_conference_id', league_conference_id);

    const url = this.api.getUrl(environment.baseEndpoints.consumer);
    return this.http.get<ITeam>(url, { params });
  }

  getConferenceDivisions(
    league_conference_id: string | number
  ): Observable<ILeagueDivisions> {
    let params = new HttpParams();
    params = params.set('home_page', true);
    params = params.set('division', true);
    params = params.set('league_conference_id', league_conference_id);

    const url = this.api.getUrl(environment.baseEndpoints.consumer);
    return this.http.get<ILeagueDivisions>(url, { params });
  }

  getArticle(slug: string | number): Observable<IArticles> {
    let params = new HttpParams();
    params = params.set('article', true);
    params = params.set('slug', slug);

    const url = this.api.getUrl(environment.baseEndpoints.consumer);
    return this.http.get<IArticles>(url, { params });
  }

  getConferenceArticles(
    conference: string,
    page?: number,
    size?: number,
    sort_order?: 'ASC' | 'DESC'
  ): Observable<IArticles> {
    let params = new HttpParams();
    params = params.set('article', true);
    params = params.set('team', conference);

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

  getTweetsByUserName(
    username: string,
    limit?: number,
    sort_order?: string
  ): Observable<ITweets> {
    let params = new HttpParams();
    params = params.set('username', username);

    if (!!limit) params = params.set('limit', limit);
    if (sort_order) params = params.set('sort_order', sort_order);
    const url = this.api.getUrl(environment.baseEndpoints.twitter);
    return this.http.get<ITweets>(url, { params });
  }

  getTrendingArticles(
    conference: string,
    size?: number,
    sort_order?: 'ASC' | 'DESC'
  ): Observable<IArticles> {
    let params = new HttpParams();
    params = params.set('article', true);
    params = params.set('team', conference);
    params = params.set('trending', 'true');

    if (!!size) params = params.set('size', size);
    if (!!sort_order) params = params.set('sort_order', sort_order);

    const url = this.api.getUrl(environment.baseEndpoints.consumer);
    return this.http.get<IArticles>(url, { params });
  }

  getTrendingContents(
    conference: string,
    size?: number,
    sort_order?: 'ASC' | 'DESC'
  ): Observable<IArticles> {
    let params = new HttpParams();
    params = params.set('article', true);
    params = params.set('type', 'content');
    params = params.set('team', conference);
    params = params.set('trending', 'true');

    if (!!size) params = params.set('size', size);
    if (!!sort_order) params = params.set('sort_order', sort_order);

    const url = this.api.getUrl(environment.baseEndpoints.consumer);
    return this.http.get<IArticles>(url, { params });
  }

  getConferenceStandings(
    league_name: string
  ): Observable<IConferenceStandings> {
    let token = '';
    this.authService.auth$.pipe(take(1)).subscribe((auth) => {
      token = auth.token;
    });

    this.authService.auth$.pipe(take(1)).subscribe((auth) => {
      token = auth.token;
    });

    const headers = {
      'Content-Type': 'application/json',
      Authorization: token,
    };
    const endpoint =
      league_name + environment.baseEndpoints.sportsfeed.standings;
    const url = this.api.getSportsFeedUrl(endpoint);
    // return of<IConferenceStandings>()
    return this.http.get<IConferenceStandings>(url, {
      headers: new HttpHeaders(headers),
    });
  }

  getConferenceUpcomingGames(
    league_name: string
  ): Observable<IConferenceUpcomingGames> {
    let token = '';
    this.authService.auth$.pipe(take(1)).subscribe((auth) => {
      token = auth.token;
    });

    const headers = {
      'Content-Type': 'application/json',
      Authorization: token,
    };

    let params = new HttpParams();
    params = params.set('date', 'since-today');
    params = params.set('sort', 'game.starttime.a');
    params = params.set('limit', 6);

    let endpoint: string;
    if (league_name === 'nhl') {
      endpoint =
        league_name + environment.baseEndpoints.sportsfeed.nhl_upcomingGames;
    } else {
      endpoint =
        league_name + environment.baseEndpoints.sportsfeed.upcomingGames;
    }

    const url = this.api.getSportsFeedUrl(endpoint);

    //  return of<IConferenceUpcomingGames>()
    return this.http.get<IConferenceUpcomingGames>(url, {
      headers: new HttpHeaders(headers),
      params: params,
    });
  }

  getConferenceWriters(
    league_conference_id: number | string
  ): Observable<IWriter> {
    let params = new HttpParams();
    params = params.set('home_page', true);
    params = params.set('author', true);
    params = params.set('league_conference_id', league_conference_id);

    const url = this.api.getUrl(environment.baseEndpoints.consumer);
    return this.http.get<IWriter>(url, { params });
  }
}
