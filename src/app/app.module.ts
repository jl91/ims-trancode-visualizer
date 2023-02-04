import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { WebsqlService } from './core/websql/services/websql.service';

function initializeApp(): void {
  const {name,version, displayName, estimatedSize} = environment.webSql.database;
  const databaseName: string = environment.webSql.database.name + "-database";

  const database = window.openDatabase(
    name,
    version,
    displayName,
    estimatedSize
  );

  WebsqlService.databaseConnectionInstance = database;
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: () => initializeApp,
    multi: true
   }]
})
export class AppModule { }
