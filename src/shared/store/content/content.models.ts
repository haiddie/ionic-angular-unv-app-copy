export interface IContentExperience {
  data: ContentExperience,
  totalRecords: string | number,
  page: number,
  size: number
}

export interface ContentExperience {
  content: Content[],
  blocks: Widget[],
  widgets:Widget[]
  social_comments:any[]
}

export interface Content {
  id: string,
  title: string,
  link: string,
  post: string,
  created_at: string,
  meta_description: string,
  keywords: string,
  is_editors_pick: boolean,
  image: string,
  image_credit: string,
  authors: string,
  modified_at: string,
  modified_by: string,
  organization: string,
  slug: string,
  teams: string,
  type: string,
  person: string,
  status: string,
  published_date: string,
  city: string,
  views: string,
  source: string,
  rownumber: string,
  totalrequests: string
}

export interface Widget {
  id: string,
  number:string,
  title: string,
  display_text: string,
  meta_description: string,
  keywords: string,
  content_id: string,
  main_content:any,
  url: string,
  type: string,
  image_url: string,
  image_links:string,
  created_at: string,
  modified_at: string,
  status: string,
  widget_id: string
  source:string,
  author:string,
  is_text:boolean,
  is_title:boolean
}

export interface IComment {
  data: Comment[],
  totalRecords: string | number,
  page: number,
  size: number
}

export interface Comment {
  status?: string;
  comment?: string;
  entity?: string;
  entity_id?: number;
  id?: number;
  name?: string;
  username?: string;
  created_at?: string;
  created_by?: string;
  display_picture?: string;
}
