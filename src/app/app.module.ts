import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { IndexcedDBService } from './core/indexed-db/services/indexed-db.service';
import { async } from '@angular/core/testing';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';

export function initializeApp(indexdedDatabase: IndexcedDBService) {
  return async () => indexdedDatabase.configureDatabase();

}
const {name,version} = environment.database;
const databaseName = name + "-database";

const dbConfig: DBConfig  = {
  name: databaseName,
  version: 1,
  objectStoresMeta: []
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxIndexedDBModule.forRoot(dbConfig)
  ],
  bootstrap: [AppComponent],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initializeApp,
    deps: [IndexcedDBService],
    multi: true
   }]
})
export class AppModule { }
