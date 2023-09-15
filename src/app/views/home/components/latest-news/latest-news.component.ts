import { Article } from './../../../../../shared/store/home/home.models';
import { Component, Input, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { HomeSelectors } from 'src/shared/store/home/home.selectors';
import { skipWhile, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-latest-news',
  templateUrl: './latest-news.component.html',
  styleUrls: ['./latest-news.component.scss'],
})
export class LatestNewsComponent implements OnInit {
  @Select(HomeSelectors.leagueArticles) leagueArticles$: Observable<{ NFL: Article[], NHL: Article[], NBA: Article[], MLB: Article[] }>;
  @Select(HomeSelectors.NFL_Articles) NFL_Articles$: Observable<Article[]>;
  @Select(HomeSelectors.NBA_Articles) NBA_Articles$: Observable<Article[]>;
  @Select(HomeSelectors.NHL_Articles) NHL_Articles$: Observable<Article[]>;
  @Select(HomeSelectors.MLB_Articles) MLB_Articles$: Observable<Article[]>;

  // loaders
  @Select(HomeSelectors.NFL_ArticlesLoading) NFL_ArticlesLoading$: Observable<boolean>;
  @Select(HomeSelectors.NBA_ArticlesLoading) NBA_ArticlesLoading$: Observable<boolean>;
  @Select(HomeSelectors.NHL_ArticlesLoading) NHL_ArticlesLoading$: Observable<boolean>;
  @Select(HomeSelectors.MLB_ArticlesLoading) MLB_ArticlesLoading$: Observable<boolean>;

  @Input() league: string = "NFL"
  @Input() leagueColor: string;

  hoveredOn: string | number = null
  hoveredColor: string = "#888";
  hovered: boolean = false;

  defaultTeamColor: string = "#077a3f";
  currentLeagueNews: Article[] = [];
  currentLeagueNewsLoader$: Observable<boolean>;
   isDesktop:boolean=false;
  constructor(private router:Router,public platform:Platform) {
    if( this.platform.is('desktop')){
      this.isDesktop=true;
     }
   }

  ngOnInit() {
    if (this.league === 'NFL') {
      this.currentLeagueNewsLoader$ = this.NFL_ArticlesLoading$
      this.NFL_Articles$.pipe(skipWhile(NFL_Articles => NFL_Articles.length === 0), take(1)).subscribe((leagueArticle) => {
        this.currentLeagueNews = leagueArticle
      })
    } else if (this.league === 'NHL') {
      this.currentLeagueNewsLoader$ = this.NHL_ArticlesLoading$
      this.NHL_Articles$.pipe(skipWhile(NHL_Articles => NHL_Articles.length === 0), take(1)).subscribe((leagueArticle) => {
        this.currentLeagueNews = leagueArticle
      })
    } else if (this.league === 'NBA') {
      this.currentLeagueNewsLoader$ = this.NBA_ArticlesLoading$
      this.NBA_Articles$.pipe(skipWhile(NBA_Articles => NBA_Articles.length === 0), take(1)).subscribe((leagueArticle) => {
        this.currentLeagueNews = leagueArticle
      })
    } else if (this.league === 'MLB') {
      this.currentLeagueNewsLoader$ = this.MLB_ArticlesLoading$
      this.MLB_Articles$.pipe(skipWhile(MLB_Articles => MLB_Articles.length === 0), take(1)).subscribe((leagueArticle) => {
        this.currentLeagueNews = leagueArticle
      })
    }
  }

  setHoveredOn(index) {
    this.hoveredOn = index
  }

  getArticleWriter(authors: string) {
    let author;
    if (authors) {
      author = authors.split(',')
    let a = author[0]
    let b = a.split(' ').slice(0, 2).join(' ');
    return author ? b : ""
  }
}

  getTeamInitials(article) {
    let team: string[];
    let slug: string[];
    let colors: string[];
    if(article.teams!==null && article.teams!==undefined){
      let teamArr:any=[]
      team = article.teams.split(',',4)
       slug=article.team_slugs.split(',',4)
       colors=article.team_colors.split(',',4)
      team.map((i,index)=>{
        teamArr.push({
          slug:slug[index],
          color:colors[index],
          team:team[index]
        })
      })
      return teamArr;
    }
   
  }

  replaceRegex(str){
    if(str.includes("&apos;")){
      let regex =/(&apos;)/g;
      let tt= str.replace(regex,"'");
      return tt
    }
    else{
      return str
    }
    
  }
  openTeam(slug){
    let urlParams='team/'+slug
    this.router.navigate([urlParams])
  }

  openArticle(url){
    this.router.navigate([url]);
  }

}
