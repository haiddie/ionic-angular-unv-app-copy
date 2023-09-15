import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ApiService } from "../api-controller/api.service";
import { IArticles, ITweets, IWriter } from "./writer.models";

@Injectable({
  providedIn: "root",
})
export class WriterService {
  constructor(private http: HttpClient, private api: ApiService) { }

  getWriter( slug: string | number ): Observable<IWriter> {
    let params = new HttpParams();
    params = params.set("home_page", true)
    params = params.set("author", true)
    params = params.set("slug", slug)
    
    const url = this.api.getUrl(environment.baseEndpoints.consumer);
    return this.http.get<IWriter>(url, {params});
  }

  getWriterArticles( author: string, page?: number, size?: number, sort_order?: 'ASC' | 'DESC' ): Observable<IArticles> {
    let params = new HttpParams();
    params = params.set("article", true)
    params = params.set("author", author)
    
    if (!!page){
      params = params.set("page", page);
    }
    if (!!size){
      params = params.set("size", size);
    }
    if (!!sort_order){
      params = params.set("sort_order", sort_order);
    }
  
    const url = this.api.getUrl(environment.baseEndpoints.consumer);
    return this.http.get<IArticles>(url, {params});
  }

  getTweetsByUserName( username: string, limit?: number ): Observable<ITweets> {
    let params = new HttpParams();
    params = params.set("username", username)

    if (!!limit) params = params.set('limit', limit)
    
    const url = this.api.getUrl(environment.baseEndpoints.twitter);
    return this.http.get<ITweets>(url, {params});
  }

  getTeamArticles( team: string, page?: number, size?: number, sort_order?: 'ASC' | 'DESC' ): Observable<IArticles> {
    let params = new HttpParams();
    params = params.set("article", true)
    params = params.set("team", team)
    
    if (!!page){
      params = params.set("page", page);
    }
    if (!!size){
      params = params.set("size", size);
    }
    if (!!sort_order){
      params = params.set("sort_order", sort_order);
    }

    const url = this.api.getUrl(environment.baseEndpoints.consumer);
    return this.http.get<IArticles>(url, {params});
  }
  getAuthorTeams(slug:string){
    let params = new HttpParams();
    params = params.set("home_page", true)
    params = params.set("author_team", true)
    params = params.set('slug',slug)
  
    const url = this.api.getUrl(environment.baseEndpoints.consumer);
    return this.http.get(url, {params});
  }

}