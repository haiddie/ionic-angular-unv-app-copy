import { cloneDeep } from 'lodash';
import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';

import { tap } from 'rxjs/operators';
import { UserService } from './user.service';
import { create_user_resp, IsUserRegistered, User } from './user.models';
import {  UserAction_IsUserRegistered,  UserAction_RegisterUserwithEmail,  UserAction_SignOutUser } from './user.actions';
import { HttpErrorResponse } from '@angular/common/http';


export class UserStateModel {
  public user: User;
  public isUserRegistered: IsUserRegistered;
  public RegisterUserwithEmail: create_user_resp

  // loaders
  public isLoading: boolean;

}

const userInitialState = {
  isLoggedIn: false,
  isEmailVerified: false,
  id: null,
  email: null,
  name: null,
  username:null
};


const defaults = {
  user: userInitialState,
  isUserRegistered: null,
  RegisterUserwithEmail: null,

  // loaders
  isLoading: false,

};

@State<UserStateModel>({
  name: 'user',
  defaults
})
@Injectable()
export class UserState {
  constructor(private userService: UserService, ) { }


  @Action(UserAction_IsUserRegistered)
  checkUserRegistered(
    { patchState }: StateContext<UserStateModel>,
    { email }: UserAction_IsUserRegistered
  ) {

    if (email){
      patchState({ isUserRegistered: null, user: userInitialState, isLoading: true })
    } 
    return this.userService.checkUserRegistered(email).pipe(
      tap((response: IsUserRegistered) => {
        const resp = cloneDeep(response);
        const getEmail = resp.message.split(' ');
        const getName = getEmail[0].split("@")
       
        const redirectedWithLink  =  window.location.href.includes("mode=signIn") 
       
        if (redirectedWithLink === true && resp.success === false  ){ 
           localStorage.setItem('email', getEmail[0])
         }  
       
        if (resp.success === true){
          localStorage.removeItem('email')
        }
         let  email = localStorage.getItem('email')
             patchState({
              isUserRegistered: {
                success: resp.success,
                message: resp.message
              },
              isLoading: false,
              user:  
              {
                isLoggedIn: true,
                isEmailVerified: true,
                id: null,
                email: email,
                name: getName[0]
              }
            })
        
       
      },
      (error: HttpErrorResponse) => {
      })
    )
  }

  
  @Action(UserAction_RegisterUserwithEmail)
  registerUserwithEmail(
    { patchState }: StateContext<UserStateModel>,
    { createUser }: UserAction_RegisterUserwithEmail
  ) {
    patchState({  isLoading: true })

    return this.userService.registerUserwithEmail(createUser).pipe(
      tap((response: create_user_resp) => {

        if (response){
          const resp = cloneDeep(response);
          patchState({
           RegisterUserwithEmail: {
              code: "User Registered Successfully",
              message: resp.message
            },
            isLoading: false 
            })
        }
        
      },
      (error: HttpErrorResponse) => {
        const resp = cloneDeep(error);
        patchState({
         RegisterUserwithEmail: {
            code: resp.error.code,
            message: resp.error.message
          },
          isLoading: false 
          })
      }
      )
    )
  }

 


 
  
  @Action(UserAction_SignOutUser)
  siugnOutUser(
    { patchState }: StateContext<UserStateModel>,
    { signOut }: UserAction_SignOutUser
  ) {
    patchState({ 
      isUserRegistered: null, user: userInitialState })

   
  }

 
  
}