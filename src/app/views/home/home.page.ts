import {
  HomeAction_GetNFLArticles,
  HomeAction_GetNHLArticles,
  HomeAction_GetNBAArticles,
  HomeAction_GetMLBArticles,
  HomeAction_GetCities,
  HomeAction_GetRecentlyAddedWriters,
} from 'src/shared/store/home/home.actions';
import { Observable } from 'rxjs';
import { HomeSelectors } from 'src/shared/store/home/home.selectors';
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import {
  City,
  League,
  LeagueConference,
  LeagueDivision,
} from 'src/shared/store/home/home.models';
import { ContentAction_GetContents } from 'src/shared/store/content/content.actions';
import { AuthService } from 'src/shared/store/auth/auth.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HeaderSelectors } from 'src/shared/store/header/header.selectors';
import { UserSelectors } from 'src/shared/store/user/user.selectors';
import { User } from '@angular/fire/auth';
import { UserService } from 'src/shared/store/user/user.service';
import { ModalController, Platform } from '@ionic/angular';
import { AuthState } from 'src/shared/store/auth/auth.model';
import { FormControl, FormGroup } from '@angular/forms';
import { take } from 'rxjs/operators';
import { HeaderAction_GetLeagueDivisions } from 'src/shared/store/header/header.actions';
import { FeedbackPage } from 'src/app/modals/feedback/feedback.page';
import { MenuItem } from 'src/shared/store/header/header.models';
import { SignInComponent } from 'src/app/components/header/sign-in/sign-in.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @Select(HomeSelectors.cities) cities$: Observable<City[]>;
  @Select(HomeSelectors.leagues) leagues$: Observable<League[]>;
  @Select(HomeSelectors.leagueConferences) leagueConferences$: Observable<
    LeagueConference[]
  >;
  @Select(HomeSelectors.leagueArticles) leagueArticles$: Observable<
    LeagueDivision[]
  >;

  @Select(HeaderSelectors.menuItems) menuItems$: Observable<any[]>;
  @Select(HeaderSelectors.leagueDivisionsFetched)
  leagueDivisionsFetched$: Observable<number[]>;
  @Select(UserSelectors.user) user$: Observable<User>;
  isModalOpen: boolean;

  //HEADER VARIABLES//
  activeMenuIndex: number = -1;
  mobileActiveMenuIndex: number = 6;
  isSearchFieldOpen: boolean = false;
  isSmallMenuOpen: boolean = false;

  showDropdown = false;

  temp: string[] = ['', '', '', ''];

  auth$: Observable<AuthState>;
  isSignInLoading$: Observable<boolean>;

  data: any = [];
  searchForm = new FormGroup({
    searchData: new FormControl(''),
  });

  token = '';
  userObject: any = null;
  Plt: any;
  constructor(
    private store: Store,
    private auth: AuthService,
    public router: Router,
    private titleService: Title,
    public userService: UserService,
    private modalCtrl: ModalController,
    private platform: Platform
  ) {
    if (this.platform.is('ios')) {
      this.Plt = 'ios';
    }
    this.auth.auth$.subscribe((auth) => {
      this.token = auth.token;
      if (this.token !== null) {
        if (this.userService.userObject !== null) {
        } else {
          this.userService.getUserData(this.token).subscribe((data) => {
            this.userService.userObject = data.data[0];
            if (data !== null) {
            }
          });
        }
      }
    });
  }

  ngOnInit() {
    this.titleService.setTitle(`Home - SportsWriters`);

    this.store.dispatch([
      new ContentAction_GetContents(1, 6),
      new HomeAction_GetCities(),
      // new HomeAction_GetNFLArticles(1, 11),
      //new HomeAction_GetNHLArticles(1, 11),
      //new HomeAction_GetNBAArticles(1, 11),
      //new HomeAction_GetMLBArticles(1, 11),
    ]);

    this.isSignInLoading$ = this.auth.isLoading$;
    this.auth$ = this.auth.auth$;

    if (window.location.href.includes('home')) {
      this.auth.displaySignInModal$.subscribe((val) => {
        if (val == 'signIn') {
          this.isModalOpen = true;
        }
      });
    }
  }

  openSignInModal(event) {
    this.isModalOpen = event;
  }

  //HEADER FUNCTIONS//

  ionViewDidEnter() {
    this.showDropdown = false;
    this.auth.signInFromLink();
    this.store.dispatch([new ContentAction_GetContents(1, 6)]);
  }

  drop() {
    this.showDropdown = !this.showDropdown;
  }

  show(index: number) {
    if (index === this.activeMenuIndex) {
      this.activeMenuIndex = -1;
    } else {
      this.activeMenuIndex = index;
    }
  }

  hide() {
    this.activeMenuIndex = -1;
    this.isSmallMenuOpen = false;
  }

  openSearchField() {
    this.isSearchFieldOpen = !this.isSearchFieldOpen;
  }

  openSmallMenu(inx) {
    this.isSmallMenuOpen = !this.isSmallMenuOpen;
    let index = inx;
    this.mobileActiveMenuIndex = index;
    // this.leagueDivisionsFetched$.pipe(take(1)).subscribe(val => {
    //   if (val.indexOf(index) < 0) {
    //     this.store.dispatch(new HeaderAction_GetLeagueDivisions(index))
    //   }
    // })
  }

  setActiveMobileMenuItem(index: number) {
    this.mobileActiveMenuIndex = index;
    // this.leagueDivisionsFetched$.pipe(take(1)).subscribe(val => {
    //   if (val.indexOf(index) < 0) {
    //     this.store.dispatch(new HeaderAction_GetLeagueDivisions(index))
    //   }
    // })
  }

  logout() {
    this.showDropdown = false;
    this.auth.logout();
  }

  getEmailChars(emailAddress): string {
    let str = emailAddress.toUpperCase().substr(0, 6) + '...';
    return str;
  }

  dropdownClose() {
    this.activeMenuIndex = -1;
    this.mobileActiveMenuIndex = -1;
    this.isSmallMenuOpen = false;
  }

  openModal() {
    this.isModalOpen = true;
  }

  async signInModal() {
    const modal = await this.modalCtrl.create({
      component: SignInComponent,
      backdropDismiss: false,
    });
    modal.present();
  }

  async openFeedbackModal() {
    const modal = await this.modalCtrl.create({
      component: FeedbackPage,
      backdropDismiss: false,
      cssClass: 'my-custom-class',
    });
    modal.present();
  }

  openSearch() {
    if (this.searchForm.get('searchData').value !== '') {
      this.router.navigate(['search'], {
        queryParams: {
          s: this.searchForm.value.searchData,
        },
      });
    } else {
      this.isSearchFieldOpen = false;
      return;
    }
  }

  navToLeague(urlParams) {
    let url = '/league/' + urlParams;
    this.router.navigate([url]).then(() => {});
  }
  navToConference(urlParams) {
    let url = '/conference/' + urlParams;
    this.router.navigate([url]).then(() => {});
  }

  navToDivision(urlParams) {
    let url = '/division/' + urlParams;
    this.router.navigate([url]).then(() => {});
  }
  navToCity(urlParams) {
    let url = '/city/' + urlParams;
    this.router.navigate([url]).then(() => {});
  }
  navToTeam(urlParams) {
    let url = '/team/' + urlParams;
    this.router.navigate([url]).then(() => {});
  }

  openProfile() {
    this.router.navigate(['account']);
  }
}
