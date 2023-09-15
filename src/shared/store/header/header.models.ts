export interface Menu {
  menu: MenuItem[]
}

export interface MenuItem {
  title: string,
  id: number,
  icon?: string,
  conferences: Conference[],
  divisions: Division[],
  divsInMobileRow: number,
  divsInRow: number,
  // stats? : any
}



export interface Conference {
  title?: string, url?: string, id?: string | number
}

export interface Division {
  title?: string,
  id?: string | number,
  url?: string,
  teams: Team[]
}

export interface Team {
  title?: string, id?: string | number, url?: string, league?: string,slug?:string
}