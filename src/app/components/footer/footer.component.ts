import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { FeedbackPage } from '../../modals/feedback/feedback.page';
import { AuthService } from 'src/shared/store/auth/auth.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  social_accounts:any;
  date=new Date()
  constructor(private modalCtrl:ModalController,private auth:AuthService) { }

  ngOnInit() {
    this.getSocial_accounts()
  }



  getSocial_accounts(){
    this.auth.getSocial_Accounts().subscribe((data)=>{
      console.log('data',data)
      this.social_accounts=data.data;
    })
  }
  async openFeedbackModal() {
    const modal = await this.modalCtrl.create({
      component: FeedbackPage,
      backdropDismiss:false,
      cssClass:'my-custom-class'
    });
    modal.present();
}

openTwitter(url){
  window.open(url);
}
openFb(url){
  window.open(url);
}


}
