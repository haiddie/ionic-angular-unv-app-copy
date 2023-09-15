import { ICities, ILeagueConferences, ILeagueDivisions, ILeagueTeams, LeagueConference, LeagueDivision, LeagueTeam } from './../home/home.models';
import { HeaderService } from './header.service';
import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { HeaderAction_AdjustConferences, HeaderAction_AdjustDivisions, HeaderAction_AdjustTeams, HeaderAction_GetLeagueConferences, HeaderAction_GetLeagueDivisions, HeaderAction_GetLeagues, HeaderAction_GetLeagueTeams } from './header.actions';
import { tap } from 'rxjs/operators';
import { ILeagues, League } from '../home/home.models';
import { Division, Menu, MenuItem } from './header.models';
import { cloneDeep } from 'lodash';
import { Store } from '@ngxs/store';

export class HeaderStateModel {
  public leagues: League[];
  public leagueConferences: LeagueConference[];
  public leagueDivisions: LeagueDivision[];
  public leagueTeams: LeagueTeam[];
  public teamsFetched: number[];
  public leagueDivisionsFetched: number[];

  public menu: Menu;
  public menuItems: MenuItem[];
}

const defaults = {
  leagues: [],
  leagueConferences: [],
  leagueDivisions: [],
  leagueTeams: [],
  teamsFetched: [],
  leagueDivisionsFetched: [],

  menu: null,
  menuItems: []
};



const leagues = [
  {
    title: 'NFL',
    id: 55,
    // icon: league.logo,
    conferences: [
      {
          "title": "NFL Home",
          "url": "nfl",
          "id": 55
      },
      {
          "title": "AFC",
          "id": 20,
          "url": "nfl-american-football-conference"
      },
      {
          "title": "NFC",
          "id": 19,
          "url": "nfl-national-football-conference"
      }
  ],
    divisions: [
      {
        title: 'AFC East',
        id: 36,
        url: 'afc-east',
        teams:[
          {
            title:'Buffalo Bills',
            url:'buffalo-bills',
            id:133
          },
          {
            title:'Miami Dolphins',
            url:'miami-dolphins',
            id:86
          },
          {
            title:'New England Patriots',
            url:'new-england-patriots',
            id:75
          },
          {
            title:'New York Jets',
            url:'new-york-jets',
            id:69
          },
        ]
      },
      {
        title: 'AFC North',
        id: 26,
        url: 'afc-north',
        teams:[
          {
            title:'Baltimore Ravens',
            url:'baltimore-ravens',
            id:138
          },
          {
            title:'Cincinnati Bengals',
            url:'cincinnati-bengals',
            id:122
          },
          {
            title:'Cleveland Browns',
            url:'cleveland-browns',
            id:120
          },
          {
            title:'Pittsburgh Steelers',
            url:'pittsburgh-steelers',
            id:52
          },
        ]
      },
    
      {
        title: 'AFC South',
        id: 27,
        url: 'afc-south',
        teams:[
          {
            title:'Houston Texans',
            url:'houston-texans',
            id:99
          },
          {
            title:'Indianapolis Colts',
            url:'indianapolis-colts',
            id:97
          },
          {
            title:'Jacksonville Jaguars',
            url:'jacksonville-jaguars',
            id:96
          },
          {
            title:'Tennessee Titans',
            url:'tennessee-titans',
            id:36
          },
        ]
      },
      {
        title: 'AFC West',
        id: 28,
        url: 'afc-west',
        teams:[
          {
            title:'Denver Broncos',
            url:'denver-broncos',
            id:111
          },
          {
            title:'Kansas City Chiefs',
            url:'kansas-city-chiefs',
            id:95
          },
          {
            title:'Las Vegas Raiders',
            url:'las-vegas-raiders',
            id:63
          },
          {
            title:'Los Angeles Chargers',
            url:'los-angeles-chargers',
            id:48
          },
        ]
      },
      {
        title: 'NFC East',
        id: 25,
        url: 'nfc-east',
        teams:[
          {
            title:'Dallas Cowboys',
            url:'dallas-cowboys',
            id:114
          },
          {
            title:'New York Giants',
            url:'new-york-giants',
            id:71
          },
          {
            title:'Philadelphia Eagles',
            url:'philadelphia-eagles',
            id:58
          },
          {
            title:'Washington Commanders',
            url:'washington-football-team',
            id:27
          },
        ]
      },
      {
        title: 'NFC North',
        id: 24,
        url: 'nfc-north',
        teams:[
          {
            title:'Chicago Bears',
            url:'chicago-bears',
            id:127
          },
          {
            title:'Detroit Lions',
            url:'detroit-lions',
            id:109
          },
          {
            title:'Green Bay Packers',
            url:'green-bay-packers',
            id:102
          },
          {
            title:'Minnesota Vikings',
            url:'minnesota-vikings',
            id:79
          },
        ]
      },
    
      {
        title: 'NFC South',
        id: 17,
        url: 'nfc-south',
        teams:[
          {
            title:'Atlanta Falcons',
            url:'atlanta-falcons',
            id:141
          },
          {
            title:'Carolina Panthers',
            url:'carolina-panthers',
            id:129
          },
          {
            title:'New Orleans Saints',
            url:'new-orleans-saints',
            id:72
          },
          {
            title:'Tampa Bay Buccaneers',
            url:'tampa-bay-buccaneers',
            id:39
          },
        ]
      },
      {
        title: 'NFC West',
        id: 18,
        url: 'nfc-west',
        teams:[
          {
            title:'Arizona Cardinals',
            url:'arizona-cardinals',
            id:145
          },
          {
            title:'Los Angeles Rams',
            url:'los-angeles-rams',
            id:88
          },
          {
            title:'San Francisco 49ers',
            url:'san-francisco-49ers',
            id:46
          },
          {
            title:'Seattle Seahawks',
            url:'seattle-seahawks',
            id:42
          },
        ]
      },
    ],
    divsInRow: 4,
    divsInMobileRow: 2
  },
  {
    title: 'NHL',
    id: 40,
    // icon: league.logo,
    conferences: [
      {
          "title": "NHL Home",
          "url": "nhl",
          "id": 40
      },
      {
          "title": "Eastern",
          "id": 15,
          "url": "nhl-eastern-conference"
      },
      {
          "title": "Western",
          "id": 16,
          "url": "nhl-western-conference"
      }
  ],
    divisions: [
      {
        title: 'Atlantic',
        id: 19,
        url: 'nhl-atlantic',
        teams:[
          {
              "title": "Boston Bruins",
              url: "boston-bruins",
              "id": 137,
          },
          {
              "title": "Buffalo Sabres",
              url: "buffalo-sabres",
              "id": 132,
            
          },
          {
              "title": "Detroit Red Wings",
              url: "detroit-red-wings",
              "id": 107,
             
          },
          {
              "title": "Florida Panthers",
              url: "florida-panthers",
              "id": 104,
            
          },
          {
              "title": "Montreal Canadiens",
              url: "montreal-canadiens",
              "id": 77,
         
          },
          {
              "title": "Ottawa Senators",
              url: "ottawa-senators",
              "id": 60,
          
          },
          {
              "title": "Tampa Bay Lightning",
              url: "tampa-bay-lightning",
              "id": 38,
          
          },
          {
              "title": "Toronto Maple Leafs",
              url: "toronto-maple-leafs",
              "id": 33,
            
          }
      ]
      },
      {
        title: 'Metropolitan',
        id: 32,
        url: 'nhl-metropolitan',
        teams:[
          {
              "title": "Carolina Hurricanes",
              url: "carolina-hurricanes",
              "id": 130,
          
          },
          {
              "title": "Columbus Blue Jackets",
              url: "columbus-blue-jackets",
              "id": 115,
          
          },
          {
              "title": "New Jersey Devils",
              url: "new-jersey-devils",
              "id": 74,
          
          },
          {
              "title": "New York Islanders",
              url: "new-york-islanders",
              "id": 70,
            
          },
          {
              "title": "New York Rangers",
              url: "new-york-rangers",
              "id": 66,
          },
          {
              "title": "Philadelphia Flyers",
              url: "philadelphia-flyers",
              "id": 57,
          
          },
          {
              "title": "Pittsburgh Penguins",
              url: "pittsburgh-penguins",
              "id": 54,
          
          },
          {
              "title": "Washington Capitals",
              url: "washington-capitals",
              "id": 29,
          
          }
      ]
      },
      {
        title: 'Central',
        id: 20,
        url: 'nhl-central',
        teams:[

          {
            "title": "Arizona Coyotes",
            url: "arizona-coyotes",
            "id": 144,
        },
          {
              "title": "Chicago Blackhawks",
              url: "chicago-blackhawks",
              "id": 126,
          
          },
          {
              "title": "Colorado Avalanche",
              url: "colorado-avalanche",
              "id": 117,
          
          },
          {
              "title": "Dallas Stars",
              url: "dallas-stars",
              "id": 112,
          
          },
          {
              "title": "Minnesota Wild",
              url: "minnesota-wild",
              "id": 78,
          
          },
          {
              "title": "Nashville Predators",
              url: "nashville-predators",
              "id": 76,
          
          },
          {
              "title": "St. Louis Blues",
              url: "st-louis-blues",
              "id": 41,
          
          },
          {
              "title": "Winnipeg Jets",
              url: "winnipeg-jets",
              "id": 25,
          }
      ]
      },
      {
        title: 'Pacific',
        id: 21,
        url: 'nhl-pacific',
        teams:[
          {
              "title": "Anaheim Ducks",
              url: "anaheim-ducks",
              "id": 146,
          
          },
          {
              "title": "Calgary Flames",
              url: "calgary-flames",
              "id": 131,
          
          },
          {
              "title": "Edmonton Oilers",
              url: "edmonton-oilers",
              "id": 105,
          
          },
          {
              "title": "Los Angeles Kings",
              url: "los-angeles-kings",
              "id": 90,
         
          },
          {
              "title": "San Jose Sharks",
              url: "san-jose-sharks",
              "id": 44,
          
          },
          {
              "title": "Seattle Kraken",
              url: "seattle-kraken",
              "id": 23,
          },
          {
              "title": "Vancouver Canucks",
              url: "vancouver-canucks",
              "id": 30,
          
          },
          {
              "title": "Vegas Golden Knights",
              url: "vegas-golden-knights",
              "id": 24,
          
          }
      ]
      },
    ],
    divsInRow: 4,
    divsInMobileRow: 2
  },
  {
    title: 'NBA',
    id: 42,
    // icon: league.logo,
    conferences: [
      {
          "title": "NBA Home",
          "url": "nba",
          "id": 42
      },
      {
          "title": "Eastern",
          "id": 18,
          "url": "nba-eastern-conference"
      },
      {
          "title": "Western",
          "id": 17,
          "url": "nba-western-conference"
      }
  ],
    divisions: [
      {
        title: 'Atlantic',
        id: 33,
        url: 'nba-atlantic',
        teams:[
          {
              "title": "Boston Celtics",
              url: "boston-celtics",
              "id": 136,
          
          },
          {
              "title": "Brooklyn Nets",
              url: "brooklyn-nets",
              "id": 134,
          },
          {
              "title": "New York Knicks",
              url: "new-york-knicks",
              "id": 68,
          },
          {
              "title": "Philadelphia 76ers",
              url: "philadelphia-76ers",
              "id": 59,
          
          },
          {
              "title": "Toronto Raptors",
              url: "toronto-raptors",
              "id": 32,
          
          }
      ]
      },
      {
        title: 'Central',
        id: 34,
        url: 'nba-central',
        teams:[
          {
              "title": "Chicago Bulls",
              url: "chicago-bulls",
              "id": 125,
          },
          {
              "title": "Cleveland Cavaliers",
              url: "cleveland-cavaliers",
              "id": 119,
          
          },
          {
              "title": "Detroit Pistons",
              url: "detroit-pistons",
              "id": 108,
          
          },
          {
              "title": "Indiana Pacers",
              url: "indiana-pacers",
              "id": 98,

          },
          {
              "title": "Milwaukee Bucks",
              url: "milwaukee-bucks",
              "id": 82,
          
          }
      ]
      },
      {
        title: 'Southeast',
        id: 14,
        url: 'nba-southeast',
        teams:[
          {
              "title": "Atlanta Hawks",
              url: "atlanta-hawks",
              "id": 140,
           
          },
          {
              "title": "Charlotte Hornets",
              url: "charlotte-hornets",
              "id": 128,
          
          },
          {
              "title": "Miami Heat",
              url: "miami-heat",
              "id": 85,
          
          },
          {
              "title": "Orlando Magic",
              url: "orlando-magic",
              "id": 61,
          
          },
          {
              "title": "Washington Wizards",
              url: "washington-wizards",
              "id": 26,
          }
      ]
      },
    
      {
        title: 'Northwest',
        id: 15,
        url: 'nba-northwest',
        teams:[
          {
              "title": "Denver Nuggets",
              url: "denver-nuggets",
              "id": 110,
           
          },
          {
              "title": "Minnesota Timberwolves",
              url: "minnesota-timberwolves",
              "id": 81,
          
          },
          {
              "title": "Oklahoma City Thunder",
              url: "oklahoma-city-thunder",
              "id": 62,
          
          },
          {
              "title": "Portland Trail Blazers",
              url: "portland-trail-blazers",
              "id": 51,
          
          },
          {
              "title": "Utah Jazz",
              url: "utah-jazz",
              "id": 31,
    
          }
      ]
      },
      {
        title: 'Pacific',
        id: 35,
        url: 'nba-pacific',
        teams:[
          {
              "title": "Golden State Warriors",
              url: "golden-state-warriors",
              "id": 103,
             
          },
          {
              "title": "Los Angeles Clippers",
              url: "los-angeles-clippers",
              "id": 92,
          
          },
          {
              "title": "Los Angeles Lakers",
              url: "los-angeles-lakers",
              "id": 89,
          
          },
          {
              "title": "Phoenix Suns",
              url: "phoenix-suns",
              "id": 55,
          
          },
          {
              "title": "Sacramento Kings",
              url: "sacramento-kings",
              "id": 50,
          
          }
      ]
      },
      
      {
        title: 'Southwest',
        id: 13,
        url: 'nba-southwest',
        teams:[
          {
              "title": "Dallas Mavericks",
              url: "dallas-mavericks",
              "id": 113,
          
          },
          {
              "title": "Houston Rockets",
              url: "houston-rockets",
              "id": 100,
          
          },
          {
              "title": "Memphis Grizzlies",
              url: "memphis-grizzlies",
              "id": 87,
          
          },
          {
              "title": "New Orleans Pelicans",
              url: "new-orleans-pelicans",
              "id": 73,
          
          },
          {
              "title": "San Antonio Spurs",
              url: "san-antonio-spurs",
              "id": 49,
          
          }
      ]
      },
    ],
    divsInRow: 3,
    divsInMobileRow: 2
  },
  {
    title: 'MLB',
    id: 43,
    // icon: league.logo,
    conferences: [
      {
          "title": "MLB Home",
          "url": "mlb",
          "id": 43
      },
      {
          "title": "AL",
          "id": 13,
          "url": "mlb-american-league"
      },
      {
          "title": "NL",
          "id": 14,
          "url": "mlb-national-league"
      }
  ],
    divisions: [
      {
        title: 'AL Central',
        id: 29,
        url: 'al-central',
        teams:[
          {
              "title": "Chicago White Sox",
              url: "chicago-white-sox",
              "id": 123,
          
          },
          {
              "title": "Cleveland Guardians",
              url: "cleveland-guardians",
              "id": 118,
          
          },
          {
              "title": "Detroit Tigers",
              url: "detroit-tigers",
              "id": 106,
          
          },
          {
              "title": "Kansas City Royals",
              url: "kansas-city-royals",
              "id": 94,
          
          },
          {
              "title": "Minnesota Twins",
              url: "minnesota-twins",
              "id": 80,
          
          }
      ]
      },
      {
        title: 'AL East',
        id: 30,
        url: 'al-east',
        teams:[
          {
              "title": "Baltimore Orioles",
              url: "baltimore-orioles",
              "id": 139,
          
          },
          {
              "title": "Boston Red Sox",
              url: "boston-red-sox",
              "id": 135,
          
          },
          {
              "title": "New York Yankees",
              url: "new-york-yankees",
              "id": 65,
          
          },
          {
              "title": "Tampa Bay Rays",
              url: "tampa-bay-rays",
              "id": 37,
          
          },
          {
              "title": "Toronto Blue Jays",
              url: "toronto-blue-jays",
              "id": 34,
          
          }
      ]
      },
    
      {
        title: 'Al West',
        id: 31,
        url: 'al-west',
        teams:[
          {
              "title": "Houston Astros",
              url: "houston-astros",
              "id": 101,
          
          },
          {
              "title": "Los Angeles Angels",
              url: "los-angeles-angels",
              "id": 93,
          
          },
          {
              "title": "Oakland Athletics",
              url: "oakland-athletics",
              "id": 64,
          
          },
          {
              "title": "Seattle Mariners",
              url: "seattle-mariners",
              "id": 43,
          
          },
          {
              "title": "Texas Rangers",
              url: "texas-rangers",
              "id": 35,
          
          }
      ]
      },
      {
        title: 'NL Central',
        id: 22,
        url: 'nl-central',
        teams:[
          {
              "title": "Chicago Cubs",
              url: "chicago-cubs",
              "id": 124,
          
          },
          {
              "title": "Cincinnati Reds",
              url: "cincinnati-reds",
              "id": 121,
          
          },
          {
              "title": "Milwaukee Brewers",
              url: "milwaukee-brewers",
              "id": 83,
          
          },
          {
              "title": "Pittsburgh Pirates",
              url: "pittsburgh-pirates",
              "id": 53,
          
          },
          {
              "title": "St. Louis Cardinals",
              url: "st-louis-cardinals",
              "id": 40,
          
          }
      ]
      },
      {
        title: 'NL East',
        id: 23,
        url: 'nl-east',
        teams:[
          {
              "title": "Atlanta Braves",
              url: "atlanta-braves",
              "id": 142,
          
          },
          {
              "title": "Miami Marlins",
              url: "miami-marlins",
              "id": 84,
          
          },
          {
              "title": "New York Mets",
              url: "new-york-mets",
              "id": 67,
          
          },
          {
              "title": "Philadelphia Phillies",
              url: "philadelphia-phillies",
              "id": 56,
          
          },
          {
              "title": "Washington Nationals",
              url: "washington-nationals",
              "id": 28,
          
          }
      ]
      },
      {
        title: 'NL West',
        id: 16,
        url: 'nl-west',
        teams:[
          {
              "title": "Arizona Diamondbacks",
              url: "arizona-diamondbacks",
              "id": 143,
          
          },
          {
              "title": "Colorado Rockies",
              url: "colorado-rockies",
              "id": 116,
          
          },
          {
              "title": "Los Angeles Dodgers",
              url: "los-angeles-dodgers",
              "id": 91,
          
          },
          {
              "title": "San Diego Padres",
              url: "san-diego-padres",
              "id": 47,
          
          },
          {
              "title": "San Francisco Giants",
              url: "san-francisco-giants",
              "id": 45,
          
          }
      ]
      },
    ],
    divsInRow: 3,
    divsInMobileRow: 2
  }
]

const cities = [
  {
    title: "",
    teams: [],

  },
  {
    title: "",
    teams: [],

  },
  {
    title: "",
    teams: [],

  },
  {
    title: "",
    teams: [],

  },
  {
    title: "",
    teams: [],

  },
  {
    title: "",
    teams: [],

  }
];

const stats = [{
  title: "NBA",
  teams: [
    { title: 'overall', id: '-2', url: '/player-statistics', league: 'NBA' },
  ]
},
{
  title: "NHL",
  teams: [
    { title: 'scoring', id: '-2', url: '/player-statistics', league: 'NHL' },
    { title: 'goaltending', id: '-2', url: '/player-statistics', league: 'NHL' }
  ]
},
{
  title: "NFL",
  teams: [
    { title: 'passing', id: '-2', url: '/player-statistics', league: 'NFL' },
    { title: 'rushing', id: '-2', url: '/player-statistics', league: 'NFL' },
    { title: 'receiving', id: '-2', url: '/player-statistics', league: 'NFL' },
    { title: 'scoring', id: '-2', url: '/player-statistics', league: 'NFL' },
    { title: 'defense', id: '-2', url: '/player-statistics', league: 'NFL' },
  ]
},
{
  title: "MLB",
  teams: [
    { title: 'batting', id: '-2', url: '/player-statistics', league: 'MLB' },
    { title: 'pitching', id: '-2', url: '/player-statistics', league: 'MLB' }
  ]
}];


const moreItems = [
  {
    title: "About",
    teams: [
      { title: 'What is SportsWriters?', id: '-3', url: '/what-is-sportswriters', league: '' },
      { title: 'Our Story', id: '-3', url: '/our-story', league: '' },
      { title: 'Coming soon!', id: '-3', url: '/coming-soon', league: '' },
      { title: 'FAQs', id: '-3', url: '/faqs', league: '' },
    ],
    divsInRow: 3,
    divsInMobileRow: 2
  },
  {
    title: "Participate",
    teams: [
      { title: 'Contribute', id: '-3', url: '/contribute', league: '' },
      { title: 'Partner With Us', id: '-3', url: '/partner-with-us', league: '' },
      { title: 'Alerts', id: '-3', url: '/alerts', league: '' }
    ],
    divsInRow: 3,
    divsInMobileRow: 2
  },
  {
    title: "Contact",
    teams: [
      { title: 'Feedback & Ideas', id: '-3', url: '/feedback', league: '' },
      { title: 'Suggest a Writer', id: '-3', url: '/suggest-a-writer', league: '' },
      { title: 'Contact Us', id: '-3', url: '/contact-us', league: '' },

    ],
    divsInRow: 3,
    divsInMobileRow: 2
  }];

@State<HeaderStateModel>({
  name: 'header',
  defaults
})
@Injectable()
export class HeaderState {


  constructor(private headerService: HeaderService) {
  }


  @Action(HeaderAction_GetLeagues)
  getLeagues(
    { patchState, dispatch }: StateContext<HeaderStateModel>,
    { id }: HeaderAction_GetLeagues
  ) {
    return this.headerService.getLeagues(id).pipe(
      tap((response: ILeagues) => {
       
        const _leagues = response.data
        patchState({ leagues: _leagues })

        let menuItems: MenuItem[] = []

        const stat = {
          title: "STATS",
          id: 11,
          conferences: [],
          divisions: stats,
          divsInRow: 0,
          divsInMobileRow: 2,

        }
        const more = {
          title: "MORE",
          id: 12,
          conferences: [],
          divisions: moreItems,
          divsInRow: 0,
          divsInMobileRow: 2,

        }

        const city = {
          title: 'CITIES',
          id: 13,
          conferences: [],
          divisions: cities,
          divsInRow: 0,
          divsInMobileRow: 2,
        }




        leagues.forEach(league => {
          menuItems.push(
            league
          )

        })

        this.headerService.getCities().subscribe((response: ICities) => {
          const _cities = response.data;
          _cities.forEach(City => {
            let firstLetter = City.slug.charAt(0);
            let regex1 = /([A-C]|[a-c])/
            let regex2 = /([D-K]|[d-k])/
            let regex3 = /([L-N]|[l-n])/
            let regex4 = /([O-R]|[o-r])/
            let regex5 = /([S]|[s])/
            let regex6 = /([T-Z]|[t-z])/

            if (regex1.test(firstLetter)) {
              cities[0].title = 'A-C';
              cities[0].teams.push({
                title: City.name, id: City.id, url: `${City.slug}`, league: ''
              }
              )
            }
            if (regex2.test(firstLetter)) {
              cities[1].title = 'D-K';
              cities[1].teams.push({
                title: City.name, id: City.id, url: `${City.slug}`, league: ''
              })
            }
            if (regex3.test(firstLetter)) {
              cities[2].title = 'L-N';
              cities[2].teams.push({
                title: City.name, id: City.id, url: `${City.slug}`, league: ''
              })
            }
            if (regex4.test(firstLetter)) {
              cities[3].title = 'O-R';
              cities[3].teams.push({
                title: City.name, id: City.id, url: `${City.slug}`, league: ''
              })
            }
            if (regex5.test(firstLetter)) {
              cities[4].title = 'S';
              cities[4].teams.push({
                title: City.name, id: City.id, url: `${City.slug}`, league: ''
              })
            }
            if (regex6.test(firstLetter)) {
              cities[5].title = 'T-Z';
              cities[5].teams.push({
                title: City.name, id: City.id, url: `${City.slug}`, league: ''
              })
            }
          })

          for (let i = 0; i < cities.length; i++) {
            if (cities[i].teams.length === 0) {
              cities.splice(i, 1);
              i--;
            }
          }

          menuItems.push(city);
          menuItems.push(stat)
          menuItems.push(more)

          patchState({ menuItems })
         // dispatch(new HeaderAction_AdjustConferences())
        })
      })
    )
  }

  @Action(HeaderAction_GetLeagueConferences)
  getLeagueConferences(
    { patchState, getState, dispatch }: StateContext<HeaderStateModel>,
    { league_id }: HeaderAction_GetLeagueConferences
  ) {
    return this.headerService.getLeagueConferences(league_id).pipe(
      tap((response: ILeagueConferences) => {
       
        let _menuItems: MenuItem[] = getState()?.menuItems
        const _leagueConferences = response.data
        let deepCopiedMenuItems: MenuItem[] = []

        _menuItems.map(item => {
          deepCopiedMenuItems.push({ ...item })
        })
        // deepCopiedMenuItems.map((item: any, index) => {
        //   item.conferences = [{ title: `${item.title} Home`, url: item.title.toLowerCase(), id:item.id }];
        //   _leagueConferences.map((conference) => {
        //     if (item.id === conference.league_id) {
        //       item.conferences.push({ title: conference.nick_name, id: conference.id, url: conference.name.toLowerCase().split(' ').join('-') })

        //     }
        //   })
        deepCopiedMenuItems.map((item, index) => {
          _leagueConferences.map(conference => {
            if (item.id === conference.league_id) {
              item.conferences = [...new Set(item.conferences), { title: conference.nick_name, id: conference.id, url: `${conference.league_name.toLocaleLowerCase()}-${conference.name.toLowerCase().split(' ').join('-')}` }]
            }
          })
          patchState({ menuItems: cloneDeep(deepCopiedMenuItems) })
        })
       dispatch(new HeaderAction_GetLeagueDivisions(league_id))
        patchState({ leagueConferences: _leagueConferences })
      })
    )
  }

  @Action(HeaderAction_GetLeagueDivisions)
  getLeagueDivisions(
    { patchState, getState, dispatch }: StateContext<HeaderStateModel>,
    { league_id }: HeaderAction_GetLeagueDivisions
  ) {

    

        // let data = null;
        // if (league_id === 55) {
        //   data = divisions1
        // }
        // else if (league_id === 40) {
        //   data = divisions2
        // }

        // else if (league_id === 42) {
        //   data = divisions3
        // }

        // else if (league_id === 43) {
        //   data = divisions4
        // }
       
        let _menuItems: any = []
        _menuItems = cloneDeep(getState()?.menuItems)
        //let _menuItems: MenuItem[] = cloneDeep(getState()?.menuItems)
        // let _teamsFetched: number[] = cloneDeep(getState()?.teamsFetched)
        // let _leagueDivisionsFetched: number[] = cloneDeep(getState()?.leagueDivisionsFetched)

        // if (_leagueDivisionsFetched.indexOf(league_id) < 0) {
        //   _leagueDivisionsFetched = [..._leagueDivisionsFetched, league_id]
        //   patchState({ leagueDivisionsFetched: _leagueDivisionsFetched })
        // }

        //   const _leagueDivisions = response.data

        let _leagueDivisions = []

        let deepCopiedMenuItems: MenuItem[] = []

        _menuItems.map(item => {
          deepCopiedMenuItems.push({ ...item })
        })


        deepCopiedMenuItems.forEach(item => {
          _leagueDivisions.forEach((division, index) => {
            if (item.id === league_id) {

              if (!item.divisions.includes(item.divisions[index])) {
                item.divisions = [...item.divisions, { title: division.name, id: division.id, url: division.slug, teams: [] }]
                item.divsInRow = _leagueDivisions.length > 4 ? Math.ceil(_leagueDivisions.length / 2) : _leagueDivisions.length
                if (item.divisions[index].id === 36) {
                 // item.divisions[index].teams = [...item.divisions[index].teams, { title: division.name, id: division.id, url: division.slug, teams: [] }]
                }
                if (item.divisions[index].id === 26) {

                }
                if (item.divisions[index].id === 27) {

                }
                if (item.divisions[index].id === 28) {

                }
                if (item.divisions[index].id === 25) {

                }

                if (item.divisions[index].id === 24) {

                }
                if (item.divisions[index].id === 17) {

                }
                if (item.divisions[index].id === 18) {

                }
                if (item.divisions[index].id === 19) {

                }
                if (item.divisions[index].id === 20) {

                }

                if (item.divisions[index].id === 32) {

                }
                if (item.divisions[index].id === 21) {

                }
                if (item.divisions[index].id === 33) {

                }
                if (item.divisions[index].id === 34) {

                }
                if (item.divisions[index].id === 15) {

                }

                if (item.divisions[index].id === 35) {

                }
                if (item.divisions[index].id === 14) {

                }
                if (item.divisions[index].id === 13) {

                }
                if (item.divisions[index].id === 29) {

                }
                if (item.divisions[index].id === 30) {

                }

                if (item.divisions[index].id === 31) {

                }
                if (item.divisions[index].id === 22) {

                }
                if (item.divisions[index].id === 23) {

                }
                if (item.divisions[index].id === 16) {

                }
              }

            }

          })


        })

       
        patchState({ menuItems: deepCopiedMenuItems })
        patchState({ leagueDivisions: _leagueDivisions })
     
    
  }

  @Action(HeaderAction_GetLeagueTeams)
  getLeagueTeams(
    { patchState, getState }: StateContext<HeaderStateModel>,
    { division_id, page, size }: HeaderAction_GetLeagueTeams
  ) {
    return this.headerService.getLeagueTeams(division_id, page, size).pipe(
      tap((response: ILeagueTeams) => {

        patchState({ leagueTeams: response.data })
      })
    )
  }

  @Action(HeaderAction_AdjustConferences)
  adjustConferences(
    { dispatch, getState }: StateContext<HeaderStateModel>
  ) {
    const menuItems = getState()?.menuItems

    menuItems.forEach(item => {
      dispatch(new HeaderAction_GetLeagueConferences(item.id))
    })

  }
}
