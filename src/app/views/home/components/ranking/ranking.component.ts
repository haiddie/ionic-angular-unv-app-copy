import { HomeAction_GetEditorPicksArticles, HomeAction_GetRecentlyAddedWriters, HomeAction_GetWritersByRanking } from 'src/shared/store/home/home.actions';
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Article } from 'src/shared/store/home/home.models';
import { HomeSelectors } from 'src/shared/store/home/home.selectors';
import { VerifyImage } from 'src/shared/utilities/verifyImage';
import { Writer } from 'src/shared/store/writer/writer.models';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'],
})
export class RankingComponent implements OnInit {
  @Select(HomeSelectors.writersByRanking) writers$: Observable<Writer[]>;
  @Select(HomeSelectors.writersByRankingLoading) writersLoading$: Observable<boolean>;

 
  temp: string[] = ['', '', '', '', '', '']
  activeTab: string = 'tab1' ;
  activeProp: string = 'ratings';  


  constructor(private store: Store) { }

  ngOnInit() {

    this.onClickEvent(this.activeTab)
  }

  onClickEvent(tab){
    this.activeTab = tab;

    if (
      this.activeTab === 'tab1'
    ){
      this.activeProp = 'ratings';
      
    }
    if (this.activeTab === 'tab2'){
      this.activeProp = 'clicks';
    
    }
    if (this.activeTab === 'tab3'){
      this.activeProp = 'totalarticles';
      
    }
    this.getWritersByRanking();
  }

  getWritersByRanking(){ 
    this.store.dispatch(new HomeAction_GetWritersByRanking(true, 1, 7, 'DESC', this.activeProp))
  }

  openPeachBasket(){
    window.open('https://thepeachbasket.net/');
  }

}
