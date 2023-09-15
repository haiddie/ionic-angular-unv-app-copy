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
  published_date?:string,
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
  pubished_date?: string,
  rownumber?: string,
  totalrequests?: string
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

export interface WeatherInfo {
  mainInfo: string,
  icon: string,
  temp: string,
  humidity: string,
  wind: number
}


