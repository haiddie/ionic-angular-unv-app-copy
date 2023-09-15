import { cloneDeep } from 'lodash';
import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import {
  Article,
  IArticles,
  ILeagueDivisions,
  ITweets,
  LeagueDivision,
  Tweets,
} from '../home/home.models';
import { IWriter, Writer } from '../writer/writer.models';
import {
  DivisionAction_GetDivision,
  DivisionAction_GetDivisionArticles,
  DivisionAction_GetDivisionStandings,
  DivisionAction_GetDivisionTeams,
  DivisionAction_GetDivisionUpcomingGames,
  DivisionAction_GetDivisionWriters,
  DivisionAction_GetTrendingArticles,
  DivisionAction_GetTrendingContents,
  DivisionAction_GetTweets,
  DivisionAction_GetWriterTweets,
} from './division.actions';
import { DivisionService } from './division.service';
import { ITeam, Team } from '../team/team.models';
import { IDivisionStandings } from './division.models';
import { Observable } from 'rxjs';
import {
  TeamAction_GetStandings,
  TeamAction_GetTeamGameResults,
  TeamAction_GetUpcomingGameSchedule,
} from '../team/team.actions';
import { LeagueAction_GetLeagueQuote } from '../league/league.actions';
import { ContentAction_GetContents } from '../content/content.actions';

export class DivisionStateModel {
  public division: LeagueDivision;
  public selectedArticle: Article;
  public selectedArticleRelatedStories: Article[];
  public divisionArticles: Article[];
  public divisionTweets: any;
  public divisionWriterTweets: Tweets;
  public trendingArticles: Article[];
  public trendingContents: Article[];
  public divisionWriters: Writer[];
  public divisionTeams: Team[];

  // loaders
  public divisionLoading: boolean;
  public selectedArticleLoading: boolean;
  public divisionArticlesLoading: boolean;
  public trendingArticlesLoading: boolean;
  public trendingContentsLoading: boolean;
  public selectedArticleRelatedStoriesLoading: boolean;
  public isWritersLoading: boolean;
}

const defaults = {
  division: null,
  selectedArticle: null,
  selectedArticleRelatedStories: [],
  divisionArticles: [],
  divisionTweets: null,
  divisionWriterTweets: null,
  trendingArticles: [],
  trendingContents: [],
  divisionWriters: [],
  divisionTeams: [],
  divisionStandings: null,
  divisionUpcomingGames: null,

  // loaders
  divisionLoading: false,
  selectedArticleLoading: false,
  divisionArticlesLoading: false,
  trendingArticlesLoading: false,
  trendingContentsLoading: false,
  selectedArticleRelatedStoriesLoading: false,
  isWritersLoading: false,
};

@State<DivisionStateModel>({
  name: 'division',
  defaults,
})
@Injectable()
export class DivisionState {
  TeamTweets: any = [];
  constructor(private divisionService: DivisionService) {}

  @Action(DivisionAction_GetDivision)
  getDivision(
    { patchState, dispatch }: StateContext<DivisionStateModel>,
    { slug, token }: DivisionAction_GetDivision
  ) {
    patchState({ division: null, divisionWriters: [], divisionLoading: true });
    return this.divisionService.getDivision(slug).pipe(
      tap((response: ILeagueDivisions) => {
        const division = response.data[0];
        const leagName = division.league_name.toLowerCase();
        const divisionName = division.slug.split('-');
        let str;

        if (token != null && token !== undefined) {
          dispatch([
            new LeagueAction_GetLeagueQuote(leagName, token),
            new DivisionAction_GetDivisionWriters(division.id),
            // new DivisionAction_GetTweets(division.twitter_handle, 5),
            new DivisionAction_GetDivisionTeams(division.id),
            new TeamAction_GetTeamGameResults(
              division.league_name.toUpperCase(),
              str,
              str,
              division.id
            ),
            new TeamAction_GetStandings(
              division.league_name,
              str,
              str,
              division.id
            ),
            new TeamAction_GetUpcomingGameSchedule(
              division.league_name.toUpperCase(),
              str,
              str,
              division.id
            ),
          ]);
        } else {
          dispatch([
            // new LeagueAction_GetLeagueQuote(leagName,token),
            new DivisionAction_GetDivisionWriters(division.id),
            // new DivisionAction_GetTweets(division.twitter_handle, 5),
            new DivisionAction_GetDivisionTeams(division.id),
            new TeamAction_GetTeamGameResults(
              division.league_name.toUpperCase(),
              str,
              str,
              division.id
            ),
            new TeamAction_GetStandings(
              division.league_name,
              str,
              str,
              division.id
            ),
            new TeamAction_GetUpcomingGameSchedule(
              division.league_name.toUpperCase(),
              str,
              str,
              division.id
            ),
          ]);
        }

        patchState({ division: division, divisionLoading: false });
      })
    );
  }

  @Action(DivisionAction_GetDivisionTeams)
  getDivisionTeams(
    { patchState, dispatch }: StateContext<DivisionStateModel>,
    { division_id }: DivisionAction_GetDivisionTeams
  ) {
    return this.divisionService.getDivisionTeams(division_id).pipe(
      tap((response: ITeam) => {
        var teams: string[] = [];
        response.data.forEach((team) => {
          teams.push(team.name);
          if (team.twitter_handle !== undefined) {
            dispatch([new DivisionAction_GetTweets(team.twitter_handle, 3)]);
          }
        });
        let _teams = teams.toString();
        if (_teams) {
          dispatch([
            new DivisionAction_GetDivisionArticles(_teams, 1, 10, 'DESC'),
            new DivisionAction_GetTrendingArticles(_teams, 4, 'DESC'),
            new DivisionAction_GetTrendingContents(_teams, 4, 'DESC'),
            new ContentAction_GetContents(1, 6, '', _teams),
          ]);
        }
        patchState({ divisionTeams: response.data });
      })
    );
  }

  getRandomArbitrary(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  @Action(DivisionAction_GetDivisionArticles)
  getTeamArticles(
    { patchState }: StateContext<DivisionStateModel>,
    { division, page, size, sort_order }: DivisionAction_GetDivisionArticles
  ) {
    patchState({ divisionArticlesLoading: true });
    return this.divisionService
      .getDivisionArticles(division, page, size, sort_order)
      .pipe(
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
          patchState({
            divisionArticles: data,
            divisionArticlesLoading: false,
          });
        })
      );
  }

  // @Action(DivisionAction_GetDivisionWriters)
  // getDivisionWriters(
  //   { patchState, getState }: StateContext<DivisionStateModel>,
  //   { team, page, size }: DivisionAction_GetDivisionWriters
  // ) {
  //   return this.divisionService.getDivisionWriters(team, page, size).pipe(
  //     tap((response: IWriter) => {
  //       let writers = cloneDeep(getState()?.divisionWriters)
  //       writers = [...writers, ...response.data]
  //       patchState({ divisionWriters: writers })
  //     })
  //   )
  // }

  @Action(DivisionAction_GetDivisionWriters)
  getDivisionWriters(
    { patchState, dispatch }: StateContext<DivisionStateModel>,
    { division_id }: DivisionAction_GetDivisionWriters
  ) {
    patchState({ isWritersLoading: true });
    return this.divisionService.getDivisionWriters(division_id).pipe(
      tap((response: IWriter) => {
        if (response.data[0]?.twitter_handle !== undefined) {
          dispatch([
            new DivisionAction_GetWriterTweets(
              response.data[0]?.twitter_handle,
              7
            ),
          ]);
        }
        patchState({ divisionWriters: response.data, isWritersLoading: false });
      })
    );
  }

  @Action(DivisionAction_GetTweets)
  getTeamTweets(
    { patchState, getState }: StateContext<DivisionStateModel>,
    { username, limit }: DivisionAction_GetTweets
  ) {
    return this.divisionService
      .getTweetsByUserName(username, limit, 'DESC')
      .pipe(
        tap((response: ITweets) => {
          this.TeamTweets.push(response.data);
          let newArr = [{ tweets: [] }];
          for (let i = 0; i < this.TeamTweets.length - 1; i++) {
            if (this.TeamTweets[i].tweets) {
              for (let j = 0; j < 3; j++) {
                newArr[0].tweets.push(this.TeamTweets[i].tweets[j]);
              }
            }
          }

          patchState({ divisionTweets: newArr[0] });
        })
      );
  }

  @Action(DivisionAction_GetWriterTweets)
  getWriterTweets(
    { patchState, getState }: StateContext<DivisionStateModel>,
    { username, limit }: DivisionAction_GetWriterTweets
  ) {
    return this.divisionService.getTweetsByUserName(username, limit).pipe(
      tap((response: ITweets) => {
        patchState({ divisionWriterTweets: response.data });
      })
    );
  }

  @Action(DivisionAction_GetTrendingArticles)
  getTrendingArticles(
    { patchState }: StateContext<DivisionStateModel>,
    { division, size, sort_order }: DivisionAction_GetTrendingArticles
  ) {
    patchState({ trendingArticlesLoading: true });
    return this.divisionService
      .getTrendingArticles(division, size, sort_order)
      .pipe(
        tap((response: IArticles) => {
          patchState({
            trendingArticles: response.data,
            trendingArticlesLoading: false,
          });
        })
      );
  }
  @Action(DivisionAction_GetTrendingContents)
  getTrendingContents(
    { patchState }: StateContext<DivisionStateModel>,
    { division, size, sort_order }: DivisionAction_GetTrendingContents
  ) {
    patchState({ trendingContentsLoading: true });
    return this.divisionService
      .getTrendingContents(division, size, sort_order)
      .pipe(
        tap((response: IArticles) => {
          patchState({
            trendingContents: response.data,
            trendingContentsLoading: false,
          });
        })
      );
  }
}
