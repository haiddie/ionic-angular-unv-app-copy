export class PlayerAction_GetPlayer {
  static readonly type = '[Player] Get Player';
  constructor(public slug: string,public token?:string ) { }
}

export class PlayerAction_GetPlayerImages {
  static readonly type = '[Player] Get Player Images';
  constructor(public player_name: string,public token:string ) { }
}

export class PlayerAction_GetArticles {
  static readonly type = '[Player] Get Player Articles';
  constructor(
    public player_name: string ,
    public page?: number, 
    public size?: number,
    public sort_order?: 'ASC' | 'DESC'
  ) {}
}

export class PlayerAction_GetTeamByAuthorId {
  static readonly type = '[Player] Get Team By Author Id';
  constructor(
    public author_id: string ,
    public article_id:string ,
 
  ) {}
  }
  export class PlayerAction_GetTweets {
    static readonly type = '[Player] Get Player Tweets';
    constructor(
      public username: string,
      public limit?: number
    ) {}
}
