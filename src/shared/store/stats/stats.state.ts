import { cloneDeep } from 'lodash';
import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';

import { tap } from 'rxjs/operators';
import { IWriter, Writer } from '../writer/writer.models';
import { StatsService } from './stats.service';
import { IStats, NhlScoringStats } from './stats.models';
import { StatsAction_GetNhlScoringStats, StatsAction_GetPlayerStats, StatsAction_GetStats, StatsAction_GetStatsPosFilters, StatsAction_GetStatsSeasonFilters, StatsAction_GetStatsTeamFilters } from './stats.actions';
import { BehaviorSubject } from 'rxjs';


export class StatsStateModel {
  public nhlScoringStats : NhlScoringStats
  public stats : IStats
  public playerstats : IStats
  public teamsFilters: { team: string }[];
  public posFilters: { position: string }[];
  public seasonFilters: { season: string }[];
  public statsLoading: boolean;
 
}

const defaults = {
  nhlScoringStats: null,
  stats: null,
  playerstats:null,
  teamsFilters: [],
  posFilters: [],
  seasonFilters: [],
  statsLoading: false
};

@State<StatsStateModel>({
  name: 'stats',
  defaults
})
@Injectable()
export class StatsState {

  constructor(private statsService: StatsService) {}



  @Action(StatsAction_GetStats)
  getStats(
    { patchState}: StateContext<StatsStateModel>,
    { league_name,
      type,
      property,
      sort_order,
      page,
      size,
      player_name,
      team,
      position,
      season,
      pool,
      team_id,
      league_conference_id,
      division_id
    }: StatsAction_GetStats
  ) {
    patchState({ statsLoading: true })
    return this.statsService.getStats(league_name, type, property, sort_order, page, size, player_name, team, position, season,pool, team_id, league_conference_id, division_id).pipe(
      tap((response: IStats) => {
   console.log('stats',response)
          patchState({ stats : response, statsLoading: false })
        
        
      })
    )
  }

  @Action(StatsAction_GetPlayerStats)
  getPlayerStats(
    { patchState}: StateContext<StatsStateModel>,
    { league_name,
      type,
      property,
      sort_order,
      page,
      size,
      player_slug,
      team,
      position,
      season,
      team_id,
      league_conference_id,
      division_id
    }: StatsAction_GetPlayerStats
  ) {
    patchState({ statsLoading: true })
    return this.statsService.getPlayerStats(league_name, type, property, sort_order, page, size, player_slug, team, position, season, team_id, league_conference_id, division_id).pipe(
      tap((response: IStats) => {

            patchState({ playerstats : response, statsLoading: false }); 
          
           
      })
    )
  }

  @Action(StatsAction_GetStatsTeamFilters)
  getStatsTeamFilters(
    { patchState}: StateContext<StatsStateModel>,
    { column, league }: StatsAction_GetStatsTeamFilters
  ) {
    // patchState({ statsLoading: true })
    return this.statsService.getStatsFilters(column, league).pipe(
      tap((response) => {
        patchState({ teamsFilters : response.data })
      })
    )
  }

  @Action(StatsAction_GetStatsSeasonFilters)
  getStatsSeasonFilters(
    { patchState}: StateContext<StatsStateModel>,
    { column, league }: StatsAction_GetStatsSeasonFilters
  ) {
    // patchState({ statsLoading: true })
    return this.statsService.getStatsFilters(column, league).pipe(
      tap((response) => {
        patchState({ seasonFilters : response.data })
      })
    )
  }

  @Action(StatsAction_GetStatsPosFilters)
  getStatsPosFilters(
    { patchState}: StateContext<StatsStateModel>,
    { column, league }: StatsAction_GetStatsPosFilters
  ) {
    // patchState({ statsLoading: true })
    return this.statsService.getStatsFilters(column, league).pipe(
      tap((response) => {
        patchState({ posFilters : response.data })
      })
    )
  }
 
}