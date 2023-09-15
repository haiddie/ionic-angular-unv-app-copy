import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/shared/store/auth/auth.service';
import { AlertController, ModalController, Platform, ToastController } from '@ionic/angular';
// import { create_user } from 'src/shared/store/auth/auth.model';
import { UserAction_GetUser, UserAction_IsUserRegistered, UserAction_RegisterUserwithEmail } from 'src/shared/store/user/user.actions';
import { UserSelectors } from 'src/shared/store/user/user.selectors';
import { create_user_resp, IsUserRegistered } from 'src/shared/store/user/user.models';
import { skipWhile, take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {

  @Input() isModalOpen: boolean;
  @Output() signInModal = new EventEmitter<boolean>();
  successfullLogInModal: boolean = false;

  @Select(UserSelectors.userRegistered) isUserRegistered$: Observable<IsUserRegistered>;
  @Select(UserSelectors.isLoading) isLoading$: Observable<boolean>;
  @Select(UserSelectors.createUser) registerUserResp$: Observable<create_user_resp>;

  successModal:boolean=false;
  isSignInOpen: boolean = false;
  // successfulLogInModal: boolean = false;

  signInForm: FormGroup;
  signUpForm: FormGroup;

  successMsg: boolean = false;
  errMsg: boolean = false;
  displayMessageModal: boolean = false;
  messageModalHeader: string = null;
  messageBody: string = null;
  email_address = '';
  showButton: boolean = false;

  Plt:any;
  ispasswordlessModel:boolean=false;
  constructor(private store: Store,
    private fb: FormBuilder,
    private auth: AuthService,
    private toast: ToastController,
    private router:Router,
    private modalCtrl:ModalController,
    private platform:Platform,
    private alertCtrl:AlertController
  ) { 
    console.log('called here')
    if(this.platform.is('ios')){
      this.Plt='ios'
    }
  }

  ngOnInit() {

    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],

    });
  }


  //#region FORM GETTERS

  get email() {
    return this.signInForm.get('email');
  }

  openSignInModal() {
    this.isSignInOpen = true;
    this.ispasswordlessModel=true;
  }

  onSubmit() {
    // check if user is registered or not
    if (!this.email.invalid) {

      this.store.dispatch(new UserAction_IsUserRegistered(this.email.value))
      this.isUserRegistered$.pipe(skipWhile(resp => resp === null), take(1)).subscribe(
        async (resp) => {
          if (resp.success === true) {
            // user not  registered in db
            let registerObj = {
              email: this.email.value,
              username:'',
              register_passwordless: true,
              sign_up_page:window.origin+this.router.url
            }
            registerObj.username=registerObj.email.substring(0, registerObj.email.indexOf('@'))
           
            this.store.dispatch(new UserAction_RegisterUserwithEmail(registerObj))
            this.email_address = this.email.value
            this.showButton = true;
            
            this.auth.sendEmailLink(this.email.value)

            this.successMsg = true;
            
            
            this.isSignInOpen = false;
          
            this.ispasswordlessModel=false;

           this.successModal=true;
           
            
          }
          else {

            this.auth.sendEmailLink(this.email.value)
            this.email_address = this.email.value;
            this.showButton = true;
            
            this.successMsg = true;
            
            
            this.isSignInOpen = false;
          
            this.ispasswordlessModel=false;

           this.successModal=true;
            // this.resetValues()
          }
        })
    }
  };


  closeSuccessModal(){
    this.email.setValue('')
    this.email_address=''
   
    this.successMsg=false
    this.successModal=false;
    this.ispasswordlessModel=false;
   
}



  openSignUpModal() {
    this.isSignInOpen = false;
  }

  onCloseEvent() {
    this.email_address=''
    this.email.setValue(null)
    this.ispasswordlessModel=false;
    this.isSignInOpen = false;
  
  }

  onCloseEvent2() {
    this.email_address=''
    this.email.setValue(null)
    this.ispasswordlessModel=false;
    this.isSignInOpen = false;
    this.isModalOpen=false;
    this.modalCtrl.dismiss()
  }

  cancelMeassageModal() {
    this.displayMessageModal = false;

  }

  resetValues() {
    this.isSignInOpen = false;
    this.email.setValue('')
  }

  closeModal() {
    this.displayMessageModal = false
    this.showButton = false
    this.signInModal.emit(false)
  }

  signInWithGoogle() {

    this.auth.signInWithGoogle();
    this.signInModal.emit(false)
    this.isModalOpen = false;
    this.showConfirmation();



  }

  signInWithFacebook() {
    this.auth.signInWithFacebook();
    this.signInModal.emit(false);
    this.showConfirmation();

  }

  signInWithApple() {

  }

  showConfirmation() {
    this.auth.auth$.pipe(skipWhile(resp => resp.isLoggedIn === false), take(1)).subscribe(auth => { 
      this.modalCtrl.dismiss()
      this.confirmationModal() })
  }

  async confirmationModal() {
    const t = await this.toast.create({
      // header:`Sign in Successful!`,
      message: `Sign in Successful!`,
      position: 'middle',
      duration: 2500,
      cssClass: 'toast',
      buttons: [
        {
          icon: 'close',
          role: 'cancel'
        }],
    });
    await t.present();

  }


  nav(params){
    this.router.navigate([params])
    this.modalCtrl.dismiss()
      }

}
