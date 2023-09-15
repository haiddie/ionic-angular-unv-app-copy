import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { Article, IArticles } from '../home/home.models';
import { Writer } from '../writer/writer.models';
import {
  ArticleAction_GetArticle,
  ArticleAction_GetRelatedStories,
} from './article.actions';
import { ArticleService } from './article.service';

export class ArticleStateModel {
  public selectedArticle: Article;
  public writerInfo: Writer;
  public selectedArticleRelatedStories: Article[];

  // loaders
  public selectedArticleLoading: boolean;
  public selectedArticleRelatedStoriesLoading: boolean;
}

const defaults = {
  selectedArticle: null,
  selectedArticleRelatedStories: [],
  writerInfo: null,

  // loaders
  selectedArticleLoading: false,
  selectedArticleRelatedStoriesLoading: false,
};

@State<ArticleStateModel>({
  name: 'article',
  defaults,
})
@Injectable()
export class ArticleState {
  constructor(private articleService: ArticleService) {}

  @Action(ArticleAction_GetArticle)
  getArticle(
    { patchState, dispatch }: StateContext<ArticleStateModel>,
    { slug }: ArticleAction_GetArticle
  ) {
    patchState({ selectedArticleLoading: true });
    return this.articleService.getArticle(slug).pipe(
      tap((response: IArticles) => {
        console.log('response from article', response);
        let team: string;

        if (response.data.length > 0) {
          if (response.data[0].teams !== null) {
            team = response.data[0].teams.split(',')[0];
            dispatch(
              new ArticleAction_GetRelatedStories(
                response.data[0].teams.split(',')[0],
                1,
                5
              )
            );
          }
        }
        patchState({
          selectedArticle: response.data[0],
          writerInfo: response.authors[0],
          selectedArticleLoading: false,
        });
      })
    );
  }

  @Action(ArticleAction_GetRelatedStories)
  getRelatedStories(
    { patchState }: StateContext<ArticleStateModel>,
    { team, page, size }: ArticleAction_GetRelatedStories
  ) {
    patchState({ selectedArticleRelatedStoriesLoading: true });
    return this.articleService.getRelatedStories(team, page, size).pipe(
      tap((response: IArticles) => {
        patchState({
          selectedArticleRelatedStories: response.data,
          selectedArticleRelatedStoriesLoading: false,
        });
      })
    );
  }
}
