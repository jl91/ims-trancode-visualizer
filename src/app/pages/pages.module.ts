import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { PagesRoutingModule } from './pages-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TrancodeMapperComponent } from './trancode-mapper/trancode-mapper.component';
import { TrancodeViewerComponent } from './trancode-viewer/trancode-viewer.component';

const material_modules = [
  MatSidenavModule,
  MatDividerModule,
  MatButtonModule,
  MatIconModule,
];

@NgModule({
  declarations: [LayoutComponent, HomeComponent, TrancodeMapperComponent, TrancodeViewerComponent],
  imports: [
    CommonModule,
    RouterModule,
    PagesRoutingModule,
    ...material_modules,
  ],
  exports: [PagesRoutingModule],
})
export class PagesModule {}
