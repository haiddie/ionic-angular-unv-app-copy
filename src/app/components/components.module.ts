import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LeagueIconsComponent } from './league-icons/league-icons.component';
import { SignInComponent } from './header/sign-in/sign-in.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ExpandYourAccessComponent } from './header/expand-your-access/expand-your-access.component';


@NgModule({
  imports: [CommonModule, IonicModule, RouterModule,  ReactiveFormsModule],
  declarations: [HeaderComponent, FooterComponent, LeagueIconsComponent, SignInComponent,ExpandYourAccessComponent],
  exports: [HeaderComponent, FooterComponent, LeagueIconsComponent,SignInComponent,ExpandYourAccessComponent]
})
export class ComponentsModule {}
