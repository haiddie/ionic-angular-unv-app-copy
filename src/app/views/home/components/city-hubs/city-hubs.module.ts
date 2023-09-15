import { CitySelectComponent } from './components/city-select/city-select.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, IonicModule, RouterModule],
  declarations: [CitySelectComponent],
  exports: [CitySelectComponent]
})
export class CityHubsModule {}
