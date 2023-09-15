export interface IPlayer {
  data: Player[],
  totalRecords: string | number,
  page: number,
  size: number
}

export interface ITweets {
  data: Tweets
}

export interface Tweets {
  tweets: Tweet[],
  writertweets:Tweet[],
  mentions: Tweet[]
}

export interface Tweet {
  text: string,
  author_id: string,
  id: string,
  attachments?: {
      media_keys: string[]
  }
}

export interface Player {
  bio: string,
  dob:string,
  height: string,
  sports_id: number | string,
  my_sportsfeed_key: number | string,
  feed_name:  string,
  weight: number | string,
  display_picture:  string,
  country:  string,
  created_at: Date | string,
  modifiedt_at: Date | string,
  is_active: boolean,
  id: number | string,
  status:  string,
  league_name:string,
  league_id:string,
  author_id: number | string,
  created_by:  string,
  twitter_handle:  string,
  slug:  string,
  team: number | string,
  first_name:  string,
  last_name:  string,
  squad:  string,
  jersey_number: number | string,
  position:  string,
  rookie: boolean,
  college:  string,
  high_school:  string,
  city:  string,
  name:  string,
  handedness: any,
  rownumber: number | string,
  totalrequests: number | string,
}



export interface IArticles {
  data: Article[],
  totalRecords: string | number,
  page: number,
  size: number
}

export interface Article {
  id?: string,
  title?: string,
  link?: string,
  post?: string,
  created_at?: string,
  meta_description?: string,
  keywords?: string,
  is_editors_pick?: boolean,
  image?: string,
  image_credit?: string,
  authors?: string,
  modified_at?: string,
  modified_by?: string,
  organization?: string,
  slug?: string,
  teams?: string,
  type?: string,
  person?: string,
  status?: string,
  views?: string,
  city?: string,
  source?: string,
  published_date?: string,
  rownumber?: string,
  totalrequests?: string,
  author_slug?: string;
  author_id?: string,
}

// export interface ITweets {
//   data: Tweets
// }

// export interface Tweets {
//   tweets: Tweet[],
//   mentions: Tweet[]
// }

// export interface Tweet {
//   text: string,
//   author_id: string,
//   id: string,
//   attachments?: {
//       media_keys: string[]
//   }
// }