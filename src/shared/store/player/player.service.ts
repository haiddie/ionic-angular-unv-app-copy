import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ApiService } from "../api-controller/api.service";
import { IArticles, IPlayer,ITweets } from "./player.models";
import { Team } from "../header/header.models";
import { AuthService } from "../auth/auth.service";
import { take } from "rxjs/operators";


@Injectable({
  providedIn: "root",
})
export class PlayerService {

 
  constructor(private http: HttpClient, private api: ApiService) {
   

   
   }

  getPlayer( slug: string,token:string  ): Observable<IPlayer> {
   
    let url = this.api.getUrl(environment.baseEndpoints.consumer);
    url=url+`?player=true&slug=${slug}`;
    

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };

    
    return this.http.get<IPlayer>( url ,{ headers: new HttpHeaders(headers) });
  }

  getPlayerArticles( player_name: string, page?: number, size?: number, sort_order?: 'ASC' | 'DESC' ): Observable<IArticles> {
    let params = new HttpParams();
    player_name = player_name.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    player_name = player_name.replace(/[^\w\s]/gi, '');
    params = params.set("article", true)
    params = params.set("keyword", player_name)
    
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

  getPlayerImages( terms: string,token:string): Observable<any> {
   
    let url = this.api.getUrl(environment.baseEndpoints.imagn);
    url=url+`?list=true&limit=10`;
    if(terms){
      url=url+`&terms=${terms}`
    }
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };
    return this.http.get<any>( url ,{ headers: new HttpHeaders(headers) });
  }


  
  getTeambyAuthorId( author_id: string ): Observable<Team[]> {
    let params = new HttpParams();

    // home_page=true&author_team=true&id=37268
    params = params.set("home_page", true)
    params = params.set("author_team", true)
    
    if (author_id){
      params = params.set("id", author_id);
    }
    const url = this.api.getUrl(environment.baseEndpoints.consumer);
    return this.http.get<Team[]>(url, {params});
  }


  getTweetsByUserName( username: string, limit?: number,sort_order?:string ): Observable<ITweets> {
    let params = new HttpParams();
    params = params.set("username", username)

    if (!!limit) params = params.set('limit', limit)
    if(sort_order) params = params.set('sort_order',sort_order)
    const url = this.api.getUrl(environment.baseEndpoints.twitter);
    return this.http.get<ITweets>(url, {params});
  }

}