export interface CollapsedConferenceData {
  conference?: string,
  conference_id?: string | number,
  conference_slug?: string,
  conference_league_name?:string,
  divisions?: CollapsedDivisionsData[]
}

export interface CollapsedDivisionsData {
  division?: string,
  division_id?: string | number,
  division_slug?: string,
  division_display_name?: string,
}

// export interface IleagueStandings {
//   teams: any,
//   // references: teamStateReference[]
// }

// export interface  standings {
//   team : any,
//   stats: any, 
//   overallRank: any[],
//   conferenceRank: any,
//   divisionRank: any,
//   playoffRank: any,
// }

// export interface teamStateReference {

//   category: string,
//   fullName : string,
//   description: string,
//   abbreviation: string,
//   type : string
// }



export interface ILeagueUpcomingGames {
  games: gameSchedule[]
}

export interface gameSchedule {
  schedule: any
}

