import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import {
  Article,
  IArticles,
  ILeagueConferences,
  ILeagueDivisions,
  ITweets,
  LeagueConference,
  LeagueDivision,
  Tweets,
} from '../home/home.models';
import {
  ConferenceAction_GetConference,
  ConferenceAction_GetConferenceArticles,
  ConferenceAction_GetConferenceDivisions,
  ConferenceAction_GetConferenceStandings,
  ConferenceAction_GetConferenceTeams,
  ConferenceAction_GetConferenceUpcomingGames,
  ConferenceAction_GetConferenceWriters,
  ConferenceAction_GetTrendingArticles,
  ConferenceAction_GetTweets,
  ConferenceAction_GetTeamTweets,
  ConferenceAction_GetTrendingContents,
} from './conference.actions';
import { ConferenceService } from './conference.service';
import { IWriter, Writer } from '../writer/writer.models';
import {
  IConferenceStandings,
  IConferenceUpcomingGames,
} from './conference.models';
import { cloneDeep, isEqual, uniqWith } from 'lodash';
import {
  TeamAction_GetStandings,
  TeamAction_GetTeamGameResults,
  TeamAction_GetUpcomingGameSchedule,
} from '../team/team.actions';
import { ITeam, Team } from '../team/team.models';
import { leagueAction_GetLeagueWriters } from '../league/league.actions';
import { ContentAction_GetContents } from '../content/content.actions';

export class ConferenceStateModel {
  public conference: LeagueConference;
  public selectedArticle: Article;
  public selectedArticleRelatedStories: Article[];
  public conferenceArticles: Article[];
  public conferenceTweets: Tweets;
  public conferenceTeamTweets: any;
  public trendingArticles: Article[];
  public trendingContents: Article[];
  public conferenceWriters: Writer[];
  public conferenceTeams: Team[];
  public conferenceDivisions: LeagueDivision[];
  public conferenceStandings: IConferenceStandings;
  public conferenceUpcomingGames: IConferenceUpcomingGames;

  // loaders
  public conferenceLoading: boolean;
  public selectedArticleLoading: boolean;
  public conferenceArticlesLoading: boolean;
  public trendingArticlesLoading: boolean;
  public trendingContentsLoading: boolean;
  public selectedArticleRelatedStoriesLoading: boolean;
  public isWritersLoading: boolean;
}

const defaults = {
  conference: null,
  selectedArticle: null,
  selectedArticleRelatedStories: [],
  conferenceArticles: [],
  conferenceTweets: null,
  conferenceTeamTweets: null,
  trendingArticles: [],
  trendingContents: [],
  conferenceWriters: [],
  conferenceTeams: [],
  conferenceDivisions: [],
  conferenceStandings: null,
  conferenceUpcomingGames: null,

  // loaders
  conferenceLoading: false,
  selectedArticleLoading: false,
  conferenceArticlesLoading: false,
  trendingArticlesLoading: false,
  trendingContentsLoading: false,
  selectedArticleRelatedStoriesLoading: false,
  isWritersLoading: false,
};

@State<ConferenceStateModel>({
  name: 'conference',
  defaults,
})
@Injectable()
export class ConferenceState {
  TeamTweets: any = [];
  constructor(private conferenceService: ConferenceService) {}

  @Action(ConferenceAction_GetConference)
  getConference(
    { patchState, dispatch }: StateContext<ConferenceStateModel>,
    { slug, league }: ConferenceAction_GetConference
  ) {
    patchState({
      conference: null,
      conferenceWriters: [],
      conferenceLoading: true,
    });
    return this.conferenceService.getConference(slug, league).pipe(
      tap((response: ILeagueConferences) => {
        const conference = response.data[0];
        let str;

        dispatch([
          new ConferenceAction_GetConferenceWriters(conference.id),
          new ConferenceAction_GetConferenceTeams(conference.id),
          new ConferenceAction_GetConferenceDivisions(conference.id),
          new TeamAction_GetTeamGameResults(
            conference.league_name.toUpperCase(),
            str,
            conference.id,
            str
          ),
          new TeamAction_GetStandings(
            conference.league_name.toUpperCase(),
            str,
            conference.id,
            str
          ),
          new TeamAction_GetUpcomingGameSchedule(
            conference.league_name.toUpperCase(),
            str,
            conference.id,
            str
          ),
        ]);
        patchState({ conference: conference, conferenceLoading: false });
      })
    );
  }

  @Action(ConferenceAction_GetConferenceTeams)
  getConferenceTeams(
    { patchState, dispatch }: StateContext<ConferenceStateModel>,
    { league_conference_id }: ConferenceAction_GetConferenceTeams
  ) {
    return this.conferenceService.getConferenceTeams(league_conference_id).pipe(
      tap((response: ITeam) => {
        this.TeamTweets = [];
        var teams: string[] = [];

        response.data.forEach((team) => {
          teams.push(team.name);
          if (team.twitter_handle !== undefined) {
            dispatch([
              new ConferenceAction_GetTeamTweets(team.twitter_handle, 1),
            ]);
          }
        });

        let _teams = teams.toString();
        if (_teams) {
          dispatch([
            new ConferenceAction_GetConferenceArticles(_teams, 1, 10, 'DESC'),
            new ConferenceAction_GetTrendingArticles(_teams, 4, 'DESC'),
            new ConferenceAction_GetTrendingContents(_teams, 4, 'DESC'),
            new ContentAction_GetContents(1, 6, '', _teams),
          ]);
        }
        patchState({ conferenceTeams: response.data });
      })
    );
  }

  @Action(ConferenceAction_GetConferenceDivisions)
  getConferenceDivisions(
    { patchState }: StateContext<ConferenceStateModel>,
    { league_conference_id }: ConferenceAction_GetConferenceDivisions
  ) {
    return this.conferenceService
      .getConferenceDivisions(league_conference_id)
      .pipe(
        tap((response: ILeagueDivisions) => {
          patchState({ conferenceDivisions: response.data });
        })
      );
  }

  @Action(ConferenceAction_GetConferenceArticles)
  getTeamArticles(
    { patchState }: StateContext<ConferenceStateModel>,
    {
      conference,
      page,
      size,
      sort_order,
    }: ConferenceAction_GetConferenceArticles
  ) {
    patchState({ conferenceArticlesLoading: true });
    return this.conferenceService
      .getConferenceArticles(conference, page, size, sort_order)
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
            conferenceArticles: data,
            conferenceArticlesLoading: false,
          });
        })
      );
  }

  @Action(ConferenceAction_GetTweets)
  getTeamTweets(
    { patchState }: StateContext<ConferenceStateModel>,
    { username, limit }: ConferenceAction_GetTweets
  ) {
    return this.conferenceService.getTweetsByUserName(username, limit).pipe(
      tap((response: ITweets) => {
        patchState({ conferenceTweets: response.data });
      })
    );
  }
  @Action(ConferenceAction_GetTeamTweets)
  getConferenceTeamTweets(
    { patchState }: StateContext<ConferenceStateModel>,
    { username, limit }: ConferenceAction_GetTeamTweets
  ) {
    return this.conferenceService
      .getTweetsByUserName(username, limit, 'DESC')
      .pipe(
        tap((response: ITweets) => {
          this.TeamTweets.push(response.data);
          let newArr = [{ tweets: [] }];
          for (let i = 0; i < this.TeamTweets.length - 1; i++) {
            if (this.TeamTweets[i].tweets) {
              newArr[0].tweets.push(this.TeamTweets[i].tweets[0]);
            }
          }

          patchState({ conferenceTeamTweets: newArr[0] });
        })
      );
  }

  @Action(ConferenceAction_GetTrendingArticles)
  getTrendingArticles(
    { patchState }: StateContext<ConferenceStateModel>,
    { conference, size, sort_order }: ConferenceAction_GetTrendingArticles
  ) {
    patchState({ trendingArticlesLoading: true });
    return this.conferenceService
      .getTrendingArticles(conference, size, sort_order)
      .pipe(
        tap((response: IArticles) => {
          patchState({
            trendingArticles: response.data,
            trendingArticlesLoading: false,
          });
        })
      );
  }

  @Action(ConferenceAction_GetTrendingContents)
  getTrendingContents(
    { patchState }: StateContext<ConferenceStateModel>,
    { conference, size, sort_order }: ConferenceAction_GetTrendingContents
  ) {
    patchState({ trendingContentsLoading: true });
    return this.conferenceService
      .getTrendingContents(conference, size, sort_order)
      .pipe(
        tap((response: IArticles) => {
          patchState({
            trendingContents: response.data,
            trendingContentsLoading: false,
          });
        })
      );
  }

  @Action(ConferenceAction_GetConferenceStandings)
  getConferenceStandings(
    { patchState }: StateContext<ConferenceStateModel>,
    { league_name, conference_name }: ConferenceAction_GetConferenceStandings
  ) {
    return this.conferenceService.getConferenceStandings(league_name).pipe(
      tap((response: IConferenceStandings) => {
        const standings = cloneDeep(response);
        let _standings,
          temp = [];
        let uniqueTeam,
          team = [];
        _standings = standings.teams.filter(
          (t) => t.conferenceRank.conferenceName === conference_name
        );

        _standings?.forEach((team_i) => {
          _standings?.forEach((team_j) => {
            if (
              team_i.divisionRank.divisionName ===
              team_j.divisionRank.divisionName
            ) {
              let object = {
                divisionName: team_i.divisionRank.divisionName,
                team: team_i.team,
                stats: team_i.stats,
              };
              temp.push(object);
              uniqueTeam = uniqWith(temp, isEqual);
            }
          });
        });

        var lookup = {};
        var result = [];

        for (var item, i = 0; (item = uniqueTeam[i++]); ) {
          var name = item.divisionName;
          if (!(name in lookup)) {
            result.push(name);
          }
        }

        let arrayDiv = [],
          finalObj = {};

        result.forEach((i) => {
          uniqueTeam.forEach((j) => {
            if (i === j.divisionName) {
              arrayDiv.push({
                team: j.team,
                stats: j.stats,
              });
            }
          });

          finalObj[i] = arrayDiv;
          arrayDiv = [];
        });

        let obj = {
          conferenceName: conference_name,
          divisions: finalObj,
        };

        patchState({
          conferenceStandings: {
            teams: obj,
          },
        });
      })
    );
  }

  @Action(ConferenceAction_GetConferenceUpcomingGames)
  getConferenceUpcomingGames(
    { patchState }: StateContext<ConferenceStateModel>,
    { league_name }: ConferenceAction_GetConferenceUpcomingGames
  ) {
    return this.conferenceService.getConferenceUpcomingGames(league_name).pipe(
      tap((response: IConferenceUpcomingGames) => {
        const upcomingGames = cloneDeep(response);
        patchState({
          conferenceUpcomingGames: {
            games: upcomingGames.games,
          },
        });
      })
    );
  }

  @Action(ConferenceAction_GetConferenceWriters)
  getTeamWriters(
    { patchState, getState, dispatch }: StateContext<ConferenceStateModel>,
    { league_conference_id }: ConferenceAction_GetConferenceWriters
  ) {
    patchState({ isWritersLoading: true });
    return this.conferenceService
      .getConferenceWriters(league_conference_id)
      .pipe(
        tap((response: IWriter) => {
          if (response.data[0]?.twitter_handle !== undefined) {
            dispatch(
              new ConferenceAction_GetTweets(
                response.data[0]?.twitter_handle,
                7
              )
            );
          }
          patchState({
            conferenceWriters: response.data,
            isWritersLoading: false,
          });
        })
      );
  }
}
