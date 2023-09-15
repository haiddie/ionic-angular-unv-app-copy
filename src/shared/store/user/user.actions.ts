// import { create_user } from "../auth/auth.model";



export class UserAction_GetUser {
  static readonly type = '[User] Get User';
  constructor(
   
    ) { }
}

export class UserAction_IsUserRegistered {
  static readonly type = '[User] Check Is User Registered';
  constructor(
   public email: string
    ) { }
}

export class UserAction_SignOutUser {
  static readonly type = '[User] Sign Out User';
  constructor(
   public signOut: boolean
    ) { }
}


export class UserAction_RegisterUserwithEmail {
  static readonly type = '[User] Create User with Email';
  constructor(
   public createUser : any
   ) { }
}