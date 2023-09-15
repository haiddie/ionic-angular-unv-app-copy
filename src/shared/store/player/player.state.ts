import { Article } from 'src/shared/store/home/home.models';
import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { IArticles, IPlayer, ITweets, Player, Tweets } from './player.models';
import { PlayerService } from './player.service';
import { PlayerAction_GetArticles, PlayerAction_GetPlayer, PlayerAction_GetPlayerImages, PlayerAction_GetTeamByAuthorId, PlayerAction_GetTweets } from './player.actions';
import { Team } from '../header/header.models';

export class PlayerStateModel {
  public player: Player;
  public playerImages:any;
  public playerTweets: any;
  public articles: Article[];
  public authorTeam: any;

  // loaders
  public isPlayerLoading: boolean;
  public articlesLoading: boolean;
}

const defaults = {
  player: null,
  playerImages:null,
  playerTweets: null,
  articles: [],
  authorTeam: null,
  // loaders
  articlesLoading: false,
  isPlayerLoading: false,
};

@State<PlayerStateModel>({
  name: 'player',
  defaults
})
@Injectable()
export class PlayerState {
  TeamTweets: any = []
  constructor(private playerService: PlayerService) { }

  @Action(PlayerAction_GetPlayer)
  getPlayer(
    { patchState, dispatch }: StateContext<PlayerStateModel>,
    { slug,token }: PlayerAction_GetPlayer
  ) {
    patchState({ isPlayerLoading: true })
    return this.playerService.getPlayer(slug,token).pipe(
      tap((response: any) => {
      console.log('res',response);
      console.log('response.data[0]',response.data[0])
        //let name = slug.split("-")
        let player_fullname = `${response.data[0].first_name}`+' '+`${response.data[0].last_name}`
        if (response?.attributes?.length !== 0) {
          response?.attributes.map((T) => {
            if (T.attribute_name === 'TWITTER' || T.attribute_name === 'twitter' || T.attribute_name === 'Twitter') {
              dispatch(new PlayerAction_GetTweets(T.attribute_value,10))
            }
          })
        }
        console.log('player_fullname',player_fullname)
        dispatch(new PlayerAction_GetArticles(player_fullname, 1, 10, 'DESC'))
        patchState({ player: response.data[0], isPlayerLoading: false })
      },(err)=>{
        console.log('err',err)
      })
    )
  }

  @Action(PlayerAction_GetPlayerImages)
  getPlayerImages(
    { patchState, dispatch }: StateContext<PlayerStateModel>,
    { player_name,token}: PlayerAction_GetPlayerImages
  ) {
    patchState({ isPlayerLoading: true })
    return this.playerService.getPlayerImages(player_name,token).pipe(
      tap((response: any) => {

        let imagesArr=[]
        for(let i=0;i<response.data.length;i++){
          for(let j=0;j<1;j++){
            imagesArr.push(response.data[i][0].previewUrl)
          }
        }

        patchState({ playerImages: imagesArr, isPlayerLoading: false })
        }
      )
       
    
    )
  }

  @Action(PlayerAction_GetArticles)
  getPlayerArticles(
    { patchState, dispatch }: StateContext<PlayerStateModel>,
    { player_name, page, size, sort_order }: PlayerAction_GetArticles
  ) {
    patchState({ articlesLoading: true })
    return this.playerService.getPlayerArticles(player_name, page, size, sort_order).pipe(
      tap((response: IArticles) => {

        response.data.map(article => {
          if (article.id) {
            // if (article.author_id)
            // dispatch(new PlayerAction_GetTeamByAuthorId(  article.author_id, article.id ))
            dispatch(new PlayerAction_GetTeamByAuthorId("37268", article.id))

          }
        })
       
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

  @Action(PlayerAction_GetTweets)
  getPlayerTweets(
    { patchState }: StateContext<PlayerStateModel>,
    { username, limit }: PlayerAction_GetTweets
  ) {
    return this.playerService.getTweetsByUserName(username, limit, 'DESC').pipe(
      tap((response: ITweets) => {
        let newArr;
        if(response.data.tweets.length!==0){
          newArr= response.data

        }
        patchState({ playerTweets: newArr })
      })
    )
  }


  @Action(PlayerAction_GetTeamByAuthorId)
  getTeambyAuthorId(
    { patchState }: StateContext<PlayerStateModel>,
    { author_id, article_id }: PlayerAction_GetTeamByAuthorId
  ) {
    return this.playerService.getTeambyAuthorId(author_id).pipe(
      tap((response: Team[]) => {


        patchState({ authorTeam: { team: response, article_id: article_id } })
      })
    )
  }

}