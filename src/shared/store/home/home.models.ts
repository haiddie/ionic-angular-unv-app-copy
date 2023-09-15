import { Writer } from "../writer/writer.models"

export interface ICities {
  data: City[],
  totalRecords: string | number,
  page: number,
  size: number
}

export interface City {
  id: string,
  name: string,
  description: string,
  code: string,
  lat: string,
  long: string,
  lat_long:string,
  country: string,
  slug: string,
  champions?:string,
  meta_description: string,
  city_image: string,
  date_found: string,
  population: string,
  history: string,
  guide: string,
  state: string,
  total_championships: string,
  mlb_championships: string,
  nba_championships: string,
  nhl_championships: string,
  nfl_championships: string,
  city_weather_id: string,
  iso3: string,
  status: string,
  totalrequests: string,
  rownumber: string,
  image:string,
  image_source:string,
  title:string,
  source:string
}

export interface ILeagues {
  data: League[],
  totalRecords: string | number,
  page: number,
  size: number
}

export interface League {
  name: string,
  description: string,
  date_found: string,
  logo: string,
  meta_description: string,
  keywords: string,
  abbreviation: string,
  history: string,
  website: string,
  created_at: string,
  created_by: string,
  modified_at: string,
  modified_by: string,
  is_active: boolean,
  id: number,
  twitter_handle: string,
  twitter_hashtag: string,
  display_order: number,
  last_league_result: string,
  most_league_titles: string,
  runner_up: string,
  champion: string,
  homepage_display: boolean,
  author_id: string,
  status: string,
  slug:string,
  published_date: string,
  rownumber: string,
  totalrequests: string
}

export interface ILeagueConferences {
  data: LeagueConference[],
  totalRecords: string | number,
  page: number,
  size: number
}

export interface LeagueConference {
  league_id: number,
  conference_id: number,
  name: string,
  nick_name: string,
  description: string,
  date_found: string,
  created_at: string,
  modified_at: string,
  is_active: boolean,
  id: number,
  slug: string,
  logo: string,
  meta_description: string,
  keywords: string,
  created_by: string,
  status: string,
  author_id: string,
  published_date: string,
  modified_by: string,
  author: string,
  email: string,
  username: string,
  league_name: string,
  league_logo: string,
  website: string,
  twitter_handle: string,
  league_history: string,
  rownumber: string,
  totalrequests: string,
  champion:string,
  runner_up:string,
  last_conference_result:string
}

export interface ILeagueDivisions {
  data: LeagueDivision[],
  totalRecords: string | number,
  page: number,
  size: number
}

export interface LeagueDivision {
  id: number,
  name: string,
  alternate_name: string,
  conference_name: string,
  nick_name:string,
  league_conference_name: string;
  my_sportsfeed_key: string,
  date_found: string,
  division_display_name: string,
  last_division_champ: string,
  description: string,
  league_conference_id: string,
  created_at: string,
  created_by: string,
  modified_at: string,
  is_active: boolean,
  logo: string,
  champion: string,
  most_titles: string,
  display_order: number,
  author_id: string,
  status: string,
  keywords: string,
  twitter_hashtags: string,
  meta_description: string,
  modified_by: string,
  published_date: string,
  league_name: string,
  league_id: string | number,
  slug: string,
  author: string,
  username: string,
  rownumber: string,
  totalrequests: string
}

export interface ILeagueTeams {
  data: LeagueTeam[],
  totalRecords: string | number,
  page: number,
  size: number
}

export interface LeagueTeam {
  name: string,
  slug: string,
  description: string,
  date_found: string,
  nick_name: string,
  city: string,
  team_color_1: string,
  team_color_2: string,
  sports_id: string,
  created_at: string,
  modified_at: string,
  is_active: boolean,
  id: number,
  league_conference_id: number,
  league_id: number,
  created_by: string,
  logo: string,
  twitter_handle: string,
  keyword: string,
  meta_description: string,
  bio: string,
  website: string,
  status: string,
  division_id: string,
  twitter_hashtag: string,
  author_id: string,
  modified_by: string,
  keywords: string,
  published_date: string,
  user_id: string,
  author: string,
  username: string,
  conference_name: string,
  conference_nick_name: string,
  league_name: string,
  league_history: string,
  division_name: string,
  rownumber:string,
  totalrequests:string
}

export interface IArticles {
  data: Article[],
  authors: Writer | Writer[],
  totalRecords: string | number,
  page: number,
  size: number
}

export interface Article {
  id?: string,
  title?: string,
  link?: string,
  post?: string,
  created_at?: string,
  meta_description?: string,
  keywords?: string,
  is_editors_pick?: boolean,
  image?: string,
  image_credit?: string,
  authors?: string,
  modified_at?: string,
  modified_by?: string,
  organization?: string,
  slug?: string,
  teams?: string,
  type?: string,
  city?: string,
  views?: string,
  source?: string,
  person?: string,
  status?: string,
  published_date?: string,
  rownumber?: string,
  totalrequests?: string
}

export interface ITweets {
  data: Tweets
}

export interface Tweets {
  tweets: Tweet[],
  mentions: Tweet[]
}

export interface Tweet {
  text: string,
  author_id: string,
  id: string,
  attachments?: {
      media_keys: string[]
  }
}