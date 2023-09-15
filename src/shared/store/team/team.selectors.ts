import { TeamState, TeamStateModel } from './team.state';
import { Selector } from '@ngxs/store';
import { Article, Team, Tweet } from './team.models';
import { Writer } from '../writer/writer.models';

export class TeamSelectors {
  @Selector([TeamState]) static team(state: TeamStateModel): Team {
    return state.team;
  }

  @Selector([TeamState]) static selectedArticle(
    state: TeamStateModel
  ): Article {
    return state.selectedArticle;
  }

  @Selector([TeamState]) static teamArticles(state: TeamStateModel): Article[] {
    return state.teamArticles;
  }

  @Selector([TeamState]) static teamTweets(state: TeamStateModel): Tweet[] {
    return state.teamTweets.tweets;
  }

  @Selector([TeamState]) static teamMentionTweets(
    state: TeamStateModel
  ): Tweet[] {
    return state.teamTweets.mentions;
  }

  @Selector([TeamState]) static trendingArticles(
    state: TeamStateModel
  ): Article[] {
    return state.trendingArticles;
  }

  @Selector([TeamState]) static trendingContents(
    state: TeamStateModel
  ): Article[] {
    return state.trendingContents;
  }

  @Selector([TeamState]) static cityTeams(state: TeamStateModel): Team[] {
    return state.cityTeams;
  }

  @Selector([TeamState]) static teamWriters(state: TeamStateModel): Writer[] {
    return state.teamWriters;
  }

  // @Selector([TeamState]) static teamStandings(state: TeamStateModel): any {return state.teamStandings}

  @Selector([TeamState]) static standings(state: TeamStateModel): any {
    return state.standings;
  }

  @Selector([TeamState]) static uniqDivisions(state: TeamStateModel): any {
    return state.unique_divisions;
  }

  @Selector([TeamState]) static uniqConferences(state: TeamStateModel): any {
    return state.unique_conferences;
  }

  // @Selector([TeamState]) static teamUpcomingGames(state: TeamStateModel): any {return state.teamUpcomingGames}

  @Selector([TeamState]) static upcomingGames(state: TeamStateModel): any {
    return state.upcomingGames;
  }

  @Selector([TeamState]) static teamGameResults(state: TeamStateModel): any {
    return state.teamGameResults;
  }

  @Selector([TeamState]) static teamOffsensiveStats(
    state: TeamStateModel
  ): any {
    return state.offensiveStats;
  }

  @Selector([TeamState]) static teamDefensiveStats(state: TeamStateModel): any {
    return state.defensiveStats;
  }

  // loaders
  @Selector([TeamState]) static teamLoading(state: TeamStateModel): boolean {
    return state.teamLoading;
  }

  @Selector([TeamState]) static selectedArticleLoading(
    state: TeamStateModel
  ): boolean {
    return state.selectedArticleLoading;
  }

  @Selector([TeamState]) static teamArticlesLoading(
    state: TeamStateModel
  ): boolean {
    return state.teamArticlesLoading;
  }

  @Selector([TeamState]) static trendingArticlesLoading(
    state: TeamStateModel
  ): boolean {
    return state.trendingArticlesLoading;
  }

  @Selector([TeamState]) static trendingContentsLoading(
    state: TeamStateModel
  ): boolean {
    return state.trendingContentsLoading;
  }

  @Selector([TeamState]) static offensiveStatsLoading(
    state: TeamStateModel
  ): boolean {
    return state.offensiveStatsLoading;
  }

  @Selector([TeamState]) static defensiveStatsLoading(
    state: TeamStateModel
  ): boolean {
    return state.defensiveStatsLoading;
  }

  @Selector([TeamState]) static isWritersLoading(
    state: TeamStateModel
  ): boolean {
    return state.isWritersLoading;
  }
}
