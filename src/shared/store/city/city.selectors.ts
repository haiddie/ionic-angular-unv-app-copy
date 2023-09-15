import { CityState, CityStateModel } from './city.state';
import { Selector } from '@ngxs/store';
import { Article, Tweet, WeatherInfo } from './city.models';
import { City } from '../home/home.models';
import { Team } from '../team/team.models';
import { Writer } from '../writer/writer.models';

export class CitySelectors {

  @Selector([CityState]) static selectedCity(state: CityStateModel): City {return state.selectedCity}

  @Selector([CityState]) static cityLandmark(state: CityStateModel): City {return state.cityLandmark}
  
  @Selector([CityState]) static cityArticles(state: CityStateModel): Array<Article> {return state.cityArticles}

  @Selector([CityState]) static cityTweets(state: CityStateModel): Tweet[] {return state.cityTweets.tweets}

  @Selector([CityState]) static cityWriterTweets(state: CityStateModel): Tweet[] {return state.cityWriterTweets.tweets}

  @Selector([CityState]) static trendingArticles(state: CityStateModel): Article[] {return state.trendingArticles}

  @Selector([CityState]) static trendingContents(state: CityStateModel): any[] {return state.trendingContents}

  @Selector([CityState]) static weatherInfo(state: CityStateModel): any {return state.weatherInfo}

  @Selector([CityState]) static weatherForCastInfo(state: CityStateModel): any {return state.weatherForCastInfo}

  @Selector([CityState]) static cityTeams(state: CityStateModel): Team[] {return state.cityTeams}

  @Selector([CityState]) static cityWriters(state: CityStateModel): Writer[] {return state.cityWriters}

  //loaders
  @Selector([CityState]) static selectedCityLoading(state: CityStateModel): boolean {return state.selectedCityLoading}

  @Selector([CityState]) static trendingArticlesLoading(state: CityStateModel): boolean {return state.trendingArticlesLoading}
  @Selector([CityState]) static trendingContentsLoading(state: CityStateModel): boolean {return state.trendingContentsLoading}
  @Selector([CityState]) static cityArticlesLoading(state: CityStateModel): boolean {return state.cityArticlesLoading}


}