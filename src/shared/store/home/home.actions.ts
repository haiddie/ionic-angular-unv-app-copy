export class HomeAction_GetCities {
  static readonly type = '[Home] Get Cities';
}

export class HomeAction_GetLeagues {
  static readonly type = '[Home] Get Leagues';
  constructor(
    public id?: string | number,
    public page?: number, 
    public size?: number
  ) {}
}

export class HomeAction_GetLeagueConferences {
  static readonly type = '[Home] Get League Conferences';
  constructor(
    public league_id: string | number,
    public page?: number, 
    public size?: number  
  ) {}
}

export class HomeAction_GetLeagueDivisions {
  static readonly type = '[Home] Get League Divisions';
  constructor(
    public conference_league_id: string | number,
    public page?: number, 
    public size?: number  
  ) {}
}

export class HomeAction_GetLeagueTeams {
  static readonly type = '[Home] Get League Teams';
  constructor(
    public division_id?: string | number, 
    public page?: number, 
    public size?: number
  ) {}
}

export class HomeAction_GetLeagueTeam {
  static readonly type = '[Home] Get League Team';
  constructor(
    public id: string | number
  ) {}
}

export class HomeAction_GetArticles {
  static readonly type = '[Home] Get Articles';
  constructor(
    public id?: string | number, 
    public league?: string, 
    public keywords?: string, 
    public author?: string,
    public team?: string,
    public city?: string,
    public is_editor_pick?: boolean,
    public page?: number, 
    public size?: number
  ) {}
}

export class HomeAction_GetEditorPicksArticles {
  static readonly type = '[Home] Get Editor Picks Articles';
  constructor(
    public is_editor_pick: boolean,
    public page?: number, 
    public size?: number
  ) {}
}

export class HomeAction_GetRecentlyAddedWriters {
  static readonly type = '[Home] Get Recently Added Writers';
  constructor(
    public writer: boolean,
    public page?: number, 
    public size?: number,
    public sort_order?: 'ASC' | 'DESC',
    public sort_by?: string,
  ) {}
}
export class HomeAction_GetWritersByRanking {
  static readonly type = '[Home] Get Writers By Ranking';
  constructor(
    public writer: boolean,
    public page?: number, 
    public size?: number,
    public sort_order?: 'ASC' | 'DESC',
    public sort_by?: string,
  ) {}
}


export class HomeAction_GetCityArticles {
  static readonly type = '[Home] Get Home City Articles';
  constructor(
    public city: string,
    public page?: number, 
    public size?: number
  ) {}
}

export class HomeAction_GetSingleArticle {
  static readonly type = '[Home] Get Single Article';
  constructor(
    public id: string | number,
  ) {}
}

export class HomeAction_GetTeamArticles {
  static readonly type = '[Home] Get Team Articles';
  constructor(
    public team: string,
    public page?: number, 
    public size?: number
  ) {}
}

export class HomeAction_GetLeagueArticles {
  static readonly type = '[Home] Get League Articles';
  constructor(
    public league: string,
    public page?: number, 
    public size?: number
  ) {}
}

export class HomeAction_GetNFLArticles {
  static readonly type = '[Home] Get NFL Articles';
  constructor(
    public page?: number, 
    public size?: number
  ) {}
}

export class HomeAction_GetNHLArticles {
  static readonly type = '[Home] Get NHL Articles';
  constructor(
    public page?: number, 
    public size?: number
  ) {}
}

export class HomeAction_GetNBAArticles {
  static readonly type = '[Home] Get NBA Articles';
  constructor(
    public page?: number, 
    public size?: number
  ) {}
}

export class HomeAction_GetMLBArticles {
  static readonly type = '[Home] Get MLB Articles';
  constructor(
    public page?: number, 
    public size?: number
  ) {}
}
