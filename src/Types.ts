/**
 * Represents a user account
 */
export interface account {
  username: string;
  id: number;
  is_v1: boolean;
  created_at: string;
  profile_views: number;
  lastUsernameChange: null | string;
  subscription: boolean;
  subscription_start_date: null | string;
  secret: string;
  gems: number;
  xp: number;
  email?: string;
  password: string;
  skins: {
    equipped: number;
    owned: number[];
  };
}

/**
 * Represents a private user object
 */
export interface privUser {
  account: account;
  token: string;
}

/**
 * Represents the response from an API call
 */
export interface ApiResponse {
  error?: string;
  message?: string;  
}