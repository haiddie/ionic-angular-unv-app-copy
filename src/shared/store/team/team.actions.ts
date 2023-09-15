export class TeamAction_GetTeam {
  static readonly type = '[Team] Get Team';
  constructor(public slug: string, public token?: string) {}
}

export class TeamAction_GetTeamArticles {
  static readonly type = '[Team] Get Team Articles';
  constructor(
    public team: string,
    public page?: number,
    public size?: number,
    public sort_order?: 'ASC' | 'DESC'
  ) {}
}

export class TeamAction_GetArticle {
  static readonly type = '[Team] Get Article';
  constructor(public slug: string) {}
}

export class TeamAction_GetTweets {
  static readonly type = '[Team] Get Tweets';
  constructor(public username: string, public limit?: number) {}
}

export class TeamAction_GetTrendingArticles {
  static readonly type = '[Team] Get Trending Articles';
  constructor(
    public team: string,
    public size?: number,
    public sort_order?: 'ASC' | 'DESC'
  ) {}
}

export class TeamAction_GetTrendingContents {
  static readonly type = '[Team] Get Trending Contents';
  constructor(
    public team: string,
    public size?: number,
    public sort_order?: 'ASC' | 'DESC'
  ) {}
}

export class TeamAction_GetCityTeams {
  static readonly type = '[Team] Get City Teams';
  constructor(
    public city: string,
    public page?: number,
    public size?: number
  ) {}
}

export class TeamAction_GetTeamWriters {
  static readonly type = '[Team] Get Team Writers';
  constructor(
    public team: string,
    public page?: number,
    public size?: number
  ) {}
}

// export class TeamAction_GetTeamStandings {
//   static readonly type = '[Home] Get Team Standings';
//   constructor(
//     public league_name: string,
//     public division_name: string,
//     public team_sportsFeed_key: string,
//     public conference_name: string
//   ) {}
// }

export class TeamAction_GetStandings {
  static readonly type = '[Home] Get Standings';
  constructor(
    public league_name: string,
    public team_id: number,
    public league_conference_id: number,
    public division_id: number
  ) {}
}

// export class TeamAction_GetTeamUpcomingGames {
//   static readonly type = '[Home] Get Team Upcoming Games';
//   constructor(
//     public league_name: string,
//     public team_ID: string,

//   ) {}
// }

export class TeamAction_GetUpcomingGameSchedule {
  static readonly type = '[Home] Get Upcoming Game Schedule';
  constructor(
    public league_name?: string,
    public team_ID?: number,
    public league_conference_ID?: number,
    public division_ID?: number
  ) {}
}

export class TeamAction_GetTeamGameResults {
  static readonly type = '[Home] Get Game Results';
  constructor(
    public league_name?: string,
    public team_ID?: number,
    public league_conference_ID?: number,
    public division_ID?: number
  ) {}
}

export class TeamAction_GetOffsensiveStats {
  static readonly type = '[Team] Get Offensive Stats';
  constructor(
    public stat_type: string,
    public stat_property: string,
    public stat_sort_order: string,
    public league_name?: string,
    public team_ID?: string,
    public league_conference_ID?: string,
    public division_ID?: string,
    public season?: string,
    public player_pool?: string
  ) {}
}

export class TeamAction_GetDefensiveStats {
  static readonly type = '[Team] Get Defensive Stats';
  constructor(
    public stat_type: string,
    public stat_property: string,
    public stat_sort_order: string,
    public league_name?: string,
    public team_ID?: string,
    public league_conference_ID?: string,
    public division_ID?: string,
    public season?: string,
    public player_pool?: string
  ) {}
}
