import { City } from "../home/home.models";

export class CityAction_GetActiveCity {
  static readonly type = '[City] Set Active Sity';
  constructor(public slug: string | number, public name?: string) { }
}

export class CityAction_GetCityLandmark {
  static readonly type = '[City] Get City Landmarks';
  constructor(public slug: string | number, public name?: string) { }
}

export class CityAction_GetCityArticles {
  static readonly type = '[City] Get City Articles';
  constructor(
    public city: string,
    public page?: number, 
    public size?: number,
    public sort_order?: 'ASC' | 'DESC'
  ) {}
}

export class CityAction_GetArticle {
  static readonly type = '[City] Get Article';
  constructor(
    public slug: string,
  ) {}
}

export class CityAction_GetTweets {
  static readonly type = '[City] Get City Tweets';
  constructor(
    public username: string,
    public limit?: number
  ) {}
}
export class CityAction_GetWriterTweets {
  static readonly type = '[City] Get City Writer Tweets';
  constructor(
    public username: string,
    public limit?: number
  ) {}
}

export class CityAction_GetTrendingArticles {
  static readonly type = '[City] Get Trending Articles';
  constructor(
    public city: string,
    public size?: number,
    public sort_order?: 'ASC' | 'DESC'
  ) {}
}

export class CityAction_GetTrendingContent {
  static readonly type = '[City] Get Trending Content';
  constructor(
    public city: string,
    public size?: number,
    public sort_order?: 'ASC' | 'DESC'
  ) {}
}

export class CityAction_GetWeatherInfo {
  static readonly type = '[City] Get Weather Info';
  constructor(
    public lat: string,
    public lon: string
  ) {}
}

export class CityAction_GetWeatherForCastInfo {
  static readonly type = '[City] Get Weather ForCast Info';
  constructor(
    public lat: string,
    public lon: string
  ) {}
}

export class CityAction_GetCityTeams {
  static readonly type = '[City] Get City Teams';
  constructor(
    public city: string,
    public page?: number, 
    public size?: number
  ) {}
}

export class CityAction_GetCityWriters {
  static readonly type = '[City] Get City Writers';
  constructor(
    public team: string,
    public page?: number, 
    public size?: number
  ) {}
}