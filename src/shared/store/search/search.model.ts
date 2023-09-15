export interface SearchData {
    data: Data
    totalRecords: number
    page: number
    size: number
  }
  
  export interface Data {
    experiences: Experience[]
    players: Player[]
    articles: Article[]
    teams: any[]
  }
  
  export interface Experience {
    id: string
    title: string
    link?: string
    keywords?: string
    image_credit: string
    authors?: string
    organization: string
    slug: string
    post: string
    created_at: string
    type: string
    status: string
    views: string
    source?: string
    image: string
    published_date?: string
    thumbnail: string
    rownumber: string
  }
  
  export interface Player {
    bio: any
    dob: string
    height: string
    sports_id: any
    my_sportsfeed_key: string
    feed_name: any
    weight: string
    display_picture: any
    country: string
    created_at: string
    modified_at: any
    is_active: boolean
    id: number
    status: any
    author_id: any
    created_by: any
    twitter_handle: any
    slug: string
    team: any
    first_name: string
    last_name: string
    squad: string
    jersey_number?: string
    position: string
    rookie: boolean
    college: string
    high_school: any
    city: string
    handedness: any
    drafted_year?: number
    round?: number
    round_pick?: number
    drafted_by?: string
    salary: any
    avg_salary: any
    current_injury: any
    name: any
    league_id: any
    league_name: any
    rownumber: string
  }
  
  export interface Article {
    id: string
    title: string
    link: string
    image_credit: any
    authors: string
    organization: string
    slug: string
    post: string
    created_at: string
    type: string
    source: string
    image: string
    published_date: string
    thumbnail: any
    teams: string
    team_fullnames: string
    team_colors: string
    team_slugs: string
    rownumber: string
  }
  