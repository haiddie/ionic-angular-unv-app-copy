import { MenuItem } from './header.models';

import { Selector } from '@ngxs/store';
import { City, League, LeagueConference, LeagueDivision, LeagueTeam, Article } from '../home/home.models';
import { HeaderState, HeaderStateModel } from './header.state';

export class HeaderSelectors {

  // @Selector([HeaderState]) static cities(state: HeaderStateModel): Array<City> {return state.cities}

  @Selector([HeaderState]) static leagues(state: HeaderStateModel): Array<League> {return state.leagues}

  @Selector([HeaderState]) static menuItems(state: HeaderStateModel): MenuItem[] {return state.menuItems}

  @Selector([HeaderState]) static leagueDivisionsFetched(state: HeaderStateModel): number[] {return state.leagueDivisionsFetched}

  // @Selector([HeaderState]) static leagueConferences(state: HeaderStateModel): Array<LeagueConference> {return state.leagueConferences}

  // @Selector([HeaderState]) static leagueDivisions(state: HeaderStateModel): Array<LeagueDivision> {return state.leagueDivisions}

  // @Selector([HeaderState]) static leagueTeams(state: HeaderStateModel): Array<LeagueTeam> {return state.leagueTeams}
  
  
}