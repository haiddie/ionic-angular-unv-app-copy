import { ILeagueConferences, ILeagueDivisions } from './../home/home.models';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api-controller/api.service';
import { IArticles, ILeagues, ITweets } from '../home/home.models';
import { ILeagueUpcomingGames } from './league.models';
import { IWriter } from '../writer/writer.models';

@Injectable({
  providedIn: 'root',
})
export class LeagueService {
  constructor(private http: HttpClient, private api: ApiService) {}

  getLeague(slug: string): Observable<ILeagues> {
    let params = new HttpParams();
    params = params.set('home_page', true);
    params = params.set('league', true);
    params = params.set('slug', slug);

    const url = this.api.getUrl(environment.baseEndpoints.consumer);
    return this.http.get<ILeagues>(url, { params });
  }

  getLeagueQuote(slug: string, token: string): Observable<any> {
    let url = this.api.getUrl(environment.baseEndpoints.quote);
    url = url + `?list=true&league=${slug}&random=true`;

    const headers = {
      'Content-Type': 'application/json',
      Authorization: token,
    };
    return this.http.get<any>(url, { headers: new HttpHeaders(headers) });
  }
  getLeagueConferences(
    league_id: string | number
  ): Observable<ILeagueConferences> {
    let params = new HttpParams();
    params = params.set('home_page', true);
    params = params.set('league_conference', true);
    params = params.set('league_id', league_id);

    const url = this.api.getUrl(environment.baseEndpoints.consumer);
    return this.http.get<ILeagueConferences>(url, { params });
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

  getLeagueArticles(
    league: string,
    page?: number,
    size?: number,
    sort_order?: 'ASC' | 'DESC'
  ): Observable<IArticles> {
    let params = new HttpParams();
    params = params.set('article', true);
    params = params.set('league', league);

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
    league: string,
    size?: number,
    sort_order?: 'ASC' | 'DESC'
  ): Observable<IArticles> {
    let params = new HttpParams();
    params = params.set('article', true);
    params = params.set('league', league);
    params = params.set('trending', 'true');

    if (!!size) params = params.set('size', size);
    if (!!sort_order) params = params.set('sort_order', sort_order);

    const url = this.api.getUrl(environment.baseEndpoints.consumer);
    return this.http.get<IArticles>(url, { params });
  }

  getTrendingContents(
    league: string,
    size?: number,
    sort_order?: 'ASC' | 'DESC'
  ): Observable<IArticles> {
    let params = new HttpParams();
    params = params.set('article', true);
    params = params.set('type', 'content');
    params = params.set('league', league);
    params = params.set('trending', 'true');

    if (!!size) params = params.set('size', size);
    if (!!sort_order) params = params.set('sort_order', sort_order);

    const url = this.api.getUrl(environment.baseEndpoints.consumer);
    return this.http.get<IArticles>(url, { params });
  }

  getLeagueWriters(league_id: number | string): Observable<IWriter> {
    let params = new HttpParams();
    params = params.set('home_page', true);
    params = params.set('author', true);
    params = params.set('league_id', league_id);

    const url = this.api.getUrl(environment.baseEndpoints.consumer);
    return this.http.get<IWriter>(url, { params });
  }
}
