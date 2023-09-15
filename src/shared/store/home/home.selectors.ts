import { HomeState, HomeStateModel } from './home.state';
import { Selector } from '@ngxs/store';
import { City, League, LeagueConference, LeagueDivision, LeagueTeam, Article } from './home.models';
import { Writer } from '../writer/writer.models';

export class HomeSelectors {

  @Selector([HomeState]) static cities(state: HomeStateModel): Array<City> {return state.cities}

  @Selector([HomeState]) static leagues(state: HomeStateModel): Array<League> {return state.leagues}

  @Selector([HomeState]) static leagueConferences(state: HomeStateModel): Array<LeagueConference> {return state.leagueConferences}

  @Selector([HomeState]) static leagueDivisions(state: HomeStateModel): Array<LeagueDivision> {return state.leagueDivisions}

  @Selector([HomeState]) static leagueTeams(state: HomeStateModel): Array<LeagueTeam> {return state.leagueTeams}
  
  @Selector([HomeState]) static leagueArticles(state: HomeStateModel): { NFL: Article[], NHL: Article[], NBA: Article[], MLB: Article[] } {return state.leagueArticles}

  @Selector([HomeState]) static articles(state: HomeStateModel): Array<Article> {return state.articles}
  
  @Selector([HomeState]) static homeCityArticles(state: HomeStateModel): Array<Article> {return state.homeCityArticles}

  @Selector([HomeState]) static selectedArticle(state: HomeStateModel): Article {return state.selectedArticle}
  
  // @Selector([HomeState]) static teamArticles(state: HomeStateModel): Array<Article> {return state.teamArticles}

  @Selector([HomeState]) static editorPicksArticles(state: HomeStateModel): Array<Article> {return state.editorPicksArticles}

  @Selector([HomeState]) static recentlyAddedWriters(state: HomeStateModel): Array<Writer> {return state.recentlyAddedWriters}

  @Selector([HomeState]) static writersByRanking(state: HomeStateModel): Array<Writer> {return state.writersByRanking}

  @Selector([HomeState]) static NFL_Articles(state: HomeStateModel): Article[] { return state.NFL_Articles }

  @Selector([HomeState]) static NHL_Articles(state: HomeStateModel): Article[] { return state.NHL_Articles }

  @Selector([HomeState]) static NBA_Articles(state: HomeStateModel): Article[] { return state.NBA_Articles }
  
  @Selector([HomeState]) static MLB_Articles(state: HomeStateModel): Article[] { return state.MLB_Articles }

  // loaders
  @Selector([HomeState]) static editorPicksLoading(state: HomeStateModel): boolean {return state.editorPicksLoading}
  @Selector([HomeState]) static cityArticlesLoading(state: HomeStateModel): boolean {return state.cityArticlesLoading}
  @Selector([HomeState]) static recentlyAddedWritersLoading(state: HomeStateModel): boolean {return state.recentlyAddedWritersLoading}
  @Selector([HomeState]) static writersByRankingLoading(state: HomeStateModel): boolean {return state.writersByRankingLoading}
  

  // latest news loaders
  @Selector([HomeState]) static NFL_ArticlesLoading(state: HomeStateModel): boolean { return state.NFL_ArticlesLoading }
  @Selector([HomeState]) static NHL_ArticlesLoading(state: HomeStateModel): boolean { return state.NHL_ArticlesLoading }
  @Selector([HomeState]) static NBA_ArticlesLoading(state: HomeStateModel): boolean { return state.NBA_ArticlesLoading }
  @Selector([HomeState]) static MLB_ArticlesLoading(state: HomeStateModel): boolean { return state.MLB_ArticlesLoading }

}