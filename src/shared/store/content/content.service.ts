import { take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api-controller/api.service';
import { IArticles } from '../home/home.models';
import { Comment, IComment, IContentExperience } from './content.models';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  constructor(
    private http: HttpClient,
    private api: ApiService,
    private authService: AuthService
  ) {}

  getContents(
    page?: number,
    size?: number,
    league?: string,
    team?: string
  ): Observable<IArticles> {
    let params = new HttpParams();
    params = params.set('article', true);
    params = params.set('type', 'content');
    params = params.set('status', 'published');

    params = params.set('sort_by', 'published_date');
    params = params.set('sort_order', 'desc');
    if (!!page) {
      params = params.set('page', page);
    }
    if (!!size) {
      params = params.set('size', size);
    }
    if (league) {
      params = params.set('league', league);
    }
    if (team) {
      params = params.set('team', team);
    }

    const url = this.api.getUrl(environment.baseEndpoints.consumer);
    return this.http.get<IArticles>(url, { params });
  }

  getContentsLeagues(): Observable<any> {
    let params = new HttpParams();
    params = params.set('home_page', true);
    params = params.set('organization', true);

    const url = this.api.getUrl(environment.baseEndpoints.consumer);
    return this.http.get<any>(url, { params });
  }

  getContentExperience(
    slug: string,
    type: string
  ): Observable<IContentExperience> {
    let params = new HttpParams();
    params = params.set('consumer_v2', true);
    if (type !== null) {
      params = params.set('type', type);
    } else {
      params = params.set('type', 'content');
    }

    let token = '';

    this.authService.auth$.pipe(take(1)).subscribe((auth) => {
      token = auth.token;
    });

    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    params = params.set('slug', slug);

    const url = this.api.getUrl(environment.baseEndpoints.content);
    return this.http.get<IContentExperience>(url, { headers, params });
  }

  getContentExperienceTeams(id: string): Observable<IContentExperience> {
    let params = new HttpParams();

    params = params.set('teams', true);
    params = params.set('id', id);
    const url = this.api.getUrl(environment.baseEndpoints.content);
    return this.http.get<any>(url, { params });
  }

  getComments(
    entity_id: string | number,
    page?: number,
    size?: number
  ): Observable<IComment> {
    let params = new HttpParams();
    params = params.set('comment', true);
    params = params.set('entity_id', entity_id);

    if (!!page) {
      params = params.set('page', page);
    }
    if (!!size) {
      params = params.set('size', size);
    }

    const url = this.api.getUrl(environment.baseEndpoints.consumer);
    return this.http.get<IComment>(url, { params });
  }

  addComment(comment: Comment): Observable<IComment> {
    let token = '';

    this.authService.auth$.pipe(take(1)).subscribe((auth) => {
      token = auth.token;
    });

    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const url = this.api.getUrl(environment.baseEndpoints.comment);
    return this.http.post<IComment>(url, comment, { headers });
  }

  editComment(comment: Comment): Observable<IComment> {
    let token = '';

    this.authService.auth$.pipe(take(1)).subscribe((auth) => {
      token = auth.token;
    });

    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const url = this.api.getUrl(environment.baseEndpoints.comment);
    return this.http.put<IComment>(url, comment, { headers });
  }

  deleteComment(comment: Comment): Observable<IComment> {
    let token = '';

    let params = new HttpParams();
    params = params.set('delete', true);

    this.authService.auth$.pipe(take(1)).subscribe((auth) => {
      token = auth.token;
    });

    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const url = this.api.getUrl(environment.baseEndpoints.comment);
    return this.http.put<IComment>(url, comment, { headers, params });
  }
}
