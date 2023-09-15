import { Article } from 'src/shared/store/home/home.models';
import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { WriterAction_GetArticles, WriterAction_GetTeamArticles, WriterAction_GetTeams, WriterAction_GetTweets, WriterAction_GetWriter } from './writer.actions';
import { IArticles, ITweets, IWriter, Tweet, Writer } from './writer.models';
import { WriterService } from './writer.service';

export class WriterStateModel {
  public selectedWriter: Writer;
  public articles: Article[];
  public tweets: Tweet[];
  public relatedArticles: Article[];
 public authorTeams:any
  // loaders
  public relatedArticlesLoading: boolean;
  public selectedWriterLoading: boolean;
  public articlesLoading: boolean;
}

const defaults = {
  selectedWriter: null,
  articles: [],
  tweets: [],
  relatedArticles: [],
authorTeams:null,
  // loaders
  relatedArticlesLoading: false,
  selectedWriterLoading: false,
  articlesLoading: false
};

@State<WriterStateModel>({
  name: 'writer',
  defaults
})
@Injectable()
export class WriterState {
  constructor(private writerService: WriterService) {}

  @Action(WriterAction_GetWriter)
  getTeamWriters(
    { patchState, dispatch }: StateContext<WriterStateModel>,
    { slug }: WriterAction_GetWriter
  ) {
    patchState({ selectedWriterLoading: true })
    return this.writerService.getWriter(slug).pipe(
      tap((response: IWriter) => {
        if (response){
          const writer = response.data[0];
          dispatch([new WriterAction_GetArticles(writer.name, 1, 10, 'DESC'),
           new WriterAction_GetTweets(writer.twitter_handle, 5)])
          const teams = writer.organization.split(', ')
          teams.forEach(team => {
            dispatch(new WriterAction_GetTeamArticles(writer.organization, 1, 6, 'DESC'))
          })
          patchState({ selectedWriter: writer, selectedWriterLoading: false })    
        }
      
      })
    )
  }

  @Action(WriterAction_GetArticles)
  getCityArticles(
    { patchState }: StateContext<WriterStateModel>,
    { author, page, size, sort_order }: WriterAction_GetArticles
  ) {
    patchState({ articlesLoading: true })
    return this.writerService.getWriterArticles(author, page, size, sort_order).pipe(
      tap((response: IArticles) => {
       
        let data=[];
        response.data.map((article)=>{
          if(article.image!==null){
            data.push(article);
          }
        })
        response.data.map((article)=>{
          if(article.image===null){
            data.push(article);
          }
        })
        patchState({ articles: data, articlesLoading: false })
      })
    )
  }

  @Action(WriterAction_GetTweets)
  getTeamTweets(
    { patchState }: StateContext<WriterStateModel>,
    { username, limit }: WriterAction_GetTweets
  ) {
    return this.writerService.getTweetsByUserName(username, limit).pipe(
      tap((response: ITweets) => {
        patchState({ tweets: response.data.tweets })
      })
    )
  }

  @Action(WriterAction_GetTeamArticles)
  getTeamArticles(
    { patchState, getState }: StateContext<WriterStateModel>,
    { team, page, size, sort_order }: WriterAction_GetTeamArticles
  ) {
    patchState({ relatedArticlesLoading: true })
    return this.writerService.getTeamArticles(team, page, size, sort_order).pipe(
      tap((response: IArticles) => {
        let articles = [];
        if (getState() && getState()?.relatedArticles) {
          articles = JSON.parse(JSON.stringify(getState().relatedArticles))
        }
        articles.push(...response.data)
        patchState({ relatedArticles: articles, relatedArticlesLoading: false })
      })
    )
  }

  @Action(WriterAction_GetTeams)
  getTeams(
    { patchState, getState }: StateContext<WriterStateModel>,
    { slug}: WriterAction_GetTeams
  ) {
   
    return this.writerService.getAuthorTeams(slug).pipe(
      tap((response: IArticles) => {

        patchState({ authorTeams: response.data })
      })
    )
  }

}
