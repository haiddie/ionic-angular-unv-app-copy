export interface NhlScoringStats {
  playerStatsTotals: any,
  total: number
}


export interface User {
  isLoggedIn: boolean,
  isEmailVerified: boolean,
  id: string | null,
  email: string | null,
  name: string | null
};

export interface IsUserRegistered {
  success: boolean,
  message: string
}

export interface create_user {
 email: string;
 register_passwordless: boolean;
}

export interface create_user_resp {
  code: string;
  message: boolean;
 }