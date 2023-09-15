import { PipesModule } from 'src/app/pipes/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsLoaderComponent } from './components/news-loader/news-loader.component';
import { IonicModule } from '@ionic/angular';
import { LatestNewsComponent } from './latest-news.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    PipesModule
  ],
  declarations: [LatestNewsComponent, NewsLoaderComponent],
  exports: [LatestNewsComponent, NewsLoaderComponent],
})
export class LatestNewsModule { }
