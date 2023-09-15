import { Selector } from '@ngxs/store';
import { Article, Tweet, Writer } from './writer.models';
import { WriterState, WriterStateModel } from './writer.state';

export class WriterSelectors {

  @Selector([WriterState]) static writer(state: WriterStateModel): Writer {return state.selectedWriter}

  @Selector([WriterState]) static articles(state: WriterStateModel): Article[] {return state.articles}

  @Selector([WriterState]) static tweets(state: WriterStateModel): Tweet[] {return state.tweets}

  @Selector([WriterState]) static relatedArticles(state: WriterStateModel): Article[] {return state.relatedArticles.slice(0, 6)}

  @Selector([WriterState]) static authorTeams(state: WriterStateModel): Article[] {return state.authorTeams}

  // loaders

  @Selector([WriterState]) static relatedArticlesLoading(state: WriterStateModel): boolean {return state.relatedArticlesLoading}

  @Selector([WriterState]) static articlesLoading(state: WriterStateModel): boolean {return state.articlesLoading}

  @Selector([WriterState]) static writerLoading(state: WriterStateModel): boolean {return state.selectedWriterLoading}


}