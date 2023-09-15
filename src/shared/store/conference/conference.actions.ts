export class ConferenceAction_GetConference {
  static readonly type = '[Conference] Get Conference';
  constructor(public slug: string, public league?: string) {}
}

export class ConferenceAction_GetConferenceDivisions {
  static readonly type = '[League] Get Conference Divisions';
  constructor(public league_conference_id: string | number) {}
}

export class ConferenceAction_GetConferenceTeams {
  static readonly type = '[League] Get Conference Teams';
  constructor(public league_conference_id: string | number) {}
}

export class ConferenceAction_GetConferenceArticles {
  static readonly type = '[Conference] Get Conference Articles';
  constructor(
    public conference: string,
    public page?: number,
    public size?: number,
    public sort_order?: 'ASC' | 'DESC'
  ) {}
}

export class ConferenceAction_GetArticle {
  static readonly type = '[Conference] Get Article';
  constructor(public slug: string) {}
}

export class ConferenceAction_GetTweets {
  static readonly type = '[Conference] Get Tweets';
  constructor(public username: string, public limit?: number) {}
}

export class ConferenceAction_GetTeamTweets {
  static readonly type = '[Conference] Get Team Tweets';
  constructor(public username: string, public limit?: number) {}
}

export class ConferenceAction_GetTrendingArticles {
  static readonly type = '[Conference] Get Trending Articles';
  constructor(
    public conference: string,
    public size?: number,
    public sort_order?: 'ASC' | 'DESC'
  ) {}
}

export class ConferenceAction_GetTrendingContents {
  static readonly type = '[Conference] Get Trending Contents';
  constructor(
    public conference: string,
    public size?: number,
    public sort_order?: 'ASC' | 'DESC'
  ) {}
}

export class ConferenceAction_GetConferenceStandings {
  static readonly type = '[Home] Get Conference Standings';
  constructor(public league_name: string, public conference_name: string) {}
}

export class ConferenceAction_GetConferenceUpcomingGames {
  static readonly type = '[Home] Get Conference Upcoming Games';
  constructor(public league_name: string) {}
}

export class ConferenceAction_GetConferenceWriters {
  static readonly type = '[Home] Get Conference Writers';
  constructor(public league_conference_id: string | number) {}
}
