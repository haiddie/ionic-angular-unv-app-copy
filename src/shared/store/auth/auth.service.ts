import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  getAuth,
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  signInWithCredential,
  sendEmailVerification,
  authState,
  EmailAuthProvider,
  fetchSignInMethodsForEmail,
  linkWithPopup,
  linkWithCredential,
} from '@angular/fire/auth';
import { BehaviorSubject, Observable, pipe } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api-controller/api.service';
import {
  AuthState,
  checkUserRegisteredResp,
  Login,
  SignUp,
  user_info,
} from './auth.model';

import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

 import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

import { Capacitor } from '@capacitor/core';
import { isPlatform, ModalController, Platform, ToastController } from '@ionic/angular';

const initialAuthState = {
  isLoggedIn: null,
  isEmailVerified: false,
  id: null,
  email: null,
  name: null,
  phone_number: null,
  token: null,
  display_picture: null,
  username: null,
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private boolVal: boolean = false;

  private isLoading = new BehaviorSubject<boolean>(false);
  private displaySignInModal = new BehaviorSubject<string>(null);
  public readonly _authState = new BehaviorSubject<AuthState>(initialAuthState);
  /** AuthState as an Observable */
  readonly auth$ = this._authState.asObservable();
  readonly isLoading$ = this.isLoading.asObservable();
  readonly displaySignInModal$ = this.displaySignInModal.asObservable();

  Usr;
  token;

  constructor(

    private auth: Auth,
    public router: Router,
    private api: ApiService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private platform: Platform,
    private toast:ToastController,
    public modalCtrl: ModalController
  ) {
  
    if(!isPlatform('capacitor')){
      GoogleAuth.initialize()
      
    }
   
    this.auth.onAuthStateChanged((user: any) => {
      
      if (!user) {
        this.isLoading.next(false);
        initialAuthState.isLoggedIn = false;
        this._authState.next(initialAuthState);
      } else {
        user.getIdToken(true).then((token: any) => {
          this.isLoading.next(false);
          if(token!==null|| token!==undefined){
          this._authState.next({
            isEmailVerified: user.emailVerified,
            id: user.uid,
            email: user.email,
            name: user.displayName,
            phone_number: user.phoneNumber,
            username: user.username,
            display_picture: user.photoURL,
            token: token,
            isLoggedIn: true,
          });
        }
          // popup welcome to sportswriters
        });
      }
    });
  }

  public openModal(bool) {
    this.boolVal = bool;
    if (this.boolVal) {
      this.displaySignInModal.next('signIn');
    }
    this.boolVal = false;
  }

  public login({ email, password }: Login) {
    this.isLoading.next(true);
    return signInWithEmailAndPassword(this.auth, email, password);
  }
  public signUp({ name, email, password }: SignUp) {
    this.isLoading.next(true);
    return createUserWithEmailAndPassword(this.auth, email, password);
  }
  public updateProfile(name: string) {
    return updateProfile(this.auth.currentUser, { displayName: name });
  }
  public async logout() {
    await signOut(this.auth);
    if(this.router.url!=='account'){
      
    }
    else{
      this.router.navigate(['/home'])
      window.location.reload()
    }
    
    //Kill existing session
    // await FacebookLogin.logout()
    // this.router.navigate(['auth'], { queryParams: { type: 'login' }, replaceUrl: true });
  }
  public forgotPassword(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }
  public changeLoaderState(state: boolean) {
    this.isLoading.next(state);
    console;
  }

  // PASSWORDLESS SIGN iN

  // public async checkIfUserRegistered(email: string): Promise<checkUserRegisteredResp>{
  //    return await this.isUserRegisteredInDb(email).toPromise()
  // }


  getSocial_Accounts(){
    let params = new HttpParams();
    params = params.set("social_media", true)
    const url = this.api.getUrl(environment.baseEndpoints.consumer);
    return this.http.get<any>(url, {params});
  }

  public sendEmailLink(email: string) {

    if (Capacitor.isNativePlatform()) {
      console.log('platform checked')
      environment.actionCodeSettings.url =
      environment.URL +this.router.url + '?email=' + email;
    }

    else{
      environment.actionCodeSettings.url =
      window.origin + this.router.url + '?email=' + email;
    }
    
    return sendSignInLinkToEmail(
      this.auth,
      email,
      environment.actionCodeSettings
    ).then(() => {
      if (Capacitor.isNativePlatform()) {
        localStorage.setItem('emailForSignIn', email);
        localStorage.setItem('url', window.origin + this.router.url);
      } else {
        window.localStorage.setItem('emailForSignIn', email);
        localStorage.setItem('url', window.origin + this.router.url);
      }
    });
  }

  signInFromLink() {
    
    return new Promise((resolve, reject) => {
     
      const auth = getAuth();
      let url =''
      if (Capacitor.isNativePlatform()) {
      url=window.origin + this.router.url;
      }
      else{
        url= window.origin + this.router.url;
      }
      let email;
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      email = urlParams.get('email');
      if (isSignInWithEmailLink(auth, url)) {
        if (email === null) {
          if (Capacitor.isNativePlatform()) {
            email = localStorage.getItem('emailForSignIn');
          } else {
            email = window.localStorage.getItem('emailForSignIn');
          }
        }
        signInWithEmailLink(auth, email, url)
          .then((result) => {
            console.log('result', result);
            this.isUserRegisteredInDb(result.user).subscribe((resp) => {
              if (resp.success === true) {
                this.registerUserInDb(result.user).subscribe((r) => {
                  console.log('user', r);
                  resolve(result);
                });
              } else {
                resolve(result);
              }
            }, (error) => {
              console.log('error', error);
              reject(error);
            });
          })
          .catch((error) => {
            console.log('error', error);
            reject(error);
          });
      } else {
        reject('not signing from email');
      }
    });
  }

  async signInWithGoogle(): Promise<any> {
    this.isLoading.next(true);

    if (this.platform.is('cordova')) {
      console.log('called 1')
      this.isLoading.next(false);
      try {
        const result:any = await GoogleAuth.signIn();
        const { idToken, accessToken } = result.authentication;
  
        // Sign in to AngularFire using the Google credentials
     console.log('result',result);
        const credential = GoogleAuthProvider.credential(idToken, accessToken);
        const userCredential = await signInWithCredential(this.auth,credential);

          console.log('user creditionals',userCredential);
          this.isUserRegisteredInDb(userCredential).subscribe((resp) => {
            if (resp.success === true) {
              this.registerUserInDb(userCredential).subscribe((r) =>
                console.log('user', r)
              );
            }
          } ,(err) => {
            console.log('err', err);
          })
      } catch (error) {
        console.log(error);
      }
    
       
    
    } else {
      const provider = new GoogleAuthProvider();
      console.log('auth', this.auth);
      console.log('provider', provider);
      try {
        await signInWithPopup(this.auth, provider)
          .then((result) => {
            console.log('called 2')
            
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const user = result.user;
           // Link Multiple Auth Providers to an Account Using JavaScript
            this.isLoading.next(false);
            fetchSignInMethodsForEmail(this.auth, result.user.email).then(
              (signInMethods) => {
                if (
                  signInMethods.indexOf(
                    EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD
                  ) != -1
                ) {
                  // There's already an email/password account with the same email address      // We can't link the Google account to this account because the password is required
                  console.log("Can't link Google account: password required");
                } else if (
                  signInMethods.indexOf(
                    FacebookAuthProvider.FACEBOOK_SIGN_IN_METHOD
                  ) != -1
                ) {
                  // There's already a Facebook account with the same email address      // We can link the Google account to this account
                  var fbProvider = new FacebookAuthProvider();

                  linkWithPopup(user, fbProvider).then(
                    (result) => {
                      console.log('Account linking success:', result.user);
                      this.isUserRegisteredInDb(user).subscribe((resp) => {
                        if (resp.success === true) {
                          this.registerUserInDb(user).subscribe((r) =>
                            console.log('user', r)
                          );
                        }
                      }),
                        (err) => {
                          console.log('err', err);
                        };
                    },
                    (error) => {
                      console.log('Account linking error:', error);
                    }
                  );
                } else {
                  // There's no existing account with this email address      // We can just link the Google credential to the current user's account
                  // linkWithCredential(user, credential).then((result) => {
                  //   console.log('called here ....');
                  //   console.log("Account linking success:", result.user);

                  // })
                  this.isUserRegisteredInDb(user).subscribe((resp) => {
                    if (resp.success === true) {
                      this.registerUserInDb(user).subscribe((r) =>
                        console.log('user', r)
                      );
                    }
                  }),
                    (err) => {
                      console.log('err', err);
                    };
                }
              }
            ),
              (error) => {
                console.log('Account linking error:', error);
              };
          })
          .catch((error) => {
            console.log('err from google login', error);
            this.isLoading.next(false);
          });
      } catch (err) {
        console.log('err =>', err);
      }
    }
  }

  /**
   * Facebook sign in
   */

  async signInWithFacebook(): Promise<any> {
    this.isLoading.next(true);

    if (this.platform.is('cordova')) {
      console.log('called 3')
      this.isLoading.next(false);

      try {
        const provider = new FacebookAuthProvider();
        console.log('auth',this.auth);
        await signInWithPopup(this.auth, provider)
        .then((result) => {
          const credential =
            FacebookAuthProvider.credentialFromResult(result);
          const user = result.user;
          console.log('user',user);
        },(err)=>{
          console.log('err=>',err)
        })
      } catch (error) {
        console.log(error);
      }
     
      // const facebookCredential = firebase.auth.FacebookAuthProvider.credential(accessToken);
      // await firebase.auth().signInWithCredential(facebookCredential);
      // const user = await GoogleAuth.signIn();
      // console.log('user',user);
    } else {

     
      const provider = new FacebookAuthProvider();
      console.log('auth', this.auth);
      console.log('provider', provider);
      try {
        await signInWithPopup(this.auth, provider)
          .then((result) => {
            console.log('called 4')
            const credential = FacebookAuthProvider.credentialFromResult(result);
            const user = result.user;
            this.isLoading.next(false);
            fetchSignInMethodsForEmail(this.auth, result.user.email).then(
              (signInMethods) => {
                if (
                  signInMethods.indexOf(
                    EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD
                  ) != -1
                ) {
                  // There's already an email/password account with the same email address      // We can't link the Google account to this account because the password is required
                  console.log("Can't link facebook account: password required");
                } 
                else if (
                  signInMethods.indexOf(
                    GoogleAuthProvider.GOOGLE_SIGN_IN_METHOD
                  ) != -1
                ) {
                  // There's already a Facebook account with the same email address      // We can link the Google account to this account
                  var googleProvider = new GoogleAuthProvider();

                  linkWithPopup(user, googleProvider).then(
                    (result) => {
                      console.log('Account linking success:', result.user);
                      this.isUserRegisteredInDb(user).subscribe((resp) => {
                        if (resp.success === true) {
                          this.registerUserInDb(user).subscribe((r) =>
                            console.log('user', r)
                          );
                        }
                      }),
                        (err) => {
                          console.log('err', err);
                        };
                    },
                    (error) => {
                      console.log('Account linking error:', error);
                    }
                  );
                }
                
                 else {
                  // There's no existing account with this email address      // We can just link the Google credential to the current user's account
                  // linkWithCredential(user, credential).then((result) => {
                  //   console.log('called here ....');
                  //   console.log("Account linking success:", result.user);

                  // })
                  this.isUserRegisteredInDb(user).subscribe((resp) => {
                    if (resp.success === true) {
                     this.sendVerificationEmail(user).then(async(data)=>{
                      console.log('data from send verification email')
                     await this.successToast()
                     },(err)=>{
                      console.log('err from send verification email',err)
                     })
                      this.registerUserInDb(user).subscribe((r) =>
                        console.log('user', r)
                      );
                    }
                  }),
                    (err) => {
                      console.log('err', err);
                    };
                }
              }
            ),
              (error) => {
                console.log('Account linking error:', error);
              };
          })
          .catch(async(error) => {
            console.log('err from facebook login', error);
            this.isLoading.next(false);
            await this.errorToast()
          });
      } catch (err) {
        console.log('err =>', err);
        
      }
    }
  }

  async errorToast() {
    const t = await this.toast.create({
       header:`Error!`,
      message: `Account Already Linked With Google! try a different email address`,
      position: 'middle',
      duration: 2500,
      color:'danger',
      buttons: [
        {
          icon: 'close',
          role: 'cancel'
        }],
    });
    await t.present();
  
  }

  async successToast() {
    const t = await this.toast.create({
       header:`Verify Email`,
      message: `We sent you an email verification link on your mail, kindly click it and verify!`,
      position: 'middle',
      duration: 2500,
      cssClass:'toast',
      buttons: [
        {
          icon: 'close',
          role: 'cancel'
        }],
    });
    await t.present();
  
  }



 async sendVerificationEmail(user) {
  environment.actionCodeSettings.url =
  window.origin + this.router.url + '?email=' + user.email;
  return sendEmailVerification(
    user,
    environment.actionCodeSettings
  ).then(() => {
    console.log('verification email sent')
  },(err)=>{
    console.log('err from verfication email =>',err);
  });
  }
  parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  }

  // async getCurrentToken() {
  //   const result = await this.fbLogin.getCurrentAccessToken();

  //   if (result.accessToken) {
  //     this.token = result.accessToken;
  //     this.loadUserData();
  //   } else {
  //     // Not logged in.
  //   }
  // }

  // async loadUserData() {
  //   const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdp?key=${environment.firebase.apiKey}`;
  //   let body = {
  //     postBody: "&access_token=" + this.token.token + '&providerId=facebook.com',
  //     requestUri: environment.URL,
  //     returnSecureToken: true
  //   }

  //   this.http.post(url, body).subscribe(res => {
  //     this.Usr = res;

  //     this.isUserRegisteredInDb(this.Usr).subscribe(resp => {
  //       let tokenPayload = this.parseJwt(this.Usr.idToken)
  //       this.Usr['uid'] = tokenPayload.user_id;
  //       if (resp.success === true) {

  //         this.registerUserInDb(this.Usr).subscribe(r => console.log("user", r))

  //       }
  //       const auth = getAuth();

  //       this._authState.next({
  //         isEmailVerified: this.Usr.emailVerified,
  //         id: this.Usr.uid,
  //         email: this.Usr.email,
  //         name: this.Usr.fullName,
  //         phone_number: '',
  //         username: this.Usr.displayName,
  //         display_picture: this.Usr.photoUrl,
  //         token: this.Usr.idToken,
  //         isLoggedIn: true
  //       });
  //       this.isLoading.next(false)
  //     }), err => { console.log("err", err) }
  //     this.isLoading.next(false)
  //   });
  // }

  // ********  REGISTERATION /PASSWORDLESS API  ********

  //  check if email already exists -api
  isUserRegisteredInDb(user): Observable<checkUserRegisteredResp> {
    let params = new HttpParams();

    (params = params.set('register', true)),
      (params = params.set('email', user.email));

    const url = this.api.getUrl(environment.baseEndpoints.consumer);
    return this.http.get<checkUserRegisteredResp>(url, { params });
  }

  registerUserInDb(u): Observable<any> {
   console.log('u',u);
    let user_info: user_info = {
      name: u.displayName ? u.displayName : '',
      email: u.email,
      username:'',
      phone_number: u.phone_number ? u.phone_number : '',
      uid: u.uid,
      display_picture: u.display_picture ? u.display_picture : '',
      register: true,
      sign_up_page: window.origin + this.router.url,
    };
    // if(u.username!==null){
    // user_info.username=u.username
    // } 
    if(u.displayName!==null||u.name!==null){
      if(u.displayName){
        const nameArray = u.displayName.split(" ");
        const firstName = nameArray[0];
        let lastName
        let lastNameInitial
        if(nameArray.length>1){
           lastName= nameArray[nameArray.length - 1];
           lastNameInitial = lastName.charAt(0);
        }
        user_info.username=firstName+lastNameInitial
      }
      else if(u.name){
        
        const nameArray = u.name.split(" ");
       const firstName = nameArray[0];
       let lastName
       let lastNameInitial
       if(nameArray.length>1){
          lastName= nameArray[nameArray.length - 1];
          lastNameInitial = lastName.charAt(0);
       }
       user_info.username=firstName+lastNameInitial
        
       
      }
      
    }
    if(u.username===null&&(u.displayName===null&&u.name===null)){
      user_info.username=u.email.substring(0, u.email.indexOf('@'))
    }
    console.log('userinfo', user_info);

    const url = this.api.getUrl(environment.baseEndpoints.consumer);
    return this.http.post<any>(url, user_info);
  }
}
