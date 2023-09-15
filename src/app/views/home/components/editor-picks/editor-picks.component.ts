import { HomeAction_GetEditorPicksArticles } from 'src/shared/store/home/home.actions';
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Article } from 'src/shared/store/home/home.models';
import { HomeSelectors } from 'src/shared/store/home/home.selectors';
import { VerifyImage } from 'src/shared/utilities/verifyImage';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-editor-picks',
  templateUrl: './editor-picks.component.html',
  styleUrls: ['./editor-picks.component.scss'],
})
export class EditorPicksComponent implements OnInit {
  @Select(HomeSelectors.editorPicksArticles) editorPicksArticles$: Observable<
    Article[]
  >;
  @Select(HomeSelectors.editorPicksLoading)
  editorPicksLoading$: Observable<boolean>;

  teamDefaultColor: string = '#077a3f';
  hoveredOn: string | number = null;
  temp: string[] = ['', '', '', '', '', '', ''];
  isDesktop: boolean = false;
  constructor(private store: Store, public platform: Platform) {
    if (this.platform.is('desktop')) {
      this.isDesktop = true;
    }
  }

  ngOnInit() {
    // this.store.dispatch(new HomeAction_GetEditorPicksArticles(true, 1, 7));
  }

  getTeamInitials(article) {
    let team: string[];
    let slug: string[];
    let colors: string[];
    if (article.teams !== null && article.teams !== undefined) {
      let teamArr: any = [];
      team = article.teams.split(',', 4);
      slug = article.team_slugs.split(',', 4);
      colors = article.team_colors.split(',', 4);
      team.map((i, index) => {
        teamArr.push({
          slug: slug[index],
          color: colors[index],
          team: team[index],
        });
      });
      return teamArr;
    }
  }

  getArticleWriter(authors: string) {
    return authors ? authors.split(',')[0] : '';
  }

  // ImageExist(url: string) {
  //   var img = new Image();
  //   img.src = url;
  //   return img.height != 0;
  // }
}
