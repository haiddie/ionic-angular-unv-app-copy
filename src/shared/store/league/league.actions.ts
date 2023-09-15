import { CollapsedConferenceData } from './league.models';

export class LeagueAction_GetLeague {
  static readonly type = '[League] Get League';
  constructor(public slug: string) {}
}

export class LeagueAction_GetLeagueQuote {
  static readonly type = '[League] Get League Quote';
  constructor(public slug: string, public token?: string) {}
}

export class LeagueAction_GetLeagueConferences {
  static readonly type = '[League] Get League Conferences';
  constructor(public league_id: string | number) {}
}

export class LeagueAction_GetConferenceDivisions {
  static readonly type = '[League] Get Conference Divisions';
  constructor(
    public league_conference_id: string | number,
    public conferences: CollapsedConferenceData[]
  ) {}
}

export class LeagueAction_GetLeagueArticles {
  static readonly type = '[League] Get League Articles';
  constructor(
    public league: string,
    public page?: number,
    public size?: number,
    public sort_order?: 'ASC' | 'DESC'
  ) {}
}

export class LeagueAction_GetArticle {
  static readonly type = '[League] Get Article';
  constructor(public slug: string) {}
}

export class LeagueAction_GetTweets {
  static readonly type = '[League] Get Tweets';
  constructor(public username: string, public limit?: number) {}
}

export class LeagueAction_GetConferenceTweets {
  static readonly type = '[League] Get Conference Tweets';
  constructor(public username: string, public limit?: number) {}
}

export class LeagueAction_GetTrendingArticles {
  static readonly type = '[League] Get Trending Articles';
  constructor(
    public league: string,
    public size?: number,
    public sort_order?: 'ASC' | 'DESC'
  ) {}
}

export class LeagueAction_GetTrendingContents {
  static readonly type = '[League] Get Trending Contents';
  constructor(
    public league: string,
    public size?: number,
    public sort_order?: 'ASC' | 'DESC'
  ) {}
}

export class LeagueAction_GetLeagueStandings {
  static readonly type = '[Home] Get League Standings';
  constructor(
    public league_name: string,
    public team_id: number,
    public league_conference_id: number,
    public division_id: number
  ) {}
}
export class leagueAction_GetLeagueUpcomingGames {
  static readonly type = '[Home] Get League Upcoming Games';
  constructor(public league_name: string) {}
}

export class leagueAction_GetLeagueWriters {
  static readonly type = '[Home] Get League Writers';
  constructor(public league_id: number) {}
}
