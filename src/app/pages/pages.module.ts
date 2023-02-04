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
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { TrancodeMapperComponent } from './trancode-mapper/trancode-mapper.component';
import { TrancodeViewerComponent } from './trancode-viewer/trancode-viewer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const material_modules = [
  MatSidenavModule,
  MatDividerModule,
  MatButtonModule,
  MatIconModule,
  MatTableModule,
  MatFormFieldModule,
  MatInputModule
];

@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent,
    TrancodeMapperComponent,
    TrancodeViewerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ...material_modules,
  ],
  exports: [PagesRoutingModule],
  providers:[
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {appearance: 'outline'}
    }
  ]
})
export class PagesModule {}
