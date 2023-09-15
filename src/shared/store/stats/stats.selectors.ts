// import { TeamState, TeamStateModel } from './sportsfeed-statistic.state';
import { Selector } from '@ngxs/store';
import { IStats, NhlScoringStats } from './stats.models';
import { StatsState, StatsStateModel } from './stats.state';

export class StatsSelectors {


  @Selector([StatsState]) static nhlScoringStats( state: StatsStateModel ): NhlScoringStats { return state.nhlScoringStats}
 
  @Selector([StatsState]) static stats( state: StatsStateModel ): IStats { return state.stats}

  @Selector([StatsState]) static playerstats( state: StatsStateModel ): IStats { return state.playerstats}

  @Selector([StatsState]) static teamFilters( state: StatsStateModel ): { team: string }[] { return state.teamsFilters}

  @Selector([StatsState]) static posFilters( state: StatsStateModel ): { position: string }[] { return state.posFilters}

  @Selector([StatsState]) static seasonFilters( state: StatsStateModel ): { season: string }[] { return state.seasonFilters}

  @Selector([StatsState]) static sizeFilters( state: StatsStateModel ): { size: string }[] { return [{ size: "10"}, { size: "20"}, { size: "50"}, { size: "100"}]}

  @Selector([StatsState]) static statsLoading( state: StatsStateModel ): boolean { return state.statsLoading}
 
  

}