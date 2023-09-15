import { CityAction_GetActiveCity } from 'src/shared/store/city/city.actions';
import { HomeAction_GetSingleArticle } from 'src/shared/store/home/home.actions';
import { Article } from 'src/shared/store/home/home.models';
import { Observable } from 'rxjs';
import { HomeSelectors } from 'src/shared/store/home/home.selectors';
import { Component, Input, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { City } from 'src/shared/store/home/home.models';
import { skipWhile, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Platform, PopoverController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/shared/store/auth/auth.service';

@Component({
  selector: 'app-city-hubs',
  templateUrl: './city-hubs.component.html',
  styleUrls: ['./city-hubs.component.scss'],
})
export class CityHubsComponent implements OnInit {
  @Select(HomeSelectors.homeCityArticles) cityArticles$: Observable<Article[]>;
  @Select(HomeSelectors.selectedArticle) selectedArticle$: Observable<Article>;
  @Select(HomeSelectors.cityArticlesLoading)
  cityArticlesLoading$: Observable<boolean>;

  @Input() i: string;
  @Input() showCities: boolean;
  @Input() user: any;
  hoveredOn: number | string;
  selectedCity: City = null;
  temp: string[] = ['', '', '', '', '', '', ''];
  isDesktop: boolean = false;

  constructor(
    private store: Store,
    private router: Router,
    public platform: Platform,
    private popoverCtrl: PopoverController,
    private toast: ToastController
  ) {
    if (this.platform.is('desktop')) {
      this.isDesktop = true;
    }
  }

  ngOnInit() {}

  showCityInBanner(city: City) {
    this.selectedCity = city;
  }

  getArticleWriter(authors: string) {
    return authors ? authors.split(',')[0] : '';
  }

  goToArticlePage(article: Article) {
    // this.store.dispatch(new HomeAction_GetSingleArticle(article.id))
    // this.selectedArticle$.pipe(skipWhile(selectedArticle => Object.keys(selectedArticle).length === 0), take(1)).subscribe((selectedArticle) => {
    // })
  }

  goToCityPage() {
    this.store.dispatch(new CityAction_GetActiveCity(this.selectedCity.id));
  }

  navToCity(city) {
    let url = '/city/' + city.slug;
    this.router.navigate([url]).then(() => {});
  }
  openAccountSettings() {
    if (this.user && this.user !== null) {
      this.popoverCtrl.dismiss();
      this.router.navigate(['account']);
    } else {
      this.errToast();
    }
  }

  async errToast() {
    const t = await this.toast.create({
      // header:`Sign in Successful!`,
      message: `Please SignIn first to access this page!`,
      color: 'danger',
      position: 'middle',
      duration: 2500,
      buttons: [
        {
          icon: 'close',
          role: 'cancel',
        },
      ],
    });
    await t.present();
  }
}
