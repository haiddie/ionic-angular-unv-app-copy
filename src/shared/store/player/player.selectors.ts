import { Selector } from '@ngxs/store';
import { Team } from '../header/header.models';
import { Article, Player, Tweet } from './player.models';
import { PlayerState, PlayerStateModel } from './player.state';

export class PlayerSelectors {

  @Selector([PlayerState]) static player(state: PlayerStateModel): Player {return state.player}

  @Selector([PlayerState]) static playerImages(state: PlayerStateModel): any {return state.playerImages}

  @Selector([PlayerState]) static playerTweets(state: PlayerStateModel): Tweet[] {return state.playerTweets.tweets}

  @Selector([PlayerState]) static articles(state: PlayerStateModel): Article[] {return state.articles}

  @Selector([PlayerState]) static authorTeam (state: PlayerStateModel): any {return state.authorTeam}

  // loaders

  @Selector([PlayerState]) static articlesLoading(state: PlayerStateModel): boolean {return state.articlesLoading}

  @Selector([PlayerState]) static playerLoading(state: PlayerStateModel): boolean {return state.isPlayerLoading}


}