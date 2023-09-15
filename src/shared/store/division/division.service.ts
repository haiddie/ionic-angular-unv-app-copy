import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api-controller/api.service';
import {
  IArticles,
  ILeagues,
  ITweets,
  ILeagueDivisions,
} from '../home/home.models';
import { ITeam } from '../team/team.models';
import { IWriter } from '../writer/writer.models';

@Injectable({
  providedIn: 'root',
})
export class DivisionService {
  constructor(private http: HttpClient, private api: ApiService) {}

  getDivision(slug: string): Observable<ILeagueDivisions> {
    let params = new HttpParams();
    params = params.set('home_page', true);
    params = params.set('division', true);
    params = params.set('slug', slug);

    const url = this.api.getUrl(environment.baseEndpoints.consumer);
    return this.http.get<ILeagueDivisions>(url, { params });
  }

  getDivisionTeams(division_id: string | number): Observable<ITeam> {
    let params = new HttpParams();
    params = params.set('home_page', true);
    params = params.set('team', true);
    params = params.set('division_id', division_id);

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

  getDivisionArticles(
    division: string,
    page?: number,
    size?: number,
    sort_order?: 'ASC' | 'DESC'
  ): Observable<IArticles> {
    let params = new HttpParams();
    params = params.set('article', true);
    params = params.set('team', division);

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
    division: string,
    size?: number,
    sort_order?: 'ASC' | 'DESC'
  ): Observable<IArticles> {
    let params = new HttpParams();
    params = params.set('article', true);
    params = params.set('team', division);
    params = params.set('trending', 'true');

    if (!!size) params = params.set('size', size);
    if (!!sort_order) params = params.set('sort_order', sort_order);

    const url = this.api.getUrl(environment.baseEndpoints.consumer);
    return this.http.get<IArticles>(url, { params });
  }

  getTrendingContents(
    division: string,
    size?: number,
    sort_order?: 'ASC' | 'DESC'
  ): Observable<IArticles> {
    let params = new HttpParams();
    params = params.set('article', true);
    params = params.set('type', 'content');
    params = params.set('team', division);
    params = params.set('trending', 'true');

    if (!!size) params = params.set('size', size);
    if (!!sort_order) params = params.set('sort_order', sort_order);

    const url = this.api.getUrl(environment.baseEndpoints.consumer);
    return this.http.get<IArticles>(url, { params });
  }

  getDivisionWriters(division_id: number | string): Observable<IWriter> {
    let params = new HttpParams();
    params = params.set('home_page', true);
    params = params.set('author', true);
    params = params.set('division_id', division_id);

    const url = this.api.getUrl(environment.baseEndpoints.consumer);
    return this.http.get<IWriter>(url, { params });
  }
}
