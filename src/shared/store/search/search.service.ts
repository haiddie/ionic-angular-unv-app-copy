import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api-controller/api.service';
import { SportsfeedApiService } from '../api-controller/sportsfeed_api.service';
import { IPlayer } from '../player/player.models';
import { IArticles, ITeam } from '../team/team.models';
import { IContentExperience } from '../content/content.models';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(
    private http: HttpClient,
    private api: ApiService,
    private sportsFeedApi: SportsfeedApiService
  ) {}

  getSearchData(slug: string): Observable<any> {
  
    slug = slug.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    slug = slug.replace(/[^\w\s]/gi, '');
    let params = new HttpParams();
    params = params.set('search', true);
    params = params.set('keyword', slug);

    const url = this.api.getUrl(environment.baseEndpoints.consumer);
    return this.http.get<any>(url, { params });
  }

  getPlayers(keyword: string, size?: any): Observable<IPlayer> {
    let params = new HttpParams();
    let url = this.api.getUrl(environment.baseEndpoints.consumer);
    url = url + `?player=true`;

    params = params.set('keyword', keyword);
    if (size) {
      params = params.set('size', size);
    }

    return this.http.get<IPlayer>(url, { params });
  }

  getTeams(keyword: string, size?: any): Observable<ITeam> {
    let params = new HttpParams();
    params = params.set('home_page', true);
    params = params.set('team', true);
    params = params.set('keyword', keyword);

    if (size) {
      params = params.set('size', size);
    }

    const url = this.api.getUrl(environment.baseEndpoints.consumer);
    return this.http.get<ITeam>(url, { params });
  }
  getArticles(keyword: string, size?: any): Observable<IArticles> {
    let params = new HttpParams();
    params = params.set('article', true);
    params = params.set('keyword', keyword);
    if (size) {
      params = params.set('size', size);
    }

    const url = this.api.getUrl(environment.baseEndpoints.consumer);
    return this.http.get<IArticles>(url, { params });
  }

  getContentExperiences(
    keyword: string,
    size?: any
  ): Observable<IContentExperience> {
    let params = new HttpParams();
    params = params.set('consumer_v2', true);

    params = params.set('type', 'content');
    params = params.set('keyword', keyword);
    if (size) {
      params = params.set('size', size);
    }

    const url = this.api.getUrl(environment.baseEndpoints.content);
    return this.http.get<IContentExperience>(url, { params });
  }
}
