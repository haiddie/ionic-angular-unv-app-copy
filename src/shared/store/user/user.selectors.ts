
import { Selector } from '@ngxs/store';
import { create_user, create_user_resp, IsUserRegistered, NhlScoringStats, User } from './user.models';
import { UserState, UserStateModel } from './user.state';

export class UserSelectors {

 
  
  @Selector([UserState]) static user( state: UserStateModel ): User { return state.user}
  @Selector([UserState]) static createUser( state: UserStateModel ): create_user_resp { return state.RegisterUserwithEmail}
  @Selector([UserState]) static userRegistered ( state: UserStateModel ): IsUserRegistered { return state.isUserRegistered}
  
  //Loaders
  @Selector([UserState]) static isLoading ( state: UserStateModel ): boolean { return state.isLoading}
 
}