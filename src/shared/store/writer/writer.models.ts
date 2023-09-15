export interface IWriter {
  data: Writer[],
  totalRecords: string | number,
  page: number,
  size: number
}

export interface Writer {
  created_at:string,
  id: string | number,
  source: string,
  totalarticles: string,
  name: string,
  organization: any,
  user_id: string,
  city: any,
  bio: string,
  twitter_handle: string,
  publications: string,
  display_image: string,
  slug: string,
  rating: string | number,
  number: string | number,
  status: string,
  ratings: string,
  posts: string,
  clicks: string,
  team_slug:string,
  website:string,
  city_slug:string,
  
  // totalarticles: string,
  // totalrequests: string,
  // rownumber: string
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
  totalrequests?: string
}

export interface ITweets {
  data: Tweets
}

export interface Team {
  author_id?:string, 
  author_slug?:string,
  awards?:string,
  championships?:string,
  city?:string,
  city_id?:string,
  created_at?:string,
  date_found?:string,
  description?:string,
  division_id?:string,
  hall_of_fame?:string,
  head_coach?:string,
  head_coach_url?:string,
  history?:string,
  id?:string,
  is_active?:string,
  keyword?:string,
  keywords?:string,
  name?:string,
  slug?:string


}

export interface Tweets {
  tweets: Tweet[],
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