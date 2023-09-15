export class WriterAction_GetWriter {
  static readonly type = '[Writer] Get Writer';
  constructor(public slug: string | number) { }
}

export class WriterAction_GetArticles {
  static readonly type = '[Writer] Get Writer Articles';
  constructor(
    public author: string,
    public page?: number, 
    public size?: number,
    public sort_order?: 'ASC' | 'DESC'
  ) {}
}

export class WriterAction_GetTweets {
  static readonly type = '[Writer] Get Tweets';
  constructor(
    public username: string,
    public limit?: number
  ) {}
}

export class WriterAction_GetTeamArticles {
  static readonly type = '[Writer] Get Team Articles';
  constructor(
    public team: string,
    public page?: number, 
    public size?: number,
    public sort_order?: 'ASC' | 'DESC'
  ) {}
}


export class WriterAction_GetTeams{
  static readonly type = '[Writer] Get Teams ';
  constructor(
    public slug: any
  ) {}
}