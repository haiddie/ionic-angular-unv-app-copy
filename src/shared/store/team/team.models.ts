export interface ITeam {
  data: Team[],
  totalRecords: string | number,
  page: number,
  size: number
}

export interface Team {
  name: string,
  slug: string,
  my_sportsfeed_key: string;
  description: string,
  date_found: string,
  nick_name: string,
  city: string,
  city_slug:string,
  city_id:string,
  championships:string,
  last_championship:string,
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
  history: string,
  website: string,
  status: string,
  division_id: string,
  twitter_hashtag: string,
  author_id: string,
  modified_by: string,
  keywords: string,
  published_date: string,
  stadium: string,
  stadium_url: string,
  stadium_capacity: string,
  stadium_coordinates: string,
  head_coach: string,
  head_coach_url: string,
  hall_of_fame: string,
  stats: string,
  legends: string,
  awards: string,
  user_id: string,
  author: string,
  username: string,
  conference_name: string,
  conference_nick_name: string,
  league_name: string,
  league_history: string,
  division_name: string,
  rownumber: string,
  totalrequests: string,
  location:string
}

export interface IArticles {
  data: Article[],
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
  person?: string,
  status?: string,
  source?: string,
  city?: string,
  views?: string,
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
// TO-DO: remove me
export interface ITeamStandings {
  teams: standings[],
}

// TO-DO: remove me
export interface standings {
  team: any,
  stats: any,
  overallRank: any,
  conferenceRank: any,
  divisionRank: any,
  playoffRank: any,
}

export interface IStandings {
  data: standing[],
  totalRecords: string | number,
  page: number,
  size: number
}

export interface standing {
        id: number,
        team_id: number,
        conference: string,
        otls:string,
        ties:string,
        conference_rank: string,
        conferenceSlug:string,
        conferenceName:string,
        divisions:Division[],
        team: string,
        division: string,
        wins:string,
        losses:string,
        pts:string,
        pcts:string,
        league:string,
        city:string,
        last_updated_on:Date,
        division_name:string,
        division_id:number,
        team_name: string,
        league_conference_name:string,  
        league_conference_id:number,
        team_slug:string;
        division_slug:string;
        league_conference_slug:string;
        league_id:number,
        totalrequests:number
}


export interface Division{
  value:Val
}

export interface Val{
  divisionSlug:any,
  divisionName:any,
  teams:any[]
}

export interface ITeamUpcomingGames {
  games: gameSchedule[]
}

export interface gameSchedule {
  schedule: any
}

export interface ITeamGameResults {
  data: GameResult[],
  totalRecords: string | number,
  page: number,
  size: number
}
export interface GameResult {
  name: string,
  id: number,
  team_id: string,
  home_team: string,
  away_team: string,
  for: string,
  against: string,
  date: Date,
  league: string,
  stat_type: string,
  game_id: string,
  totalrequests: number,
  away_team_slug:string,
  home_team_slug:string,
  away_team_score:string,
  home_team_score:string,
  away_team_id:string,
  home_team_id:string,
  away:string,
  home:string
}



export interface IUpcomingGameSchedule {
  data: scheduledGame[],
  totalRecords: string | number,
  page: number,
  size: number
}
export interface scheduledGame {
  name: string,
  id: number,
  team_id: string,
  home_team: string,
  away_team: string,
  for: string,
  against: string,
  date: Date,
  league: string,
  stat_type: string,
  game_id: string,
  totalrequests: number,
  away_team_slug:string,
  home_team_slug:string,
  away:string,
  home:string,
  away_team_id:string,
  home_team_id:string
}
