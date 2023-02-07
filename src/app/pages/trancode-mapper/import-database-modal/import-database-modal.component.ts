import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TrancodesService } from 'src/app/shared/services/trancodes.service';

@Component({
  selector: 'app-import-database-modal',
  templateUrl: './import-database-modal.component.html',
  styleUrls: ['./import-database-modal.component.scss']
})
export class ImportDatabaseModalComponent {

  public textArea: string = "[]";

  constructor(
    private trancodesService: TrancodesService,
    public dialogRef: MatDialogRef<ImportDatabaseModalComponent>
  ) {

  }

  save(event: MouseEvent) {
    event.stopPropagation();
    event.stopImmediatePropagation();

    if (this.trancodesService.importDatabase(this.textArea)) {
      this.dialogRef.close();
    }
  }
}
