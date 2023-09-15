import { HomeAction_GetCities } from 'src/shared/store/home/home.actions';
import { HomeAction_GetCityArticles } from './../../../../../../../shared/store/home/home.actions';
import { skipWhile, take } from 'rxjs/operators';

import { Observable } from 'rxjs';
import { HomeSelectors } from './../../../../../../../shared/store/home/home.selectors';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { City } from 'src/shared/store/home/home.models';
import { AuthService } from 'src/shared/store/auth/auth.service';
import { UserService } from 'src/shared/store/user/user.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-city-select',
  templateUrl: './city-select.component.html',
  styleUrls: ['./city-select.component.scss'],
})
export class CitySelectComponent implements OnInit {
  @Output() cityChanged = new EventEmitter<City>();

  @Select(HomeSelectors.cities) cities$: Observable<City[]>;

  cities: string[] = [
    'Atlanta',
    'Baltimore',
    'Boston',
    'Chicago',
    'Cincinnati',
    'Dallas',
    'Denver',
    'Houston',
    'Las Vegas',
  ];
  selectedCity: City;
  isSelectOpen: boolean = false;

  token = '';
  userObject: any;
  constructor(
    private store: Store,
    public userService: UserService,
    private platform: Platform,
    private auth: AuthService
  ) {
    this.auth.auth$.subscribe((auth) => {
      this.token = auth.token;

      if (this.token !== null && this.token !== undefined) {
        if (
          this.userService.userObject !== null &&
          this.userService.userObject !== undefined
        ) {
          this.cities$
            .pipe(
              skipWhile((cities) => cities.length === 0),
              take(1)
            )
            .subscribe((cities) => {
              cities.map((t) => {
                if (
                  this.userService.userObject &&
                  this.userService.userObject.city_id !== null &&
                  this.userService.userObject.city_id !== undefined
                ) {
                  if (
                    t.id === this.userService.userObject.city_id?.toString()
                  ) {
                    this.cityChanged.emit(t);
                    this.selectedCity = t;
                    this.store.dispatch(
                      new HomeAction_GetCityArticles(t.slug, 5, 7)
                    );
                  }
                } else {
                  this.cities$
                    .pipe(
                      skipWhile((cities) => cities.length === 0),
                      take(1)
                    )
                    .subscribe((cities) => {
                      this.cityChanged.emit(cities[0]);
                      this.selectedCity = cities[0];
                      this.store.dispatch(
                        new HomeAction_GetCityArticles(cities[0].slug, 5, 7)
                      );
                    });
                }
              });
            });
        } else {
          this.userService.getUserData(this.token).subscribe((data) => {
            if (data !== null && this.userService !== undefined) {
              this.userService.userObject = data.data[0];
              this.cities$
                .pipe(
                  skipWhile((cities) => cities.length === 0),
                  take(1)
                )
                .subscribe((cities) => {
                  cities.map((t) => {
                    if (
                      this.userService.userObject.city_id !== null &&
                      this.userService.userObject.city_id !== undefined
                    ) {
                      if (
                        t.id === this.userService.userObject.city_id?.toString()
                      ) {
                        this.cityChanged.emit(t);
                        this.selectedCity = t;
                        this.store.dispatch(
                          new HomeAction_GetCityArticles(t.slug, 5, 7)
                        );
                      }
                    } else {
                      this.cities$
                        .pipe(
                          skipWhile((cities) => cities.length === 0),
                          take(1)
                        )
                        .subscribe((cities) => {
                          this.cityChanged.emit(cities[0]);
                          this.selectedCity = cities[0];
                          this.store.dispatch(
                            new HomeAction_GetCityArticles(cities[0].slug, 5, 7)
                          );
                        });
                    }
                  });
                });
            }
          });
        }
      } else {
        this.cities$
          .pipe(
            skipWhile((cities) => cities.length === 0),
            take(1)
          )
          .subscribe((cities) => {
            this.cityChanged.emit(cities[0]);
            this.selectedCity = cities[0];
            this.store.dispatch(
              new HomeAction_GetCityArticles(cities[0].slug, 5, 7)
            );
          });
      }
    });
  }

  ngOnInit() {
    // this.store.dispatch(new HomeAction_GetCities())
  }

  setSelectedCity(city: City) {
    this.selectedCity = city;
    this.isSelectOpen = false;
    this.cityChanged.emit(city);
    this.store.dispatch(new HomeAction_GetCityArticles(city.slug, 2, 7));
  }

  openSelect() {
    if (this.platform.is('cordova') && this.platform.is('mobileweb')) {
    } else {
      this.isSelectOpen = true;
    }
  }
  openSelectHover() {
    if (this.platform.is('cordova') && this.platform.is('mobileweb')) {
    } else {
      this.isSelectOpen = true;
    }
  }

  closeSelect() {
    this.isSelectOpen = false;
  }
  closeSelectHover() {
    if (this.platform.is('cordova') && this.platform.is('mobileweb')) {
    } else {
      this.isSelectOpen = false;
    }
  }
}
