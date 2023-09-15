import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
// import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
// import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { stateList } from './state-list';
import { environment } from 'src/environments/environment';

@NgModule({
  imports: [
    NgxsModule.forRoot([...stateList] ,{ developmentMode: !environment.production}),
    // NgxsLoggerPluginModule.forRoot(),
    // NgxsStoragePluginModule.forRoot(),
    // NgxsFirestoreModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot({disabled: environment.production}),
  ]
})
export class StoreModule {}
