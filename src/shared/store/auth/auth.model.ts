export interface AuthState {
  isLoggedIn?: boolean,
  isEmailVerified?: boolean,
  id?: string,
  email?: string,
  name?: string,
  phone_number?: string,
  token?: string,
  display_picture?: string,
  username?:string
}

export interface Login { 
  email: string,
  password: string 
}

export interface SignUp { 
  name: string,
  email: string,
  password: string 
}


export interface checkUserRegisteredResp {
   success: boolean,
   message: string
}
// export interface create_user {
//   email: string;
//   // uid: string;
//   // role: string;
//   register_passwordless: boolean;
// }

export interface user_info {
  name: string;
  email: string;
  username:string;
  phone_number?: string;
  uid: string;
  display_picture?: string;
  register: boolean;
  sign_up_page:string
}