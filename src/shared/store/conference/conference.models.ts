
export interface IConferenceStandings {
    teams: any,
    // references: teamStateReference[]
  }
  
  export interface  standings {
    team : any,
    stats: any, 
    overallRank: any[],
    conferenceRank: any,
    divisionRank: any,
    playoffRank: any,
  }
  export interface IConferenceUpcomingGames {
    games: gameSchedule[]
  }
  
  export interface gameSchedule {
    schedule: any
  }
  
  
  