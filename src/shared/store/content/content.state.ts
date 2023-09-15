import { cloneDeep } from 'lodash';
import { Article, IArticles } from './../home/home.models';
import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import {
  ContentAction_AddComment,
  ContentAction_GetComments,
  ContentAction_GetContentExperience,
  ContentAction_GetContentExperienceTeams,
  ContentAction_GetContents,
  ContentAction_EditComment,
  ContentAction_DeleteComment,
  ContentAction_GetContentsLeagues,
  ContentAction_GetArchiveContents,
} from './content.actions';
import { ContentService } from './content.service';
import { tap } from 'rxjs/operators';
import {
  Comment,
  ContentExperience,
  IComment,
  IContentExperience,
} from './content.models';

export class ContentStateModel {
  public contents: Article[];
  public archiveContents: any;
  public contentsleagues: any;
  public contentExperience: ContentExperience;
  public contentExperienceTeams: any;
  public comments: Comment[];
  public totalComments: number;

  // loaders
  public contentsLoading: boolean;
  public contentExperienceLoading: boolean;
  public commentsLoading: boolean;
  public addCommentLoading: boolean;
}

const defaults = {
  contents: [],
  archiveContents: [],
  contentsleagues: [],
  contentExperience: null,
  contentExperienceTeams: null,
  comments: [],
  totalComments: null,

  // loaders
  contentsLoading: false,
  contentExperienceLoading: false,
  commentsLoading: false,
  addCommentLoading: false,
};

@State<ContentStateModel>({
  name: 'content',
  defaults,
})
@Injectable()
export class ContentState {
  constructor(public contentService: ContentService) {}

  @Action(ContentAction_GetContents)
  getContent(
    { patchState }: StateContext<ContentStateModel>,
    { page, size, league, team }: ContentAction_GetContents
  ) {
    patchState({ contentsLoading: true, contents: [] });
    return this.contentService.getContents(page, size, league, team).pipe(
      tap((response: IArticles) => {
        patchState({ contents: response.data, contentsLoading: false });
      })
    );
  }

  @Action(ContentAction_GetArchiveContents)
  getArchiveContent(
    { patchState }: StateContext<ContentStateModel>,
    { page, size, league }: ContentAction_GetArchiveContents
  ) {
    patchState({ contentsLoading: true });
    return this.contentService.getContents(page, size, league).pipe(
      tap((response: IArticles) => {
        patchState({ archiveContents: response, contentsLoading: false });
      })
    );
  }

  @Action(ContentAction_GetContentsLeagues)
  getContentLeagues(
    { patchState }: StateContext<ContentStateModel>,
    {}: ContentAction_GetContentsLeagues
  ) {
    patchState({ contentsLoading: true });
    return this.contentService.getContentsLeagues().pipe(
      tap((response: any) => {
        patchState({ contentsleagues: response.data, contentsLoading: false });
      })
    );
  }

  @Action(ContentAction_GetContentExperience)
  getContentExperience(
    { patchState }: StateContext<ContentStateModel>,
    { slug, type }: ContentAction_GetContentExperience
  ) {
    patchState({ contentExperienceLoading: true });
    return this.contentService.getContentExperience(slug, type).pipe(
      tap((response: IContentExperience) => {
        let data = response;

        let tempArr: any = [];
        let doubleArr: any = [];
        let singleArr: any = [];
        response.data.widgets.map((wig, i) => {
          if (wig.type === 'social_comment') {
            if (wig.source === 'twitter') {
              if (response.data.widgets[i + 1] !== undefined) {
                if (
                  response.data.widgets[i].source ===
                  response.data.widgets[i + 1].source
                ) {
                  doubleArr.push(response.data.widgets[i]);
                  doubleArr.push(response.data.widgets[i + 1]);
                } else {
                  if (doubleArr.length > 0) {
                    for (let i = 0; i < doubleArr.length; i++) {
                      const duplicates = doubleArr.filter(
                        (obj) => obj.id === doubleArr[i].id
                      );
                      if (duplicates.length > 1) {
                        doubleArr.splice(i + 1, 1); // remove the second object
                        i--; // decrement i to account for the removed object
                      }
                    }
                    tempArr.push({
                      arr: doubleArr,
                      type: response.data.widgets[i].type,
                    });

                    doubleArr = [];
                  } else {
                    singleArr.push(response.data.widgets[i]);
                    tempArr.push({
                      arr: singleArr,
                      type: response.data.widgets[i].type,
                    });
                    singleArr = [];
                  }
                }
              } else {
                if (doubleArr.length > 0) {
                  for (let i = 0; i < doubleArr.length; i++) {
                    const duplicates = doubleArr.filter(
                      (obj) => obj.id === doubleArr[i].id
                    );
                    if (duplicates.length > 1) {
                      doubleArr.splice(i + 1, 1); // remove the second object
                      i--; // decrement i to account for the removed object
                    }
                  }
                  tempArr.push({
                    arr: doubleArr,
                    type: response.data.widgets[i].type,
                  });

                  doubleArr = [];
                } else {
                  singleArr.push(response.data.widgets[i]);
                  tempArr.push({
                    arr: singleArr,
                    type: response.data.widgets[i].type,
                  });
                  singleArr = [];
                }
              }
            } else if (wig.source === 'reddit') {
              if (response.data.widgets[i + 1] !== undefined) {
                if (
                  response.data.widgets[i].source ===
                  response.data.widgets[i + 1].source
                ) {
                  doubleArr.push(response.data.widgets[i]);
                  doubleArr.push(response.data.widgets[i + 1]);
                } else {
                  if (doubleArr.length > 0) {
                    for (let i = 0; i < doubleArr.length; i++) {
                      const duplicates = doubleArr.filter(
                        (obj) => obj.id === doubleArr[i].id
                      );
                      if (duplicates.length > 1) {
                        doubleArr.splice(i + 1, 1); // remove the second object
                        i--; // decrement i to account for the removed object
                      }
                    }
                    tempArr.push({
                      arr: doubleArr,
                      type: response.data.widgets[i].type,
                    });
                    doubleArr = [];
                  } else {
                    singleArr.push(response.data.widgets[i]);
                    tempArr.push({
                      arr: singleArr,
                      type: response.data.widgets[i].type,
                    });
                    singleArr = [];
                  }
                }
              } else {
                if (doubleArr.length > 0) {
                  for (let i = 0; i < doubleArr.length; i++) {
                    const duplicates = doubleArr.filter(
                      (obj) => obj.id === doubleArr[i].id
                    );
                    if (duplicates.length > 1) {
                      doubleArr.splice(i + 1, 1); // remove the second object
                      i--; // decrement i to account for the removed object
                    }
                  }
                  tempArr.push({
                    arr: doubleArr,
                    type: response.data.widgets[i].type,
                  });

                  doubleArr = [];
                } else {
                  singleArr.push(response.data.widgets[i]);
                  tempArr.push({
                    arr: singleArr,
                    type: response.data.widgets[i].type,
                  });
                  singleArr = [];
                }
              }
            }
          } else {
            tempArr.push(wig);
          }
        });

        data.data.widgets = tempArr;
        // let wigs = response.data.widgets
        // wigs.map((a)=>{
        //   if(a.type ==='chart'){
        //     delete a.main_content.chartOptions?.xaxis.convertedCatToNumeric;
        //   }
        // })
        // response.data.widgets=wigs
        // Object.preventExtensions(response.data.widgets)

        // console.log('wigs',wigs)
        patchState({
          contentExperience: data.data,
          contentExperienceLoading: false,
        });
      })
    );
  }

  @Action(ContentAction_GetContentExperienceTeams)
  getContentExperienceTeams(
    { patchState }: StateContext<any>,
    { id }: ContentAction_GetContentExperienceTeams
  ) {
    patchState({ contentExperienceLoading: true });
    return this.contentService.getContentExperienceTeams(id).pipe(
      tap((response: any) => {
        if (response !== null) {
          patchState({
            contentExperienceTeams: response.data,
            contentExperienceLoading: false,
          });
        }
      })
    );
  }

  @Action(ContentAction_GetComments)
  getComments(
    { patchState, getState }: StateContext<ContentStateModel>,
    { entity_id, page, size }: ContentAction_GetComments
  ) {
    patchState({ commentsLoading: true, addCommentLoading: false });
    return this.contentService.getComments(entity_id, page, size).pipe(
      tap((response: IComment) => {
        // let comments = cloneDeep(getState()?.comments)
        // comments = [...comments, ...response.data]

        // let uniq_comments  = [...new Map(comments.map(item =>
        //   [item['id'], item])).values()];

        patchState({
          comments: response.data,
          totalComments: +response.totalRecords,
          commentsLoading: false,
        });
      })
    );
  }

  @Action(ContentAction_AddComment)
  addComment(
    { patchState, dispatch }: StateContext<ContentStateModel>,
    { new_comment }: ContentAction_AddComment
  ) {
    patchState({ addCommentLoading: true });
    return this.contentService.addComment(new_comment).pipe(
      tap((response: IComment) => {
        dispatch(new ContentAction_GetComments(new_comment.entity_id));
      })
    );
  }

  @Action(ContentAction_EditComment)
  editComment(
    { patchState, dispatch }: StateContext<ContentStateModel>,
    { edited_comment }: ContentAction_EditComment
  ) {
    patchState({ addCommentLoading: true });
    return this.contentService.editComment(edited_comment).pipe(
      tap((response: IComment) => {
        dispatch(new ContentAction_GetComments(edited_comment.entity_id));
      })
    );
  }

  @Action(ContentAction_DeleteComment)
  deleteComment(
    { patchState, dispatch }: StateContext<ContentStateModel>,
    { edited_comment }: ContentAction_DeleteComment
  ) {
    patchState({ commentsLoading: true });
    return this.contentService.deleteComment(edited_comment).pipe(
      tap((response: IComment) => {
        dispatch(new ContentAction_GetComments(edited_comment.entity_id));
      })
    );
  }
}
