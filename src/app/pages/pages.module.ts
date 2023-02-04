import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home/home.component';
import {PagesRoutingModule} from "./pages-routing.module";
import { LayoutComponent } from './layout/layout.component';
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    PagesRoutingModule
  ],
  exports: [
    PagesRoutingModule
  ]
})
export class PagesModule {
}
