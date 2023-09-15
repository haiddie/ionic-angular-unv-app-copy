

export class StatsAction_GetNhlScoringStats {
  static readonly type = '[Stats] Get Nhl Scoring Stats';
  constructor(
    public leagueName: string,
    public playerKeyword?: string
    ) { }
}


export class StatsAction_GetStats {
  static readonly type = '[Stats] Get Stats';
  constructor(
    public league_name: string,
    public type: string,
    public property: string,
    public sort_order: string,
    public page: string,
    public size: string,
    public player_name?: string,
    public team?: string,
    public position?: string,
    public season?: string,
    public pool?:string,
    public team_id?: string,
    public league_conference_id?: string,
    public division_id?: string,

  ) { }
}

export class StatsAction_GetPlayerStats {
  static readonly type = '[Stats] Get Player Stats';
  constructor(
    public league_name: string,
    public type: string,
    public property: string,
    public sort_order: string,
    public page: string,
    public size: string,
    public player_slug?: string,
    public team?: string,
    public position?: string,
    public season?: string,
    public team_id?: string,
    public league_conference_id?: string,
    public division_id?: string,

  ) { }
}

export class StatsAction_GetStatsTeamFilters {
  static readonly type = '[Stats] Get Team Stats Filters';
  constructor(
    public column: string,
    public league: string
  ) { }
}

export class StatsAction_GetStatsSeasonFilters {
  static readonly type = '[Stats] Get Season Stats Filters';
  constructor(
    public column: string,
    public league: string
  ) { }
}
export class StatsAction_GetStatsPosFilters {
  static readonly type = '[Stats] Get Pos Stats Filters';
  constructor(
    public column: string,
    public league: string
  ) { }
}