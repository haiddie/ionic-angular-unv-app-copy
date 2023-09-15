import { Writer } from './../writer/writer.models';
import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { City, ICities } from '../home/home.models';
import { ITeam, Team } from '../team/team.models';
import { IWriter } from '../writer/writer.models';
import {
  CityAction_GetArticle,
  CityAction_GetCityArticles,
  CityAction_GetTrendingArticles,
  CityAction_GetTweets,
  CityAction_GetWriterTweets,
  CityAction_GetActiveCity,
  CityAction_GetWeatherInfo,
  CityAction_GetCityTeams,
  CityAction_GetCityWriters,
  CityAction_GetCityLandmark,
  CityAction_GetWeatherForCastInfo,
  CityAction_GetTrendingContent,
} from './city.actions';
import {
  Article,
  IArticles,
  ITweets,
  Tweets,
  WeatherInfo,
} from './city.models';
import { CityService } from './city.service';
import { ContentAction_GetContents } from '../content/content.actions';

export class CityStateModel {
  public selectedCity: City;
  public cityLandmark: any;
  public cityArticles: Article[];
  public cityTweets: any;
  public cityWriterTweets: Tweets;
  public trendingArticles: Article[];
  public trendingContents: any[];
  public weatherInfo: any;
  public weatherForCastInfo: any[];
  public cityTeams: Team[];
  public cityWriters: Writer[];

  // loaders
  public selectedCityLoading: boolean;
  public cityArticlesLoading: boolean;
  public trendingArticlesLoading: boolean;
  public trendingContentsLoading: boolean;
}

const defaults = {
  selectedCity: null,
  cityLandmark: null,
  cityArticles: [],
  cityTweets: null,
  cityWriterTweets: null,
  trendingArticles: [],
  trendingContents: [],
  weatherInfo: null,
  weatherForCastInfo: null,
  cityTeams: [],
  cityWriters: [],

  // loaders
  selectedCityLoading: false,
  cityArticlesLoading: false,
  trendingArticlesLoading: false,
  trendingContentsLoading: false,
};

@State<CityStateModel>({
  name: 'city',
  defaults,
})
@Injectable()
export class CityState {
  TeamTweets: any = [];
  constructor(private cityService: CityService) {}

  @Action(CityAction_GetActiveCity)
  setSelectedCity(
    { patchState, dispatch }: StateContext<CityStateModel>,
    { slug, name }: CityAction_GetActiveCity
  ) {
    patchState({ selectedCityLoading: true });
    return this.cityService.getCity(slug).pipe(
      tap((response: ICities) => {
        response.data.map((T) => {
          if (T.slug === slug) {
            const _city = T;
            dispatch([
              new CityAction_GetCityLandmark(slug),
              new CityAction_GetCityTeams(_city.name),
              new CityAction_GetTrendingArticles(name, 5, 'DESC'),
              new CityAction_GetTrendingContent(name, 5, 'DESC'),
              //  new CityAction_GetCityArticles(name, 1, 10, 'DESC'),
              new CityAction_GetWeatherInfo(_city.lat, _city.long),
              new CityAction_GetWeatherForCastInfo(_city.lat, _city.long),
            ]);
            patchState({ selectedCity: T, selectedCityLoading: false });
          }
        });
      })
    );
  }

  @Action(CityAction_GetCityLandmark)
  getCityLandmark(
    { patchState }: StateContext<CityStateModel>,
    { slug }: CityAction_GetActiveCity
  ) {
    patchState({ selectedCityLoading: true });
    return this.cityService.getCityLandmarks(slug).pipe(
      tap((response: ICities) => {
        let index =
          Math.floor(Math.random() * (response.data.length - 1 - 0 + 1)) + 0;
        const _city = response.data[index];
        patchState({ cityLandmark: _city, selectedCityLoading: false });
      })
    );
  }

  @Action(CityAction_GetCityArticles)
  getCityArticles(
    { patchState }: StateContext<CityStateModel>,
    { city, page, size, sort_order }: CityAction_GetCityArticles
  ) {
    patchState({ cityArticlesLoading: true });
    return this.cityService.getCityArticles(city, page, size, sort_order).pipe(
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
        patchState({ cityArticles: data, cityArticlesLoading: false });
      })
    );
  }

  @Action(CityAction_GetTweets)
  getCityTweets(
    { patchState }: StateContext<CityStateModel>,
    { username, limit }: CityAction_GetTweets
  ) {
    return this.cityService.getTweetsByUserName(username, limit, 'DESC').pipe(
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
        patchState({ cityTweets: newArr[0] });
      })
    );
  }

  @Action(CityAction_GetWriterTweets)
  getCityWriterTweets(
    { patchState }: StateContext<CityStateModel>,
    { username, limit }: CityAction_GetWriterTweets
  ) {
    return this.cityService.getTweetsByUserName(username, limit).pipe(
      tap((response: ITweets) => {
        patchState({ cityWriterTweets: response.data });
      })
    );
  }
  @Action(CityAction_GetTrendingArticles)
  getTrendingArticles(
    { patchState }: StateContext<CityStateModel>,
    { city, size, sort_order }: CityAction_GetTrendingArticles
  ) {
    patchState({ trendingArticlesLoading: true });
    return this.cityService.getTrendingArticles(city, size, sort_order).pipe(
      tap((response: IArticles) => {
        patchState({
          trendingArticles: response.data,
          trendingArticlesLoading: false,
        });
      })
    );
  }

  @Action(CityAction_GetTrendingContent)
  getTrendingContents(
    { patchState }: StateContext<CityStateModel>,
    { city, size, sort_order }: CityAction_GetTrendingContent
  ) {
    patchState({ trendingContentsLoading: true });
    return this.cityService.getTrendingContent(city, size, sort_order).pipe(
      tap((response: any) => {
        console.log('res from trending content', response);
        patchState({
          trendingContents: response.data,
          trendingContentsLoading: false,
        });
      })
    );
  }

  @Action(CityAction_GetWeatherInfo)
  getWeatherInfo(
    { patchState }: StateContext<CityStateModel>,
    { lat, lon }: CityAction_GetWeatherInfo
  ) {
    if (lat !== null && lon !== null) {
      return this.cityService.getWeatherInfo(lat, lon).pipe(
        tap((response: any) => {
          const mainWeather = response;
          const weather = {
            mainInfo: mainWeather.temperature.weather.main,
            icon: mainWeather.temperature.weather.icon.url,
            temp: Math.round(mainWeather.temperature.weather.temp.cur) + '°',
            humidity:
              Math.round(mainWeather.temperature.weather.humidity) + '%',
            wind: Math.round(mainWeather.temperature.weather.wind.speed),
            date: new Date(mainWeather.temperature.dt * 1000), // need to multiply by 1000 to convert from Unix timestamp to JavaScript Date object
          };

          patchState({ weatherInfo: weather });
        })
      );
    }
  }

  @Action(CityAction_GetWeatherForCastInfo)
  getWeatherForCastInfo(
    { patchState }: StateContext<CityStateModel>,
    { lat, lon }: CityAction_GetWeatherForCastInfo
  ) {
    if (lat !== null && lon !== null) {
      return this.cityService.getWeatherForCastInfo(lat, lon).pipe(
        tap((response: any) => {
          console.log('resp from weather forecast', response);
          const mainWeather = response;
          const weatherForCast = [];
          weatherForCast.push({
            mainInfo: mainWeather.today.weather.main,
            icon: mainWeather.today.weather.icon.url,
            temp:
              Math.round(mainWeather.today.weather.temp.max) +
              '° / ' +
              Math.round(mainWeather.today.weather.temp.min) +
              '°',
            humidity: Math.round(mainWeather.today.weather.humidity) + '%',
            wind: Math.round(mainWeather.today.weather.wind.speed),
            date: new Date(mainWeather.today.dt), // need to multiply by 1000 to convert from Unix timestamp to JavaScript Date object
          });
          mainWeather.temperature.map((obj) => {
            weatherForCast.push({
              mainInfo: obj.weather.main,
              icon: obj.weather.icon.url,
              temp:
                Math.round(obj.weather.temp.max) +
                '° / ' +
                Math.round(obj.weather.temp.min) +
                '°',
              humidity: Math.round(obj.weather.humidity) + '%',
              wind: Math.round(obj.weather.wind.speed),
              date: new Date(obj.dt), // need to multiply by 1000 to convert from Unix timestamp to JavaScript Date object
            });
          });

          patchState({ weatherForCastInfo: weatherForCast });
        })
      );
    }
  }

  @Action(CityAction_GetCityTeams)
  getCityTeams(
    { patchState, dispatch }: StateContext<CityStateModel>,
    { city, page, size }: CityAction_GetCityTeams
  ) {
    return this.cityService.getCityTeams(city, page, size).pipe(
      tap((response: ITeam) => {
        patchState({ cityTeams: response.data });
        let a: any = [];
        response.data.map((c) => {
          a.push(c.name);
          if (c.twitter_handle !== undefined) {
            dispatch([new CityAction_GetTweets(c.twitter_handle, 3)]);
          }
        });
        dispatch([
          new ContentAction_GetContents(1, 6, '', a.toString()),
          new CityAction_GetCityArticles(a.toString(), 1, 10, 'DESC'),
        ]);
        response.data.map((team: Team) => {
          dispatch(new CityAction_GetCityWriters(team.name));
        });
      })
    );
  }

  @Action(CityAction_GetCityWriters)
  getTeamWriters(
    { patchState, getState, dispatch }: StateContext<CityStateModel>,
    { team, page, size }: CityAction_GetCityWriters
  ) {
    return this.cityService.getCityWriters(team, page, size).pipe(
      tap((response: IWriter) => {
        let tempCityWriters: Writer[] = JSON.parse(
          JSON.stringify(getState()?.cityWriters)
        );
        response.data.map((writer) => {
          if (
            !tempCityWriters.some((_writer) =>
              _writer.id === writer.id ? true : false
            )
          ) {
            tempCityWriters.push(writer);
          }
        });
        if (response.data[0]?.twitter_handle !== undefined) {
          dispatch(
            new CityAction_GetWriterTweets(response.data[0]?.twitter_handle, 7)
          );
        }

        patchState({ cityWriters: tempCityWriters });
      })
    );
  }
}
