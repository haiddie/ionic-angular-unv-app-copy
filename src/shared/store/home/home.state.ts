import { HomeService } from './home.service';
import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';

import {
  HomeAction_GetArticles,
  HomeAction_GetCities,
  HomeAction_GetCityArticles,
  HomeAction_GetEditorPicksArticles,
  HomeAction_GetLeagueArticles,
  HomeAction_GetLeagueConferences,
  HomeAction_GetLeagueDivisions,
  HomeAction_GetLeagues,
  HomeAction_GetLeagueTeam,
  HomeAction_GetLeagueTeams,
  HomeAction_GetSingleArticle,
  HomeAction_GetTeamArticles,
  HomeAction_GetNFLArticles,
  HomeAction_GetNHLArticles,
  HomeAction_GetNBAArticles,
  HomeAction_GetMLBArticles,
  HomeAction_GetRecentlyAddedWriters,
  HomeAction_GetWritersByRanking,
} from './home.actions';

import {
  ICities,
  City,
  ILeagues,
  League,
  ILeagueConferences,
  LeagueConference,
  ILeagueDivisions,
  LeagueDivision,
  ILeagueTeams,
  LeagueTeam,
  Article,
  IArticles,
} from './home.models';

import { tap } from 'rxjs/operators';
import { Writer } from '../writer/writer.models';

export class HomeStateModel {
  public cities: City[];
  public leagues: League[];
  public leagueConferences: LeagueConference[];
  public leagueDivisions: LeagueDivision[];
  public leagueTeams: LeagueTeam[];
  public leagueArticles: {
    NFL: Article[];
    NHL: Article[];
    NBA: Article[];
    MLB: Article[];
  };
  public NFL_Articles: Article[];
  public NHL_Articles: Article[];
  public NBA_Articles: Article[];
  public MLB_Articles: Article[];
  public selectedTeam: LeagueTeam;
  public articles: Article[];
  public homeCityArticles: Article[];
  public selectedArticle: Article;
  public teamArticles: Article[];
  public editorPicksArticles: Article[];
  public recentlyAddedWriters: Writer[];
  public writersByRanking: Writer[];

  // loaders
  public editorPicksLoading: boolean;
  public cityArticlesLoading: boolean;
  public recentlyAddedWritersLoading: boolean;
  public writersByRankingLoading: boolean;

  // latest news loaders
  public NFL_ArticlesLoading: boolean;
  public NHL_ArticlesLoading: boolean;
  public NBA_ArticlesLoading: boolean;
  public MLB_ArticlesLoading: boolean;
}

const defaults = {
  cities: [],
  leagues: [],
  leagueConferences: [],
  leagueDivisions: [],
  leagueTeams: [],
  leagueArticles: { NFL: [], NHL: [], NBA: [], MLB: [] },
  NFL_Articles: [],
  NHL_Articles: [],
  NBA_Articles: [],
  MLB_Articles: [],
  selectedTeam: undefined,
  articles: [],
  homeCityArticles: [],
  selectedArticle: {},
  teamArticles: [],
  editorPicksArticles: [],
  recentlyAddedWriters: [],
  writersByRanking: [],

  // loaders
  editorPicksLoading: false,
  cityArticlesLoading: false,
  recentlyAddedWritersLoading: false,
  writersByRankingLoading: false,

  // latest news loaders
  NFL_ArticlesLoading: false,
  NHL_ArticlesLoading: false,
  NBA_ArticlesLoading: false,
  MLB_ArticlesLoading: false,
};

@State<HomeStateModel>({
  name: 'home',
  defaults,
})
@Injectable()
export class HomeState {
  constructor(private homeService: HomeService) {}

  @Action(HomeAction_GetCities)
  getCities({ patchState, dispatch }: StateContext<HomeStateModel>) {
    return this.homeService.getCities().pipe(
      tap((response: ICities) => {
        dispatch([
          new HomeAction_GetNFLArticles(1, 11),
          new HomeAction_GetEditorPicksArticles(true, 1, 7),
          new HomeAction_GetRecentlyAddedWriters(true, 1, 7),

          //new HomeAction_GetNHLArticles(1, 11),
        ]);
        patchState({ cities: response.data });
      })
    );
  }

  @Action(HomeAction_GetLeagues)
  getLeagues(
    { patchState }: StateContext<HomeStateModel>,
    { id }: HomeAction_GetLeagues
  ) {
    return this.homeService.getLeagues(id).pipe(
      tap((response: ILeagues) => {
        patchState({ leagues: response.data });
      })
    );
  }

  @Action(HomeAction_GetLeagueConferences)
  getLeagueConferences(
    { patchState }: StateContext<HomeStateModel>,
    { league_id, page, size }: HomeAction_GetLeagueConferences
  ) {
    return this.homeService.getLeagueConferences(league_id, page, size).pipe(
      tap((response: ILeagueConferences) => {
        patchState({ leagueConferences: response.data });
      })
    );
  }

  @Action(HomeAction_GetLeagueDivisions)
  getLeagueDivisions(
    { patchState }: StateContext<HomeStateModel>,
    { conference_league_id, page, size }: HomeAction_GetLeagueDivisions
  ) {
    return this.homeService
      .getLeagueDivisions(conference_league_id, page, size)
      .pipe(
        tap((response: ILeagueDivisions) => {
          patchState({ leagueDivisions: response.data });
        })
      );
  }

  @Action(HomeAction_GetLeagueTeams)
  getLeagueTeams(
    { patchState }: StateContext<HomeStateModel>,
    { division_id, page, size }: HomeAction_GetLeagueTeams
  ) {
    return this.homeService.getLeagueTeams(division_id, page, size).pipe(
      tap((response: ILeagueTeams) => {
        patchState({ leagueTeams: response.data });
      })
    );
  }

  @Action(HomeAction_GetLeagueTeam)
  getLeagueTeam(
    { patchState }: StateContext<HomeStateModel>,
    { id }: HomeAction_GetLeagueTeam
  ) {
    return this.homeService.getLeagueTeam(id).pipe(
      tap((response: ILeagueTeams) => {
        patchState({ selectedTeam: response.data[0] });
      })
    );
  }

  @Action(HomeAction_GetArticles)
  getArticles(
    { patchState }: StateContext<HomeStateModel>,
    {
      id,
      league,
      keywords,
      author,
      team,
      city,
      is_editor_pick,
    }: HomeAction_GetArticles
  ) {
    return this.homeService
      .getArticles(id, league, keywords, author, team, city, is_editor_pick)
      .pipe(
        tap((response: IArticles) => {
          patchState({ articles: response.data });
        })
      );
  }

  @Action(HomeAction_GetCityArticles)
  getCityArticles(
    { patchState }: StateContext<HomeStateModel>,
    { city, page, size }: HomeAction_GetCityArticles
  ) {
    patchState({ cityArticlesLoading: true });
    return this.homeService.getCityArticles(city, page, size).pipe(
      tap((response: IArticles) => {
        patchState({
          homeCityArticles: response.data,
          cityArticlesLoading: false,
        });
      })
    );
  }

  @Action(HomeAction_GetSingleArticle)
  getSingleArticle(
    { patchState }: StateContext<HomeStateModel>,
    { id }: HomeAction_GetSingleArticle
  ) {
    return this.homeService.getSingleArticle(id).pipe(
      tap((response: IArticles) => {
        patchState({ selectedArticle: response.data[0] });
      })
    );
  }

  @Action(HomeAction_GetTeamArticles)
  getTeamArticles(
    { patchState }: StateContext<HomeStateModel>,
    { team, page, size }: HomeAction_GetTeamArticles
  ) {
    return this.homeService.getTeamArticles(team, page, size).pipe(
      tap((response: IArticles) => {
        patchState({ teamArticles: response.data });
      })
    );
  }

  @Action(HomeAction_GetLeagueArticles)
  getLeagueArticles(
    { patchState, getState }: StateContext<HomeStateModel>,
    { league, page, size }: HomeAction_GetLeagueArticles
  ) {
    return this.homeService.getLeagueArticles(league, page, size).pipe(
      tap((response: IArticles) => {
        const _leagueArticles = JSON.parse(
          JSON.stringify(getState().leagueArticles)
        );
        _leagueArticles[league] = response.data;
        patchState({ leagueArticles: _leagueArticles });
      })
    );
  }

  @Action(HomeAction_GetEditorPicksArticles)
  getEditorPicksArticles(
    { patchState, getState }: StateContext<HomeStateModel>,
    { is_editor_pick, page, size }: HomeAction_GetEditorPicksArticles
  ) {
    patchState({ editorPicksLoading: true });
    return this.homeService
      .getEditorPicksArticles(is_editor_pick, page, size)
      .pipe(
        tap((response: IArticles) => {
          console.log('editor pick res data', response.data);
          patchState({
            editorPicksArticles: response.data,
            editorPicksLoading: false,
          });
        })
      );
  }

  @Action(HomeAction_GetRecentlyAddedWriters)
  getRecentlyAddedWriters(
    { patchState }: StateContext<HomeStateModel>,
    {
      writer,
      page,
      size,
      sort_order,
      sort_by,
    }: HomeAction_GetRecentlyAddedWriters
  ) {
    patchState({ recentlyAddedWritersLoading: true });
    return this.homeService
      .getRecentlyAddedWriters(writer, page, size, sort_order, sort_by)
      .pipe(
        tap((response: any) => {
          patchState({
            recentlyAddedWriters: response.data,
            recentlyAddedWritersLoading: false,
          });
        })
      );
  }

  @Action(HomeAction_GetWritersByRanking)
  getWritersByRanking(
    { patchState }: StateContext<HomeStateModel>,
    { writer, page, size, sort_order, sort_by }: HomeAction_GetWritersByRanking
  ) {
    patchState({ writersByRankingLoading: true });

    return this.homeService
      .getWritersByRanking(writer, page, size, sort_order, sort_by)
      .subscribe((response: any) => {
        patchState({
          writersByRanking: response.data,
          writersByRankingLoading: false,
        });
      });
  }
  @Action(HomeAction_GetNFLArticles)
  getNFLArticles(
    { patchState, dispatch }: StateContext<HomeStateModel>,
    { page, size }: HomeAction_GetNFLArticles
  ) {
    patchState({
      NFL_ArticlesLoading: true,
      NHL_ArticlesLoading: true,
      NBA_ArticlesLoading: true,
      MLB_ArticlesLoading: true,
    });
    return this.homeService.getLeagueArticles('NFL', page, size).pipe(
      tap((response: IArticles) => {
        let data = [];
        response.data.map((article) => {
          if (article.image !== null) {
            data.push(article);
          }
        });
        response.data.map((article) => {
          if (article.image === null) {
            data.push(article);
          }
        });
        dispatch([new HomeAction_GetNBAArticles(1, 11)]);
        patchState({ NFL_Articles: data, NFL_ArticlesLoading: false });
      })
    );
  }

  @Action(HomeAction_GetNHLArticles)
  getNHLArticles(
    { patchState, dispatch }: StateContext<HomeStateModel>,
    { page, size }: HomeAction_GetNHLArticles
  ) {
    patchState({ NHL_ArticlesLoading: true });
    return this.homeService.getLeagueArticles('NHL', page, size).pipe(
      tap((response: IArticles) => {
        let data = [];
        response.data.map((article) => {
          if (article.image !== null) {
            data.push(article);
          }
        });
        response.data.map((article) => {
          if (article.image === null) {
            data.push(article);
          }
        });
        dispatch([new HomeAction_GetMLBArticles(1, 11)]);
        patchState({ NHL_Articles: data, NHL_ArticlesLoading: false });
      })
    );
  }

  @Action(HomeAction_GetNBAArticles)
  getNBAArticles(
    { patchState, dispatch }: StateContext<HomeStateModel>,
    { page, size }: HomeAction_GetNBAArticles
  ) {
    patchState({ NBA_ArticlesLoading: true });
    return this.homeService.getLeagueArticles('NBA', page, size).pipe(
      tap((response: IArticles) => {
        let data = [];
        response.data.map((article) => {
          if (article.image !== null) {
            data.push(article);
          }
        });
        response.data.map((article) => {
          if (article.image === null) {
            data.push(article);
          }
        });
        dispatch([new HomeAction_GetNHLArticles(1, 11)]);
        patchState({ NBA_Articles: data, NBA_ArticlesLoading: false });
      })
    );
  }

  @Action(HomeAction_GetMLBArticles)
  getMLBArticles(
    { patchState }: StateContext<HomeStateModel>,
    { page, size }: HomeAction_GetMLBArticles
  ) {
    patchState({ MLB_ArticlesLoading: true });
    return this.homeService.getLeagueArticles('MLB', page, size).pipe(
      tap((response: IArticles) => {
        let data = [];
        response.data.map((article) => {
          if (article.image !== null) {
            data.push(article);
          }
        });
        response.data.map((article) => {
          if (article.image === null) {
            data.push(article);
          }
        });
        patchState({ MLB_Articles: data, MLB_ArticlesLoading: false });
      })
    );
  }
}
