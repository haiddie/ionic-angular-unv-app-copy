import { CollapsedConferenceData } from './league.models';
import { LeagueState, LeagueStateModel } from './league.state';
import { Selector } from '@ngxs/store';
import { Article, League, Tweet } from '../home/home.models';
import { Writer } from '../writer/writer.models';

export class LeagueSelectors {
  @Selector([LeagueState]) static league(state: LeagueStateModel): League {
    return state.league;
  }

  @Selector([LeagueState]) static leagueQuote(state: LeagueStateModel): any {
    return state.leagueQuote;
  }

  @Selector([LeagueState]) static conferenceDivisionData(
    state: LeagueStateModel
  ): CollapsedConferenceData[] {
    return state.conferenceDivisionData;
  }

  @Selector([LeagueState]) static selectedArticle(
    state: LeagueStateModel
  ): Article {
    return state.selectedArticle;
  }

  @Selector([LeagueState]) static leagueArticles(
    state: LeagueStateModel
  ): Article[] {
    return state.leagueArticles;
  }

  @Selector([LeagueState]) static leagueTweets(
    state: LeagueStateModel
  ): Tweet[] {
    return state.leagueTweets.tweets;
  }

  @Selector([LeagueState]) static leagueMentionTweets(
    state: LeagueStateModel
  ): Tweet[] {
    return state.leagueTweets.mentions;
  }

  @Selector([LeagueState]) static leagueConferenceTweets(
    state: LeagueStateModel
  ): Tweet[] {
    return state.leagueConferenceTweets.tweets;
  }

  @Selector([LeagueState]) static trendingArticles(
    state: LeagueStateModel
  ): Article[] {
    return state.trendingArticles;
  }

  @Selector([LeagueState]) static trendingContents(
    state: LeagueStateModel
  ): Article[] {
    return state.trendingContents;
  }

  @Selector([LeagueState]) static leagueWriters(
    state: LeagueStateModel
  ): Writer[] {
    return state.leagueWriters;
  }

  @Selector([LeagueState]) static leagueStandings(
    state: LeagueStateModel
  ): any {
    return state.leagueStandings;
  }

  @Selector([LeagueState]) static leagueUpcomingGames(
    state: LeagueStateModel
  ): any {
    return state.leagueUpcomingGames;
  }

  // loaders
  @Selector([LeagueState]) static leagueLoading(
    state: LeagueStateModel
  ): boolean {
    return state.leagueLoading;
  }

  @Selector([LeagueState]) static selectedArticleLoading(
    state: LeagueStateModel
  ): boolean {
    return state.selectedArticleLoading;
  }

  @Selector([LeagueState]) static leagueArticlesLoading(
    state: LeagueStateModel
  ): boolean {
    return state.leagueArticlesLoading;
  }

  @Selector([LeagueState]) static trendingArticlesLoading(
    state: LeagueStateModel
  ): boolean {
    return state.trendingArticlesLoading;
  }

  @Selector([LeagueState]) static trendingContentsLoading(
    state: LeagueStateModel
  ): boolean {
    return state.trendingContentsLoading;
  }

  @Selector([LeagueState]) static isWritersLoading(
    state: LeagueStateModel
  ): boolean {
    return state.isWritersLoading;
  }
}
