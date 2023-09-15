import {
  Article,
  IArticles,
  IStandings,
  ITeam,
  ITeamGameResults,
  ITweets,
  IUpcomingGameSchedule,
  Team,
  Tweets,
} from './team.models';
import { cloneDeep } from 'lodash';
import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import {
  TeamAction_GetTeamArticles,
  TeamAction_GetTweets,
  TeamAction_GetTeam,
  TeamAction_GetTrendingArticles,
  TeamAction_GetArticle,
  TeamAction_GetCityTeams,
  TeamAction_GetTeamWriters,
  TeamAction_GetTeamGameResults,
  TeamAction_GetStandings,
  TeamAction_GetUpcomingGameSchedule,
  TeamAction_GetOffsensiveStats,
  TeamAction_GetDefensiveStats,
  TeamAction_GetTrendingContents,
} from './team.actions';
import { TeamService } from './team.service';
import { tap } from 'rxjs/operators';
import { IWriter, Writer } from '../writer/writer.models';
import { Stat } from '../stats/stats.models';
import { LeagueAction_GetLeagueQuote } from '../league/league.actions';

export class TeamStateModel {
  public team: Team;
  public selectedArticle: Article;
  public selectedArticleRelatedStories: Article[];
  public teamArticles: Article[];
  public teamTweets: Tweets;
  public trendingArticles: Article[];
  public trendingContents: Article[];
  public cityTeams: Team[];
  public teamWriters: Writer[];
  public teamGameResults: ITeamGameResults;
  public standings: IStandings;
  public unique_divisions: string[];
  public unique_conferences: string[];
  public upcomingGames: IUpcomingGameSchedule;
  public offensiveStats: Stat[];
  public defensiveStats: Stat[];

  // loaders
  public teamLoading: boolean;
  public offensiveStatsLoading: boolean;
  public defensiveStatsLoading: boolean;
  public selectedArticleLoading: boolean;
  public teamArticlesLoading: boolean;
  public trendingArticlesLoading: boolean;
  public trendingContentsLoading: boolean;
  public selectedArticleRelatedStoriesLoading: boolean;
  public isWritersLoading: boolean;
}

const defaults = {
  team: null,
  selectedArticle: null,
  selectedArticleRelatedStories: [],
  teamArticles: [],
  teamTweets: null,
  trendingArticles: [],
  trendingContents: [],
  cityTeams: [],
  teamWriters: [],
  teamGameResults: null,
  standings: null,
  unique_divisions: [],
  unique_conferences: [],
  upcomingGames: null,
  offensiveStats: [],
  defensiveStats: [],

  // loaders
  teamLoading: false,
  offensiveStatsLoading: false,
  defensiveStatsLoading: false,
  selectedArticleLoading: false,
  teamArticlesLoading: false,
  trendingArticlesLoading: false,
  trendingContentsLoading: false,
  selectedArticleRelatedStoriesLoading: false,
  isWritersLoading: false,
};

@State<TeamStateModel>({
  name: 'team',
  defaults,
})
@Injectable()
export class TeamState {
  constructor(private teamService: TeamService) {}

  @Action(TeamAction_GetTeam)
  getTeam(
    { patchState, dispatch }: StateContext<TeamStateModel>,
    { slug, token }: TeamAction_GetTeam
  ) {
    patchState({ teamWriters: [], teamLoading: true });
    return this.teamService.getTeam(slug).pipe(
      tap((response: ITeam) => {
        const team = response.data[0];
        console.log('team data', team);
        let str;
        if (team) {
          let leagueslug = team.league_name.toLocaleLowerCase();
          if (token !== undefined) {
            dispatch([
              new LeagueAction_GetLeagueQuote(leagueslug, token),
              new TeamAction_GetCityTeams(team.city),
              new TeamAction_GetTeamWriters(team.name),
              new TeamAction_GetTeamArticles(team.name, 1, 10, 'DESC'),
              new TeamAction_GetTweets(team.twitter_handle, 5),
              new TeamAction_GetTrendingArticles(team.name, 4, 'DESC'),
              new TeamAction_GetTrendingContents(team.name, 4, 'DESC'),
              new TeamAction_GetTeamGameResults(
                team.league_name.toUpperCase(),
                team.id,
                str,
                str
              ),
              new TeamAction_GetStandings(
                team.league_name,
                str,
                str,
                parseInt(team.division_id)
              ),
              new TeamAction_GetUpcomingGameSchedule(
                team.league_name.toUpperCase(),
                team.id,
                str,
                str
              ),
            ]);
          } else {
            dispatch([
              //  new LeagueAction_GetLeagueQuote(leagueslug,token),
              new TeamAction_GetCityTeams(team.city),
              new TeamAction_GetTeamWriters(team.name),
              new TeamAction_GetTeamArticles(team.name, 1, 10, 'DESC'),
              new TeamAction_GetTweets(team.twitter_handle, 5),
              new TeamAction_GetTrendingArticles(team.name, 4, 'DESC'),
              new TeamAction_GetTrendingContents(team.name, 4, 'DESC'),
              new TeamAction_GetTeamGameResults(
                team.league_name.toUpperCase(),
                team.id,
                str,
                str
              ),
              new TeamAction_GetStandings(
                team.league_name,
                str,
                str,
                parseInt(team.division_id)
              ),
              new TeamAction_GetUpcomingGameSchedule(
                team.league_name.toUpperCase(),
                team.id,
                str,
                str
              ),
            ]);
          }
        }
        patchState({ team: team, teamLoading: false });
      })
    );
  }

  @Action(TeamAction_GetArticle)
  getArticle(
    { patchState }: StateContext<TeamStateModel>,
    { slug }: TeamAction_GetArticle
  ) {
    patchState({ selectedArticleLoading: true });
    return this.teamService.getArticle(slug).pipe(
      tap((response: IArticles) => {
        patchState({
          selectedArticle: response.data[0],
          selectedArticleLoading: false,
        });
      })
    );
  }

  @Action(TeamAction_GetTeamArticles)
  getTeamArticles(
    { patchState }: StateContext<TeamStateModel>,
    { team, page, size, sort_order }: TeamAction_GetTeamArticles
  ) {
    patchState({ teamArticlesLoading: true });
    return this.teamService.getTeamArticles(team, page, size, sort_order).pipe(
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
        patchState({ teamArticles: data, teamArticlesLoading: false });
      })
    );
  }

  @Action(TeamAction_GetTweets)
  getTeamTweets(
    { patchState }: StateContext<TeamStateModel>,
    { username, limit }: TeamAction_GetTweets
  ) {
    return this.teamService.getTweetsByUserName(username, limit).pipe(
      tap((response: ITweets) => {
        console.log('response from tweet', response);
        patchState({ teamTweets: response.data });
      })
    );
  }

  @Action(TeamAction_GetTrendingArticles)
  getTrendingArticles(
    { patchState }: StateContext<TeamStateModel>,
    { team, size, sort_order }: TeamAction_GetTrendingArticles
  ) {
    patchState({ trendingArticlesLoading: true });
    return this.teamService.getTrendingArticles(team, size, sort_order).pipe(
      tap((response: IArticles) => {
        patchState({
          trendingArticles: response.data,
          trendingArticlesLoading: false,
        });
      })
    );
  }

  @Action(TeamAction_GetTrendingContents)
  getTrendingContents(
    { patchState }: StateContext<TeamStateModel>,
    { team, size, sort_order }: TeamAction_GetTrendingContents
  ) {
    patchState({ trendingContentsLoading: true });
    return this.teamService.getTrendingContents(team, size, sort_order).pipe(
      tap((response: IArticles) => {
        patchState({
          trendingContents: response.data,
          trendingContentsLoading: false,
        });
      })
    );
  }

  @Action(TeamAction_GetCityTeams)
  getCityTeams(
    { patchState }: StateContext<TeamStateModel>,
    { city, page, size }: TeamAction_GetCityTeams
  ) {
    return this.teamService.getCityTeams(city, page, size).pipe(
      tap((response: ITeam) => {
        patchState({ cityTeams: response.data });
      })
    );
  }

  @Action(TeamAction_GetTeamWriters)
  getTeamWriters(
    { patchState }: StateContext<TeamStateModel>,
    { team, page, size }: TeamAction_GetTeamWriters
  ) {
    patchState({ isWritersLoading: true });
    return this.teamService.getTeamWriters(team, page, size).pipe(
      tap((response: IWriter) => {
        patchState({ teamWriters: response.data, isWritersLoading: false });
      })
    );
  }
  @Action(TeamAction_GetTeamGameResults)
  getTeamGameResult(
    { patchState }: StateContext<TeamStateModel>,
    {
      league_name,
      team_ID,
      league_conference_ID,
      division_ID,
    }: TeamAction_GetTeamGameResults
  ) {
    return this.teamService
      .getTeamGameResults(
        league_name,
        team_ID,
        league_conference_ID,
        division_ID
      )
      .pipe(
        tap((response: ITeamGameResults) => {
          const gameResult = cloneDeep(response);
          patchState({
            teamGameResults: gameResult,
          });
        })
      );
  }

  @Action(TeamAction_GetUpcomingGameSchedule)
  getUpcomingGameSchedule(
    { patchState }: StateContext<TeamStateModel>,
    {
      league_name,
      team_ID,
      league_conference_ID,
      division_ID,
    }: TeamAction_GetUpcomingGameSchedule
  ) {
    return this.teamService
      .getUpcomingGames(league_name, team_ID, league_conference_ID, division_ID)
      .pipe(
        tap((response: IUpcomingGameSchedule) => {
          const upcomingGames = cloneDeep(response);
          patchState({
            upcomingGames: upcomingGames,
          });
        })
      );
  }

  @Action(TeamAction_GetStandings)
  getStandings(
    { patchState }: StateContext<TeamStateModel>,
    {
      league_name,
      team_id,
      league_conference_id,
      division_id,
    }: TeamAction_GetStandings
  ) {
    return this.teamService
      .getStandings(league_name, team_id, league_conference_id, division_id)
      .pipe(
        tap((response: IStandings) => {
          const standings = cloneDeep(response);
          let stand = standings.data.sort((a, b) =>
            a.division > b.division ? 1 : b.division > a.division ? -1 : 0
          );
          let uniqDivisions = [
            ...new Set(standings.data.map((d) => d.division)),
          ];
          let uniqConferences = [
            ...new Set(standings.data.map((d) => d.league_conference_name)),
          ];

          patchState({
            standings: standings,
            unique_divisions: uniqDivisions,
            unique_conferences: uniqConferences,
          });
        })
      );
  }

  @Action(TeamAction_GetOffsensiveStats)
  getOffensiveStats(
    { patchState }: StateContext<TeamStateModel>,
    {
      stat_type,
      stat_property,
      stat_sort_order,
      league_name,
      team_ID,
      league_conference_ID,
      division_ID,
      season,
      player_pool,
    }: TeamAction_GetOffsensiveStats
  ) {
    patchState({ offensiveStatsLoading: true });
    //   let season='2022-2023-regular'
    //   if(league_name==='MLB'){
    //    season = '2023-regular';
    //  }
    return this.teamService
      .getStats(
        league_name,
        stat_type,
        stat_property,
        stat_sort_order,
        '1',
        '5',
        '',
        '',
        '',
        season,
        player_pool,
        team_ID,
        league_conference_ID,
        division_ID
      )
      .pipe(
        tap((response: any) => {
          const resp = response.data;
          patchState({ offensiveStats: resp, offensiveStatsLoading: false });
        })
      );
  }

  @Action(TeamAction_GetDefensiveStats)
  getDefensiveStats(
    { patchState }: StateContext<TeamStateModel>,
    {
      stat_type,
      stat_property,
      stat_sort_order,
      league_name,
      team_ID,
      league_conference_ID,
      division_ID,
      season,
      player_pool,
    }: TeamAction_GetDefensiveStats
  ) {
    patchState({ defensiveStatsLoading: true });

    return this.teamService
      .getStats(
        league_name,
        stat_type,
        stat_property,
        stat_sort_order,
        '1',
        '5',
        '',
        '',
        '',
        season,
        player_pool,
        team_ID,
        league_conference_ID,
        division_ID
      )
      .pipe(
        tap((response: any) => {
          let resp = response.data;
          // if( league_name === 'MLB' && stat_type === 'pitching' && stat_property ==='earnedRunAvg'){
          //  resp = response.data.sort((a, b) => parseFloat(a.pitching.earnedRunAvg) - parseFloat(b.pitching.earnedRunAvg));
          // }
          patchState({ defensiveStats: resp, defensiveStatsLoading: false });
        })
      );
  }
}
