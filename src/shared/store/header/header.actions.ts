export class HeaderAction_GetCities {
  static readonly type = '[Header] Get Cities';
}

export class HeaderAction_GetLeagues {
  static readonly type = '[Header] Get Leagues';
  constructor(
    public id?: string | number,
    public page?: number, 
    public size?: number
  ) {}
}

export class HeaderAction_AdjustConferences {
  static readonly type = '[Header] Adjust Conferences';
  constructor() {}
}

export class HeaderAction_AdjustDivisions {
  static readonly type = '[Header] Adjust Divisions';
  constructor() {}
}

export class HeaderAction_AdjustTeams {
  static readonly type = '[Header] Adjust Teams';
  constructor(public id: number) {}
}

export class HeaderAction_GetLeagueConferences {
  static readonly type = '[Header] Get League Conferences';
  constructor(
    public league_id:  number,
    public page?: number, 
    public size?: number  
  ) {}
}

export class HeaderAction_GetLeagueDivisions {
  static readonly type = '[Header] Get League Divisions';
  constructor(
    public league_id: number,
    public page?: number, 
    public size?: number  
  ) {}
}

export class HeaderAction_GetLeagueTeams {
  static readonly type = '[Header] Get League Teams';
  constructor(
    public division_id: string | number, 
    public page?: number, 
    public size?: number
  ) {}
}