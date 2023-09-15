import { DivisionState, DivisionStateModel } from './division.state';
import { Article, LeagueDivision, Tweet } from './../home/home.models';
import { Selector } from '@ngxs/store';
import { Writer } from '../writer/writer.models';
import { Team } from '../team/team.models';
import { IDivisionStandings } from './division.models';

export class DivisionSelectors {
  @Selector([DivisionState]) static division(
    state: DivisionStateModel
  ): LeagueDivision {
    return state.division;
  }

  @Selector([DivisionState]) static divisionTeams(
    state: DivisionStateModel
  ): Team[] {
    return state.divisionTeams;
  }

  @Selector([DivisionState]) static selectedArticle(
    state: DivisionStateModel
  ): Article {
    return state.selectedArticle;
  }

  @Selector([DivisionState]) static divisionArticles(
    state: DivisionStateModel
  ): Article[] {
    return state.divisionArticles;
  }

  @Selector([DivisionState]) static divisionTweets(
    state: DivisionStateModel
  ): Tweet[] {
    return state.divisionTweets.tweets;
  }

  @Selector([DivisionState]) static divisionWriterTweets(
    state: DivisionStateModel
  ): Tweet[] {
    return state.divisionWriterTweets.tweets;
  }

  @Selector([DivisionState]) static divisionMentionTweets(
    state: DivisionStateModel
  ): Tweet[] {
    return state.divisionTweets.mentions;
  }

  @Selector([DivisionState]) static trendingArticles(
    state: DivisionStateModel
  ): Article[] {
    return state.trendingArticles;
  }

  @Selector([DivisionState]) static trendingContents(
    state: DivisionStateModel
  ): Article[] {
    return state.trendingContents;
  }

  @Selector([DivisionState]) static divisionWriters(
    state: DivisionStateModel
  ): Writer[] {
    return state.divisionWriters;
  }

  // loaders
  @Selector([DivisionState]) static divisionLoading(
    state: DivisionStateModel
  ): boolean {
    return state.divisionLoading;
  }

  @Selector([DivisionState]) static selectedArticleLoading(
    state: DivisionStateModel
  ): boolean {
    return state.selectedArticleLoading;
  }

  @Selector([DivisionState]) static divisionArticlesLoading(
    state: DivisionStateModel
  ): boolean {
    return state.divisionArticlesLoading;
  }

  @Selector([DivisionState]) static trendingArticlesLoading(
    state: DivisionStateModel
  ): boolean {
    return state.trendingArticlesLoading;
  }

  @Selector([DivisionState]) static trendingContentsLoading(
    state: DivisionStateModel
  ): boolean {
    return state.trendingContentsLoading;
  }

  @Selector([DivisionState]) static isWritersLoading(
    state: DivisionStateModel
  ): boolean {
    return state.isWritersLoading;
  }
}
