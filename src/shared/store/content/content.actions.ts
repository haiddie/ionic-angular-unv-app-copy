export class ContentAction_GetContents {
  static readonly type = '[Content] Get Contents';
  constructor(
    public page?: number,
    public size?: number,
    public league?: string,
    public team?: string
  ) {}
}

export class ContentAction_GetArchiveContents {
  static readonly type = '[Content] Get Archive Contents';
  constructor(
    public page?: number,
    public size?: number,
    public league?: string
  ) {}
}

export class ContentAction_GetContentExperience {
  static readonly type = '[Content] Get Content Experience';
  constructor(public slug: string, public type: string) {}
}

export class ContentAction_GetContentsLeagues {
  static readonly type = '[Content] Get Contents Leagues';
  constructor() {}
}

export class ContentAction_GetContentExperienceTeams {
  static readonly type = '[Content] Get Content Experience Teams';
  constructor(public id: string) {}
}

export class ContentAction_GetComments {
  static readonly type = '[Content] Get Comments';
  constructor(
    public entity_id: string | number,
    public page?: number,
    public size?: number
  ) {}
}

export class ContentAction_AddComment {
  static readonly type = '[Content] Add Comment';
  constructor(public new_comment: any) {}
}

export class ContentAction_EditComment {
  static readonly type = '[Content] Edit Comment';
  constructor(public edited_comment: any) {}
}
export class ContentAction_DeleteComment {
  static readonly type = '[Content] Delete Comment';
  constructor(public edited_comment: any) {}
}
