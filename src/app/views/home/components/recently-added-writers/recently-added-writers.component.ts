import {
  HomeAction_GetEditorPicksArticles,
  HomeAction_GetRecentlyAddedWriters,
} from 'src/shared/store/home/home.actions';
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Article } from 'src/shared/store/home/home.models';
import { HomeSelectors } from 'src/shared/store/home/home.selectors';
import { VerifyImage } from 'src/shared/utilities/verifyImage';
import { Writer } from 'src/shared/store/writer/writer.models';

@Component({
  selector: 'app-recently-added-writers',
  templateUrl: './recently-added-writers.component.html',
  styleUrls: ['./recently-added-writers.component.scss'],
})
export class RecentlyAddedWritersComponent implements OnInit {
  @Select(HomeSelectors.recentlyAddedWriters) writers$: Observable<Writer[]>;
  @Select(HomeSelectors.recentlyAddedWritersLoading)
  writersLoading$: Observable<boolean>;

  teamDefaultColor: string = '#077a3f';
  hoveredOn: string | number = null;
  temp: string[] = ['', '', '', '', '', '', ''];

  constructor(private store: Store) {}

  ngOnInit() {
    //  this.store.dispatch(new HomeAction_GetRecentlyAddedWriters(true, 1, 7))
  }

  getTeamInitials(name: string) {
    if (name.includes(',')) {
      let arr = name.split(',');
      return arr[0];
    } else {
      return name;
    }
  }

  getArticleWriter(authors: string) {
    return authors ? authors.split(',')[0] : '';
  }
}
