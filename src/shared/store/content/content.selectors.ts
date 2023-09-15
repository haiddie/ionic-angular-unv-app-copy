import { Article } from './../home/home.models';
import { Selector } from '@ngxs/store';
import { ContentState, ContentStateModel } from './content.state';
import { Comment, ContentExperience } from './content.models';

export class ContentSelectors {

  @Selector([ContentState]) static contents(state: ContentStateModel): Article[] {return state.contents}

  @Selector([ContentState]) static archiveContents(state: ContentStateModel): Article[] {return state.archiveContents}

  @Selector([ContentState]) static contentsleagues(state: ContentStateModel):any {return state.contentsleagues}

  @Selector([ContentState]) static contentExperience(state: ContentStateModel): ContentExperience {return state.contentExperience}

  @Selector([ContentState]) static contentExperienceTeams(state: ContentStateModel): any {return state.contentExperienceTeams}

  @Selector([ContentState]) static comments(state: ContentStateModel): Comment[] {return state.comments}

  @Selector([ContentState]) static totalComments(state: ContentStateModel): number {return state.totalComments}

  // loaders

  @Selector([ContentState]) static contentsLoading(state: ContentStateModel): boolean {return state.contentsLoading}

  @Selector([ContentState]) static contentExperienceLoading(state: ContentStateModel): boolean {return state.contentExperienceLoading}

  @Selector([ContentState]) static commentsLoading(state: ContentStateModel): boolean {return state.commentsLoading}

  @Selector([ContentState]) static addCommentLoading(state: ContentStateModel): boolean {return state.addCommentLoading}

}