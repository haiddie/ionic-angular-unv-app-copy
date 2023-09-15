import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AlertController,
  ModalController,
  Platform,
  ToastController,
} from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { SignInComponent } from 'src/app/components/header/sign-in/sign-in.component';
import { FeedbackPage } from 'src/app/modals/feedback/feedback.page';
import { SportsfeedApiService } from 'src/shared/store/api-controller/sportsfeed_api.service';
import { AuthState } from 'src/shared/store/auth/auth.model';
import { AuthService } from 'src/shared/store/auth/auth.service';
import { HeaderAction_GetLeagueDivisions } from 'src/shared/store/header/header.actions';
import { MenuItem } from 'src/shared/store/header/header.models';
import { HeaderSelectors } from 'src/shared/store/header/header.selectors';
import { HomeAction_GetCities } from 'src/shared/store/home/home.actions';
import { City } from 'src/shared/store/home/home.models';
import { HomeSelectors } from 'src/shared/store/home/home.selectors';
import { UserSelectors } from 'src/shared/store/user/user.selectors';
import { UserService } from 'src/shared/store/user/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  @Select(HomeSelectors.cities) cities$: Observable<City[]>;
  updateAccountForm = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    display_name: new FormControl('', [Validators.required]),
    city_id: new FormControl('', [Validators.required]),
  });

  updatePasswordForm = new FormGroup({
    new_password: new FormControl('', [Validators.required]),
    confirm_password: new FormControl('', [Validators.required]),
  });

  editUserForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    display_picture: new FormControl(''),
    email: new FormControl('', [Validators.required]),
    phone_number: new FormControl(''),
    city_id: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    profile: new FormControl(true),
  });

  incorrectEmail: boolean = false;

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
  userObject: any;

  isModalOpen: boolean;

  @Select(HeaderSelectors.menuItems) menuItems$: Observable<MenuItem[]>;
  @Select(HeaderSelectors.leagueDivisionsFetched)
  leagueDivisionsFetched$: Observable<number[]>;
  @Select(UserSelectors.user) user$: Observable<User>;

  Plt: any;

  constructor(
    public api: SportsfeedApiService,
    public userService: UserService,
    private store: Store,
    private auth: AuthService,
    private alertCtrl: AlertController,
    private route: ActivatedRoute,
    private toast: ToastController,
    public router: Router,
    private platform: Platform,
    private titleService: Title,
    private modalCtrl: ModalController
  ) {
    this.token = '';
    if (this.platform.is('ios')) {
      this.Plt = 'ios';
    }
    this.auth.auth$.subscribe((auth) => {
      this.token = auth.token;
      if (this.token !== null) {
        this.userService.getUserData(this.token).subscribe((data) => {
          this.userObject = data.data[0];
          if (this.userObject !== null && this.userObject !== undefined) {
            let first_name = '';
            let last_name = '';
            let email = '';
            let display_name = '';
            let city_id = '';

            if (
              this.userObject.name !== null &&
              this.userObject.name !== undefined
            ) {
              first_name = this.userObject.name.substring(
                0,
                this.userObject.name.indexOf(' ')
              );
              last_name = this.userObject.name.substring(
                this.userObject.name.indexOf(' ') + 1
              );
            }
            if (
              this.userObject.email !== null &&
              this.userObject.email !== undefined
            ) {
              email = this.userObject.email;
            }
            if (
              this.userObject.username !== null &&
              this.userObject.username !== undefined
            ) {
              display_name = this.userObject.username;
            }
            if (
              this.userObject.city_id !== null &&
              this.userObject.city_id !== undefined
            ) {
              city_id = this.userObject.city_id.toString();
            }

            this.updateAccountForm.patchValue({
              first_name: first_name,
              last_name: last_name,
              email: email,
              display_name: display_name,
              city_id: city_id,
            });
          }
        });
      }
    });
  }

  ngOnInit() {
    this.isSignInLoading$ = this.auth.isLoading$;
    this.auth$ = this.auth.auth$;

    if (window.location.href.includes('home')) {
      this.auth.displaySignInModal$.subscribe((val) => {
        if (val == 'signIn') {
          this.isModalOpen = true;
        }
      });
    }
    this.store.dispatch([new HomeAction_GetCities()]);
  }

  submit() {
    let first_name = this.updateAccountForm.get('first_name').value;
    let last_name = this.updateAccountForm.get('last_name').value;

    let name = first_name + ' ' + last_name;
    let email = this.updateAccountForm.get('email').value;
    let city_id = this.updateAccountForm.get('city_id').value;
    let username = this.updateAccountForm.get('display_name').value;

    this.editUserForm.patchValue({
      name: name,
      email: email,
      city_id: city_id,
      username: username,
    });
    this.userService.editProfile(this.editUserForm.value, this.token).subscribe(
      async (data: any) => {
        this.successAlert();
      },
      (err) => {
        this.errorAlert();
      }
    );
  }

  async successAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Account Updated !',
      message: 'You have successfully updated your account!',
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            window.location.reload();
          },
        },
      ],
    });

    await alert.present();
  }
  async errorAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: 'Sorry an error occured.Please Try Again!',
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {},
        },
      ],
    });

    await alert.present();
  }

  CheckEmail(event) {
    this.userService
      .checkEmail(event.target.value, this.token)
      .subscribe(async (data: any) => {
        if (data.success === false) {
          this.incorrectEmail = true;
        } else {
          this.incorrectEmail = false;
        }
      });
  }

  logout() {
    this.router.navigate(['home']);
    this.auth.logout();
  }
  goHome() {
    this.router.navigate(['home']);
  }

  //HEADER FUNCTIONS//

  ionViewWillEnter() {
    this.showDropdown = false;
  }

  drop() {
    this.showDropdown = !this.showDropdown;
  }

  show(index: number) {
    if (index === this.activeMenuIndex) {
      this.activeMenuIndex = -1;
    } else {
      this.activeMenuIndex = index;
      // this.leagueDivisionsFetched$.pipe(take(1)).subscribe(val => {
      //   if (val.indexOf(index) < 0) {
      //     this.store.dispatch(new HeaderAction_GetLeagueDivisions(index))
      //   }
      // })
    }
  }

  hide() {
    this.activeMenuIndex = -1;
    this.isSmallMenuOpen = false;
  }

  openSearchField() {
    this.isSearchFieldOpen = !this.isSearchFieldOpen;
    console.log('search field open', this.isSearchFieldOpen);
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
    this.leagueDivisionsFetched$.pipe(take(1)).subscribe((val) => {
      if (val.indexOf(index) < 0) {
        this.store.dispatch(new HeaderAction_GetLeagueDivisions(index));
      }
    });
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
    console.log('val', this.searchForm.get('searchData').value);
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
    this.router.navigate([url]).then(() => {
      window.location.reload();
    });
  }
  navToConference(urlParams) {
    let url = '/conference/' + urlParams;
    this.router.navigate([url]).then(() => {
      window.location.reload();
    });
  }

  navToDivision(urlParams) {
    let url = '/division/' + urlParams;
    this.router.navigate([url]).then(() => {
      window.location.reload();
    });
  }
  navToCity(urlParams) {
    let url = '/city/' + urlParams;
    this.router.navigate([url]).then(() => {
      window.location.reload();
    });
  }
  navToTeam(urlParams) {
    let url = '/team/' + urlParams;
    this.router.navigate([url]).then(() => {
      window.location.reload();
    });
  }

  openProfile() {
    this.router.navigate(['account']);
  }

  async delAcc() {
    const alert = await this.alertCtrl.create({
      header: 'Are you sure you want to delete this account!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.alertCtrl.dismiss();
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.del_per_acc();
          },
        },
      ],
    });

    await alert.present();
  }

  del_per_acc() {
    this.userService.delete_account_per(this.token).subscribe(
      (data) => {
        console.log(data);

        this.auth.logout();
        this.successToast();
        this.router.navigate(['home']);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  async successToast() {
    const t = await this.toast.create({
      // header:`Sign in Successful!`,
      message: `Account Deleted Successfully!`,
      position: 'middle',
      duration: 2500,
      cssClass: 'toast',
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
