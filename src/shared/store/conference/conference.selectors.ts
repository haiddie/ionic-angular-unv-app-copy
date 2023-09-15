import {
  Article,
  LeagueConference,
  LeagueDivision,
  Tweet,
} from './../home/home.models';
import { ConferenceState, ConferenceStateModel } from './conference.state';
import { Selector } from '@ngxs/store';
import { Writer } from '../writer/writer.models';
import { IConferenceUpcomingGames } from './conference.models';
import { ITeam, Team } from '../team/team.models';

export class ConferenceSelectors {
  @Selector([ConferenceState]) static conference(
    state: ConferenceStateModel
  ): LeagueConference {
    return state.conference;
  }

  @Selector([ConferenceState]) static conferenceTeams(
    state: ConferenceStateModel
  ): Team[] {
    return state.conferenceTeams;
  }

  @Selector([ConferenceState]) static conferenceDivisions(
    state: ConferenceStateModel
  ): LeagueDivision[] {
    return state.conferenceDivisions;
  }

  @Selector([ConferenceState]) static selectedArticle(
    state: ConferenceStateModel
  ): Article {
    return state.selectedArticle;
  }

  @Selector([ConferenceState]) static conferenceArticles(
    state: ConferenceStateModel
  ): Article[] {
    return state.conferenceArticles;
  }

  @Selector([ConferenceState]) static conferenceTweets(
    state: ConferenceStateModel
  ): Tweet[] {
    return state.conferenceTweets.tweets;
  }

  @Selector([ConferenceState]) static conferenceTeamTweets(
    state: ConferenceStateModel
  ): Tweet[] {
    return state.conferenceTeamTweets.tweets;
  }

  @Selector([ConferenceState]) static conferenceMentionTweets(
    state: ConferenceStateModel
  ): Tweet[] {
    return state.conferenceTweets.mentions;
  }

  @Selector([ConferenceState]) static trendingArticles(
    state: ConferenceStateModel
  ): Article[] {
    return state.trendingArticles;
  }

  @Selector([ConferenceState]) static trendingContents(
    state: ConferenceStateModel
  ): Article[] {
    return state.trendingContents;
  }

  @Selector([ConferenceState]) static conferenceWriters(
    state: ConferenceStateModel
  ): Writer[] {
    return state.conferenceWriters;
  }

  @Selector([ConferenceState]) static conferenceStandings(
    state: ConferenceStateModel
  ): any {
    return state.conferenceStandings;
  }

  @Selector([ConferenceState]) static conferenceUpcomingGames(
    state: ConferenceStateModel
  ): IConferenceUpcomingGames {
    return state.conferenceUpcomingGames;
  }

  // loaders
  @Selector([ConferenceState]) static conferenceLoading(
    state: ConferenceStateModel
  ): boolean {
    return state.conferenceLoading;
  }

  @Selector([ConferenceState]) static selectedArticleLoading(
    state: ConferenceStateModel
  ): boolean {
    return state.selectedArticleLoading;
  }

  @Selector([ConferenceState]) static conferenceArticlesLoading(
    state: ConferenceStateModel
  ): boolean {
    return state.conferenceArticlesLoading;
  }

  @Selector([ConferenceState]) static trendingArticlesLoading(
    state: ConferenceStateModel
  ): boolean {
    return state.trendingArticlesLoading;
  }

  @Selector([ConferenceState]) static trendingContentsLoading(
    state: ConferenceStateModel
  ): boolean {
    return state.trendingContentsLoading;
  }

  @Selector([ConferenceState]) static isWritersLoading(
    state: ConferenceStateModel
  ): boolean {
    return state.isWritersLoading;
  }
}
