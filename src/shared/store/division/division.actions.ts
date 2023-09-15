export class DivisionAction_GetDivision {
  static readonly type = '[Division] Get Division';
  constructor(public slug: string, public token?: string) {}
}

export class DivisionAction_GetDivisionTeams {
  static readonly type = '[League] Get Division Teams';
  constructor(public division_id: string | number) {}
}

export class DivisionAction_GetDivisionArticles {
  static readonly type = '[Division] Get Division Articles';
  constructor(
    public division: string,
    public page?: number,
    public size?: number,
    public sort_order?: 'ASC' | 'DESC'
  ) {}
}

export class DivisionAction_GetArticle {
  static readonly type = '[Division] Get Article';
  constructor(public slug: string) {}
}

export class DivisionAction_GetTweets {
  static readonly type = '[Division] Get Tweets';
  constructor(public username: string, public limit?: number) {}
}
export class DivisionAction_GetWriterTweets {
  static readonly type = '[Division] Get Writer Tweets';
  constructor(public username: string, public limit?: number) {}
}

export class DivisionAction_GetTrendingArticles {
  static readonly type = '[Division] Get Trending Articles';
  constructor(
    public division: string,
    public size?: number,
    public sort_order?: 'ASC' | 'DESC'
  ) {}
}
export class DivisionAction_GetTrendingContents {
  static readonly type = '[Division] Get Trending Contents';
  constructor(
    public division: string,
    public size?: number,
    public sort_order?: 'ASC' | 'DESC'
  ) {}
}

export class DivisionAction_GetDivisionWriters {
  static readonly type = '[Division] Get Division Writers';
  constructor(public division_id: string | number) {}
}
export class DivisionAction_GetDivisionStandings {
  static readonly type = '[Home] Get Division Standings';
  constructor(
    public league_name: string,
    public division_name: string,
    public conference_name: string
  ) {}
}

export class DivisionAction_GetDivisionUpcomingGames {
  static readonly type = '[Home] Get Division Upcoming Games';
  constructor(public league_name: string) {}
}
