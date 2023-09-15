import { cloneDeep, isEqual, uniqWith } from 'lodash';
import {
  IArticles,
  ILeagueConferences,
  ILeagueDivisions,
  ITweets,
} from './../home/home.models';
import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { Article, ILeagues, League, Tweets } from '../home/home.models';
import { IWriter, Writer } from '../writer/writer.models';
import {
  LeagueAction_GetConferenceDivisions,
  LeagueAction_GetLeague,
  LeagueAction_GetLeagueArticles,
  LeagueAction_GetLeagueConferences,
  LeagueAction_GetLeagueStandings,
  leagueAction_GetLeagueUpcomingGames,
  leagueAction_GetLeagueWriters,
  LeagueAction_GetTrendingArticles,
  LeagueAction_GetConferenceTweets,
  LeagueAction_GetTweets,
  LeagueAction_GetLeagueQuote,
  LeagueAction_GetTrendingContents,
} from './league.actions';
import { LeagueService } from './league.service';
import { CollapsedConferenceData, ILeagueUpcomingGames } from './league.models';
import {
  TeamAction_GetTeamGameResults,
  TeamAction_GetUpcomingGameSchedule,
} from '../team/team.actions';
import { TeamService } from '../team/team.service';
import { IStandings } from '../team/team.models';

export class LeagueStateModel {
  public league: League;
  public leagueQuote: any;
  public selectedArticle: Article;
  public selectedArticleRelatedStories: Article[];
  public leagueArticles: Article[];
  public leagueTweets: Tweets;
  public leagueConferenceTweets: Tweets;
  public trendingArticles: Article[];
  public trendingContents: Article[];
  public leagueWriters: Writer[];
  public conferenceDivisionData: CollapsedConferenceData[];
  public leagueStandings: IStandings;
  public leagueUpcomingGames: ILeagueUpcomingGames;

  // loaders
  public leagueLoading: boolean;
  public selectedArticleLoading: boolean;
  public leagueArticlesLoading: boolean;
  public trendingArticlesLoading: boolean;
  public trendingContentsLoading: boolean;
  public selectedArticleRelatedStoriesLoading: boolean;
  public isWritersLoading: boolean;
}

const defaults = {
  league: null,
  leagueQuote: null,
  selectedArticle: null,
  selectedArticleRelatedStories: [],
  leagueArticles: [],
  leagueTweets: null,
  leagueConferenceTweets: null,
  trendingArticles: [],
  trendingContents: [],
  leagueWriters: [],
  conferenceDivisionData: [],
  leagueStandings: null,
  leagueUpcomingGames: null,

  // loaders
  leagueLoading: false,
  selectedArticleLoading: false,
  leagueArticlesLoading: false,
  trendingArticlesLoading: false,
  trendingContentsLoading: false,
  selectedArticleRelatedStoriesLoading: false,
  isWritersLoading: false,
};

@State<LeagueStateModel>({
  name: 'league',
  defaults,
})
@Injectable()
export class LeagueState {
  constructor(
    private leagueService: LeagueService,
    private teamService: TeamService
  ) {}

  @Action(LeagueAction_GetLeague)
  getLeague(
    { patchState, dispatch }: StateContext<LeagueStateModel>,
    { slug }: LeagueAction_GetLeague
  ) {
    patchState({ league: null, leagueWriters: [], leagueLoading: true });
    return this.leagueService.getLeague(slug).pipe(
      tap((response: ILeagues) => {
        const league = response.data[0];
        const leagName = league.name.toLowerCase();

        let str;
        dispatch([
          new leagueAction_GetLeagueWriters(league.id),
          new LeagueAction_GetLeagueArticles(league?.name, 1, 10, 'DESC'),
          new LeagueAction_GetTrendingArticles(league.name, 4, 'DESC'),
          new LeagueAction_GetTrendingContents(league.name, 4, 'DESC'),
          new LeagueAction_GetLeagueConferences(league.id),
          new LeagueAction_GetConferenceTweets(league.twitter_handle, 7),
          new LeagueAction_GetLeagueStandings(leagName, str, str, str),
          new TeamAction_GetTeamGameResults(
            leagName.toUpperCase(),
            str,
            str,
            str
          ),
          new TeamAction_GetUpcomingGameSchedule(
            leagName.toUpperCase(),
            str,
            str,
            str
          ),
        ]);
        patchState({ league: league, leagueLoading: false });
      })
    );
  }

  @Action(LeagueAction_GetLeagueQuote)
  getLeagueQuote(
    { patchState }: StateContext<LeagueStateModel>,
    { slug, token }: LeagueAction_GetLeagueQuote
  ) {
    return this.leagueService.getLeagueQuote(slug, token).pipe(
      tap((response: any) => {
        let res = response.data[0];
        patchState({ leagueQuote: res, leagueLoading: false });
      })
    );
  }

  @Action(LeagueAction_GetLeagueConferences)
  getLeagueConferences(
    { dispatch, patchState }: StateContext<LeagueStateModel>,
    { league_id }: LeagueAction_GetLeagueConferences
  ) {
    return this.leagueService.getLeagueConferences(league_id).pipe(
      tap((response: ILeagueConferences) => {
        const conferences = response.data;
        let data: CollapsedConferenceData[] = [];

        conferences.forEach((conference) => {
          data.push({
            conference: conference.name,
            conference_id: conference.id,
            conference_slug: conference.slug,
            conference_league_name: conference.league_name.toLocaleLowerCase(),
            divisions: [],
          });
        });
        patchState({ conferenceDivisionData: data });

        conferences.forEach((conference) => {
          dispatch(
            new LeagueAction_GetConferenceDivisions(conference.id, data)
          );
        });
      })
    );
  }

  @Action(LeagueAction_GetConferenceDivisions)
  getConferenceDivisions(
    { patchState, getState }: StateContext<LeagueStateModel>,
    { league_conference_id }: LeagueAction_GetConferenceDivisions
  ) {
    return this.leagueService.getConferenceDivisions(league_conference_id).pipe(
      tap((response: ILeagueDivisions) => {
        const _conferences = cloneDeep(getState()?.conferenceDivisionData);
        const divisions = response.data;
        _conferences.forEach((conference) => {
          divisions.forEach((division) => {
            if (conference.conference_id === division.league_conference_id) {
              // conference.divisions = [...conference.divisions, {
              //    division: division.name,
              //    division_id: division.id,
              //   division_slug: division.slug,
              //   division_display_name: division.division_display_name,
              //   }]
              const foundObj = conference.divisions.find(
                (obj: any) => obj.division_id === division.id
              );
              if (!foundObj) {
                conference.divisions.push({
                  division: division.name,
                  division_id: division.id,
                  division_slug: division.slug,
                  division_display_name: division.division_display_name,
                });
              }
            }
          });
        });
        patchState({ conferenceDivisionData: _conferences });
      })
    );
  }

  @Action(LeagueAction_GetLeagueArticles)
  getTeamArticles(
    { patchState }: StateContext<LeagueStateModel>,
    { league, page, size, sort_order }: LeagueAction_GetLeagueArticles
  ) {
    patchState({ leagueArticlesLoading: true });
    return this.leagueService
      .getLeagueArticles(league, page, size, sort_order)
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
          if (response.data) {
            patchState({ leagueArticles: data, leagueArticlesLoading: false });
          }
        })
      );
  }

  @Action(LeagueAction_GetTweets)
  getTeamTweets(
    { patchState }: StateContext<LeagueStateModel>,
    { username, limit }: LeagueAction_GetTweets
  ) {
    return this.leagueService.getTweetsByUserName(username, limit).pipe(
      tap((response: ITweets) => {
        patchState({ leagueTweets: response.data });
      })
    );
  }
  @Action(LeagueAction_GetConferenceTweets)
  getConferenceTweets(
    { patchState }: StateContext<LeagueStateModel>,
    { username, limit }: LeagueAction_GetConferenceTweets
  ) {
    return this.leagueService.getTweetsByUserName(username, limit).pipe(
      tap((response: ITweets) => {
        patchState({ leagueConferenceTweets: response.data });
      })
    );
  }

  @Action(LeagueAction_GetTrendingArticles)
  getTrendingArticles(
    { patchState }: StateContext<LeagueStateModel>,
    { league, size, sort_order }: LeagueAction_GetTrendingArticles
  ) {
    patchState({ trendingArticlesLoading: true });
    return this.leagueService
      .getTrendingArticles(league, size, sort_order)
      .pipe(
        tap((response: IArticles) => {
          patchState({
            trendingArticles: response.data,
            trendingArticlesLoading: false,
          });
        })
      );
  }

  @Action(LeagueAction_GetTrendingContents)
  getTrendingContents(
    { patchState }: StateContext<LeagueStateModel>,
    { league, size, sort_order }: LeagueAction_GetTrendingContents
  ) {
    patchState({ trendingContentsLoading: true });
    return this.leagueService
      .getTrendingContents(league, size, sort_order)
      .pipe(
        tap((response: IArticles) => {
          patchState({
            trendingContents: response.data,
            trendingContentsLoading: false,
          });
        })
      );
  }

  @Action(LeagueAction_GetLeagueStandings)
  getLeagueStandings(
    { patchState }: StateContext<LeagueStateModel>,
    { league_name }: LeagueAction_GetLeagueStandings
  ) {
    let str;
    return this.teamService.getStandings(league_name, str, str, str).pipe(
      tap((response: any) => {
        const standings = cloneDeep(response);
        // standings.data.sort()
        let stand = standings.data.sort((a, b) =>
          a.conference > b.conference ? 1 : b.conference > a.conference ? -1 : 0
        );
        let standing = stand.sort((a, b) =>
          a.division > b.division ? 1 : b.division > a.division ? -1 : 0
        );

        let finalArr = [];
        var confsObj = {};
        var uniqConfArr = [];

        //get unique conferences in seperate arr
        for (var item, i = 0; (item = standings.data[i++]); ) {
          var name = item.league_conference_name;
          if (!(name in confsObj)) {
            confsObj[name] = 1;
            uniqConfArr.push(name);
          }
        }

        //get all divisions, teams,stats against unique conferences
        let uniqueConfsData = [],
          uniqConfsObj: any = {},
          conferenceSlug: string;
        uniqConfArr.forEach((i, index) => {
          standings.data.forEach((j) => {
            if (i === j.league_conference_name) {
              conferenceSlug = j.league_conference_slug;
              uniqueConfsData.push({
                divisionName: j.division,
                team: j,
              });
            }
          });

          uniqConfsObj[index] = {
            conferenceName: i,
            conferenceSlug: conferenceSlug,
            divisions: uniqueConfsData,
          };
          uniqueConfsData = [];
        });

        let uniqDivArr = [];

        uniqConfArr.forEach((conf, i) => {
          let temp: any = Object.values(uniqConfsObj)[i];

          //get unique divisions in seperate arr against conf
          uniqDivArr = [...new Set(temp.divisions.map((d) => d.divisionName))];

          //get all teams,stats against unique division
          let uniqueDivsData = [],
            uniqDivsObj: any = {},
            divisionSlug: string;
          uniqDivArr.forEach((i, index) => {
            temp.divisions.forEach((j) => {
              if (i === j.divisionName) {
                divisionSlug = j.team.division_slug;
                uniqueDivsData.push(j.team);
              }
            });
            uniqDivsObj[index] = {
              divisionName: i,
              divisionSlug: divisionSlug,
              teams: uniqueDivsData,
            };
            uniqueDivsData = [];
          });

          //finalArr = sorted divs having uniq teams, into confs obj
          finalArr = [
            ...finalArr,
            {
              conferenceName: conf,
              conferenceSlug: conferenceSlug,
              divisions: uniqDivsObj,
            },
          ];
        });

        let a = {
          data: finalArr,
          totalRecords: 0,
          size: 0,
          page: 0,
        };
        patchState({
          leagueStandings: a,
        });
      })
    );
  }

  @Action(leagueAction_GetLeagueWriters)
  getLeagueWriters(
    { patchState, dispatch }: StateContext<LeagueStateModel>,
    { league_id }: leagueAction_GetLeagueWriters
  ) {
    patchState({ isWritersLoading: true });
    return this.leagueService.getLeagueWriters(league_id).pipe(
      tap((response: IWriter) => {
        if (response.data[0]?.twitter_handle !== undefined) {
          dispatch(
            new LeagueAction_GetTweets(response.data[0]?.twitter_handle, 7)
          );
        }
        patchState({ leagueWriters: response.data, isWritersLoading: false });
      })
    );
  }
}
