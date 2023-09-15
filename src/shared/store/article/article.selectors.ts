import { Selector } from '@ngxs/store';
import { Article } from '../home/home.models';
import { Writer } from '../writer/writer.models';
import { ArticleState, ArticleStateModel } from './article.state';

export class ArticleSelectors {

  @Selector([ArticleState]) static selectedArticle(state: ArticleStateModel): Article {return state.selectedArticle}
  
  @Selector([ArticleState]) static writerInfo(state: ArticleStateModel): Writer  {return state.writerInfo}
 
  @Selector([ArticleState]) static relatedStories(state: ArticleStateModel): Article[] {return state.selectedArticleRelatedStories}

  // loaders

  @Selector([ArticleState]) static selectedArticleLoading(state: ArticleStateModel): boolean {return state.selectedArticleLoading}

  @Selector([ArticleState]) static relatedStoriesLoading(state: ArticleStateModel): boolean {return state.selectedArticleRelatedStoriesLoading}


}