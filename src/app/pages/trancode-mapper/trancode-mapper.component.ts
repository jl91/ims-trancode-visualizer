import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { map, Observable, tap } from 'rxjs';
import { TrancodeFieldEntity } from 'src/app/shared/entities/tracode-field.entity';
import { TrancodesEntity } from 'src/app/shared/entities/trancodes.entity';
import { TrancodesService } from 'src/app/shared/services/trancodes.service';
import { ImportDatabaseModalComponent } from './import-database-modal/import-database-modal.component';

@Component({
  selector: 'app-trancode-mapper',
  templateUrl: './trancode-mapper.component.html',
  styleUrls: ['./trancode-mapper.component.scss']
})
export class TrancodeMapperComponent implements OnInit, AfterViewInit {

  public baseForm: FormGroup = this.formBuilder.group({
    id: new FormControl(null, []),
    name: new FormControl('', [Validators.required]),
    label: new FormControl('', [Validators.required]),
    fields: this.formBuilder.array([])
  });

  constructor(
    private formBuilder: FormBuilder,
    private trancodesService: TrancodesService,
    public dialog: MatDialog
  ) {
    this.addTrancodeField();
  }

  ngAfterViewInit(): void {
    this.loadTrancode();
  }

  public displayedColumns: string[] = [
    'id',
    'IMS Transaction name',
    'IMS Transaction label',
    'Actions'
  ];

  public countTotalDatabaseItems: number = 0;

  public headersMap: { columnName: string, columnValue: string }[] = [
    {
      columnName: 'id',
      columnValue: 'id'
    },
    {
      columnName: 'IMS Transaction name',
      columnValue: 'name'
    },
    {
      columnName: 'IMS Transaction label',
      columnValue: 'label'
    },
  ];

  public data: TrancodesEntity[] = []

  get trancodeFields(): FormArray {
    return (<FormArray>this.baseForm.controls['fields']);
  }

  addTrancodeField(event?: MouseEvent): void {
    if (event) {
      event.preventDefault();
      event.stopImmediatePropagation();
      event.stopPropagation();
    }
    this.trancodeFields.push(
      this.formBuilder.group({
        name: new FormControl('', [Validators.required, Validators.minLength(1)]),
        size: new FormControl(1, [Validators.required]),
        label: new FormControl('', [])
      })
    );
  }

  public onSubmit(event: SubmitEvent): void {
    console.log(event);

    const { id, name, label, fields } = this.baseForm.value;

    const entity = new TrancodesEntity();
    if (id) entity.id = id;
    entity.name = name;
    entity.label = label;
    entity.fields = fields.map((field: { name: string, size: number , label: string}) => {
      const trancodeField = new TrancodeFieldEntity();
      trancodeField.name = field.name;
      trancodeField.size = field.size;
      trancodeField.label = field.label;
      return trancodeField;
    });

    if (id) {
      this.trancodesService.update(entity).subscribe(result => {
        console.log(result, "aqui");
        this.resetForm();
        this.loadTrancode();
      });
      return;
    }

    this.trancodesService.save(entity).subscribe(result => {
      console.log(result, "aqui");
      this.resetForm();
      this.loadTrancode();
    });
  }

  private resetForm(): void {
    this.baseForm.reset();
    this.removeAllTrancodeFields();
    this.addTrancodeField();
  }

  private removeAllTrancodeFields(): void {
    while (this.trancodeFields.length !== 0) {
      this.trancodeFields.removeAt(0)
    }
  }

  public onRemove(index: number): void {
    this.trancodeFields.removeAt(index);
  }

  onDrop(event: CdkDragDrop<string[]>): void {
    const previousIndex = event.previousIndex;
    const currentIndex = event.currentIndex;

    const controls = this.trancodeFields.controls;

    const previousControl = controls.at(previousIndex);
    const currentControl = controls.at(currentIndex);

    moveItemInArray(this.trancodeFields.controls, previousIndex, currentIndex);

    this.trancodeFields.insert(currentIndex, previousControl);
    this.trancodeFields.removeAt(currentIndex);

    this.trancodeFields.insert(previousIndex, currentControl);
    this.trancodeFields.removeAt(previousIndex);

  }

  ngOnInit(): void {
  }


  private loadTrancode(
    page: number = 0,
    pageSize: number = 5
  ): void {
    const subscription = this.trancodesService.findAll(page, pageSize)
      .pipe(
        tap(data => console.log(data)),
      )
      .subscribe((items: TrancodesEntity[]) => {
        this.data = items;
        subscription.unsubscribe();
        this.doCountTotalDatabaseItems();
      });
  }

  onRemoveTrancode(trancode: TrancodesEntity): void {
    this.trancodesService.delete(trancode).subscribe((result) => console.log(result));
    this.loadTrancode();
  }

  onEditTrancode(trancode: TrancodesEntity): void {
    this.removeAllTrancodeFields();
    trancode.fields.forEach(() => this.addTrancodeField());
    this.baseForm.setValue(trancode);
  }

  downloadDatabase(): void {
    const subscription = this.trancodesService.findAll(0, 1000000)
      .pipe(
        map((items: TrancodesEntity[]) => items.map(item => {
          item.id = undefined;
          return item;
        })
        )
      )
      .subscribe((items: TrancodesEntity[]) => {

        const filename = 'database.json';
        const jsonString = JSON.stringify(items, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);

      });
  }

  importJsonDatabase(): void {
    const dialogRef: MatDialogRef<ImportDatabaseModalComponent> = this.dialog.open(ImportDatabaseModalComponent, {
        height: '400px',
        width: '600px',
    });

    const subscription = dialogRef.beforeClosed()
    .subscribe(() => {
      this.loadTrancode();
      subscription.unsubscribe();
    });
  }

  onPageChange(page: PageEvent): void {
    const {pageIndex, pageSize} = page;
    this.loadTrancode(pageIndex, pageSize);
  }

 doCountTotalDatabaseItems(): void{
    const subscription = this.trancodesService
    .countTotalDatabaseItems()
    .subscribe(total => {
      this.countTotalDatabaseItems = total;
      subscription.unsubscribe();
    });
  }
}
