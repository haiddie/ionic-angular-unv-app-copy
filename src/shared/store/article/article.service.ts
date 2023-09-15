import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ApiService } from "../api-controller/api.service";
import { IWriter } from '../writer/writer.models';
import { IArticles } from "../home/home.models";

@Injectable({
  providedIn: "root",
})
export class ArticleService {
  constructor(private http: HttpClient, private api: ApiService) { }

  getArticle( slug: string | number ): Observable<IArticles> {
    let params = new HttpParams();
    params = params.set("article", true)
    params = params.set("slug", slug)
    
    const url = this.api.getUrl(environment.baseEndpoints.consumer);
    return this.http.get<IArticles>(url, {params});
  }

  getRelatedStories( team: string, page?: number, size?: number ): Observable<IArticles> {
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

}