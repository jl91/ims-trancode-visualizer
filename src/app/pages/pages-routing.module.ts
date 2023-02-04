import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LayoutComponent} from "./layout/layout.component";
import { TrancodeMapperComponent } from './trancode-mapper/trancode-mapper.component';
import { TrancodeViewerComponent } from './trancode-viewer/trancode-viewer.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'trancode-mapper',
        component: TrancodeMapperComponent
      },
      {
        path: 'trancode-viewer',
        component: TrancodeViewerComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}

