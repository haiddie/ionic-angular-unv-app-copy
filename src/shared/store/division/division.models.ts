export interface IDivisionStandings {
    teams: standingDivisionTeams[],
    // references: teamStateReference[]
  }
  
  export interface  standingDivisionTeams {
    team : any[],
    stats: any[], 
    overallRank: any[],
    conferenceRank: any,
    divisionRank: any,
  }
  
  export interface IDivisionUpcomingGames {
  games: gameSchedule[]
}

export interface gameSchedule {
  schedule: any
}

