export interface NhlScoringStats {
  playerStatsTotals: any;
  total: number
}


export interface IStats {
  data: Stat[];
  totalRecords: string | number;
  page: number;
  size: number
}

export interface Stat {
   player_id: number;
   player_name: string;
   team: string; 
   team_id: number;
   league: string;
   gamesplayed: number;
   scoring: scoring;
   penality?: any,
   stat_obj?: any,
   totalrequest?:any
      
}

export interface scoring {
   goals: number;
   assists: number;
   primaryAssists: number;
   powerplayPrimaryAssists: number;
   shorthandedPrimaryAssists: number;
   secondaryAssists: number;
   powerplaySecondaryAssists: number;
   shorthandedSecondaryAssists: number;
   points: number;
   hatTricks: number;
   powerplayGoals: number;
   powerplayAssists: number;
   powerplayPoints: number;
   shorthandedGoals: number;
   shorthandedAssists: number;
   shorthandedPoints: number;
   gameWinningGoals: number;
   gameTyingGoals: number;
   overtimeGoals: number;
   shootoutAttempts: number;
   shootoutMisses: number;
   shootoutGoals: number;
   shootoutGoalPercent: number
  }
