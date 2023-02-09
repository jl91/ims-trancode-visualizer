// Angular core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Material
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';


// CDK
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ClipboardModule } from '@angular/cdk/clipboard';

// Components
import { TrancodeMapperComponent } from './trancode-mapper/trancode-mapper.component';
import { TrancodeViewerComponent } from './trancode-viewer/trancode-viewer.component';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { ImportDatabaseModalComponent } from './trancode-mapper/import-database-modal/import-database-modal.component';
import { HomeComponent } from './home/home.component';
import { PagesRoutingModule } from './pages-routing.module';
import { LayoutComponent } from './layout/layout.component';


const material_modules = [
  // Material Modules
  MatSidenavModule,
  MatDividerModule,
  MatButtonModule,
  MatIconModule,
  MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatToolbarModule,
  MatDialogModule,
  MatPaginatorModule,
  MatTooltipModule,
  MatSnackBarModule,
  // CDK
  DragDropModule,
  ClipboardModule,
];

@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent,
    TrancodeMapperComponent,
    TrancodeViewerComponent,
    ToolbarComponent,
    ImportDatabaseModalComponent,
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
