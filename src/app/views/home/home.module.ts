import { PipesModule } from 'src/app/pipes/pipes.module';
import { CityHubsModule } from './components/city-hubs/city-hubs.module';
import { CityHubsComponent } from './components/city-hubs/city-hubs.component';
import { ContentExperienceComponent } from './components/content-experience/content-experience.component';
import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { SwiperModule } from 'swiper/angular';
import { EditorPicksComponent } from './components/editor-picks/editor-picks.component';
import { LatestNewsModule } from './components/latest-news/latest-news.module';
import { RecentlyAddedWritersComponent } from './components/recently-added-writers/recently-added-writers.component';
import { RankingComponent } from './components/ranking/ranking.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    HomePageRoutingModule,
    ComponentsModule,
    SwiperModule,
    CityHubsModule,
    LatestNewsModule,
    PipesModule,

    // CityPageModule
  ],
  declarations: [HomePage, ContentExperienceComponent, CityHubsComponent, EditorPicksComponent, RecentlyAddedWritersComponent, RankingComponent],
  exports: [HomePage, ContentExperienceComponent, CityHubsComponent, EditorPicksComponent, RecentlyAddedWritersComponent, RankingComponent ],
})
export class HomePageModule {}
