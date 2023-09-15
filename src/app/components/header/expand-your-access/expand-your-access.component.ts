import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastController, AlertController, ModalController, NavController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';

import { Observable } from 'rxjs';
import { skipWhile, take } from 'rxjs/operators';
import { AuthService } from 'src/shared/store/auth/auth.service';
import { UserAction_IsUserRegistered, UserAction_RegisterUserwithEmail } from 'src/shared/store/user/user.actions';
import { IsUserRegistered, create_user_resp } from 'src/shared/store/user/user.models';
import { UserSelectors } from 'src/shared/store/user/user.selectors';

@Component({
  selector: 'app-expand-your-access',
  templateUrl: './expand-your-access.component.html',
  styleUrls: ['./expand-your-access.component.scss'],
})
export class ExpandYourAccessComponent implements OnInit {


  @Select(UserSelectors.userRegistered) isUserRegistered$: Observable<IsUserRegistered>;
  @Select(UserSelectors.isLoading) isLoading$: Observable<boolean>;
  @Select(UserSelectors.createUser) registerUserResp$: Observable<create_user_resp>;

  @Input() isExpandAccessModalOpen: boolean;
  isSignInOpen: boolean = false;
  ispasswordlessModel:boolean=false;

  signInForm: FormGroup;

  successMsg: boolean = false;
  errMsg: boolean = false;
  displayMessageModal: boolean = false;
  messageModalHeader: string = null;
  messageBody: string = null;
  email_address = '';
  showButton: boolean = false;
  successModal:boolean=false;
  @Output() signInModal = new EventEmitter<boolean>();
  constructor( private authService: AuthService,
    private store:Store,private router:Router,
    private toast:ToastController,private alertCtrl:AlertController,
    private modalCtrl:ModalController,private navCtrl:NavController,
    private location:Location,
     private titleService:Title ,    private fb: FormBuilder) { 
    this.titleService.setTitle(`Expand Your Access - SportsWriters`);
  }

  
  get email() {
    return this.signInForm.get('email');
  }

  ngOnInit() { 
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],

    });

    this.location.subscribe((ev) => {
   
      if (ev.type === 'popstate') {
        // handle back button click
        this.modalCtrl.dismiss()
      }
    });
   }

  goToSignInPage() {

    this.signInModal.emit(true)
  }

  openSignInModal() {
    this.isSignInOpen = true;
    this.ispasswordlessModel=true;
  }

  onCloseEvent() {
    this.ispasswordlessModel=false;
    this.isSignInOpen = false;
    
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
            
           this.authService.sendEmailLink(this.email.value)

            this.successMsg = true;
            // this.resetValues()
           
            this.successModal=true;
            this.isSignInOpen = false;
           
            
          }
          else {

           this.authService.sendEmailLink(this.email.value)
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
           this.isSignInOpen = false;
  }

  openSignUpModal() {
    this.isSignInOpen = false;
  }

  

  cancelMeassageModal() {
    this.displayMessageModal = false;

  }

  resetValues() {
    this.isSignInOpen = false;
    this.email.setValue('')
  }

 

  signInWithGoogle() {
  
   this.authService.signInWithGoogle();
   
   
    this.showConfirmation();



  }

  signInWithFacebook() {
   this.authService.signInWithFacebook();
   
    this.showConfirmation();

  }

  signInWithApple() {

  }

  showConfirmation() {
   this.authService.auth$.pipe(skipWhile(resp => resp.isLoggedIn === false), take(1)).subscribe(auth => { 
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

  closeModal(){
    this.modalCtrl.dismiss();
    this.navCtrl.back();
  }

  nav(params){
    this.modalCtrl.dismiss()
 this.router.navigate([params])
  }

}
