import { HeaderAction_GetLeagueDivisions } from './../../../shared/store/header/header.actions';
import { Observable } from 'rxjs';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { HeaderSelectors } from 'src/shared/store/header/header.selectors';
import { MenuItem } from 'src/shared/store/header/header.models';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/shared/store/auth/auth.service';
import { AuthState } from 'src/shared/store/auth/auth.model';
import { UserSelectors } from 'src/shared/store/user/user.selectors';
import { User } from '@angular/fire/auth';
import { FeedbackPage } from '../../modals/feedback/feedback.page';
import { ModalController } from '@ionic/angular';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/shared/store/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Select(HeaderSelectors.menuItems) menuItems$: Observable<MenuItem[]>;
  @Select(HeaderSelectors.leagueDivisionsFetched)
  leagueDivisionsFetched$: Observable<number[]>;
  @Select(UserSelectors.user) user$: Observable<User>;

  activeMenuIndex: number = -1;
  mobileActiveMenuIndex: number = 6;
  isSearchFieldOpen: boolean = false;
  isSmallMenuOpen: boolean = false;
  isModalOpen = false;
  showDropdown = false;

  temp: string[] = ['', '', '', ''];

  auth$: Observable<AuthState>;
  isSignInLoading$: Observable<boolean>;

  data: any = [];
  searchForm = new FormGroup({
    searchData: new FormControl(''),
  });

  token = '';
  userObject: any;
  constructor(
    private store: Store,
    public router: Router,
    public userService: UserService,
    private modalCtrl: ModalController,
    private authService: AuthService
  ) {
    this.authService.auth$.subscribe((auth) => {
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
    window.addEventListener('click', (e: any) => {
      if (document.getElementById('clickbox').contains(e.target)) {
      } else {
        // this.activeMenuIndex = -1
      }
    });
    this.isSignInLoading$ = this.authService.isLoading$;
    this.auth$ = this.authService.auth$;

    if (window.location.href.includes('home')) {
      this.authService.displaySignInModal$.subscribe((val) => {
        if (val == 'signIn') {
          this.isModalOpen = true;
        }
      });
    }
  }

  drop() {
    this.showDropdown = !this.showDropdown;
  }

  show(index: number) {
    if (index === this.activeMenuIndex) {
      this.activeMenuIndex = -1;
    } else {
      this.activeMenuIndex = index;
      this.leagueDivisionsFetched$.pipe(take(1)).subscribe((val) => {
        if (val.indexOf(index) < 0) {
          this.store.dispatch(new HeaderAction_GetLeagueDivisions(index));
        }
      });
    }
  }

  hide() {
    this.activeMenuIndex = -1;
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
    this.authService.logout();
  }

  getEmailChars(emailAddress): string {
    let str = emailAddress.toUpperCase().substr(0, 6) + '...';
    return str;
  }

  openModal() {
    this.isModalOpen = true;
  }

  signInModal(bool) {
    this.isModalOpen = bool;
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

  openProfile() {
    this.router.navigate(['account']);
  }
}
