import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor() {}

  /**
   * get URL to hit api
   * @param endpoint Receive endpoint
   * @returns complete endpoint
   */
  getUrl(endpoint: string): string {
    const baseUrl = environment.baseURL;
    return baseUrl + endpoint;
  }

   // https://api.mysportsfeeds.com/v2.1/pull/nfl/2022-regular/standings.json
  getSportsFeedUrl(endpoint: string): string{
    const  baseURL :string = environment.SPORTSFEED_URL + '/' + environment.SPORTSFEED_VERSION + '/pull/';
    return baseURL + endpoint;
  }

  // https://api.mysportsfeeds.com/v2.1/pull/mlb/2022-regular/games.json?team=CLE&date=since-today&sort=game.starttime.a&limit=4
  // getSportsFeedUpcomingGames(endpoint: string): string{
  //   const  baseURL :string = environment.SPORTSFEED_URL + '/' + environment.SPORTSFEED_VERSION + '/pull/';
  //   return baseURL + endpoint;
  // }

  // https://api.mysportsfeeds.com/v2.1/pull/mlb/2022-regular/team_gamelogs.json?team=CLE&sort=game.starttime.d&stats=RunsFor,RunsAgainst&limit=4
  // getSportsFeedGameResults(endpoint: string): string{
  //   const  baseURL :string = environment.SPORTSFEED_URL + '/' + environment.SPORTSFEED_VERSION + '/pull/';
  //   return baseURL + endpoint;
  // }

  // getPlayerStats(endpoint:string): string{
  //   const  baseURL :string = environment.SPORTSFEED_URL + '/' + environment.SPORTSFEED_VERSION + '/pull/';
  //   return baseURL + endpoint;
  // }


}