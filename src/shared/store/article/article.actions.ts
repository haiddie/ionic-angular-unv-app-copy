export class ArticleAction_GetArticle {
  static readonly type = '[Article] Get Article';
  constructor(
    public slug: string,
  ) {}
}

export class ArticleAction_GetRelatedStories {
  static readonly type = '[Article] Get Related Stores';
  constructor(
    public team: string,
    public page?: number,
    public size?: number,
  ) {}
}
