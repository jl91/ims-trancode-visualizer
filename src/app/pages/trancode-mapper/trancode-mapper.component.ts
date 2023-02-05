import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, tap } from 'rxjs';
import { TrancodeFieldEntity } from 'src/app/shared/entities/tracode-field.entity';
import { TrancodesEntity } from 'src/app/shared/entities/trancodes.entity';
import { TrancodesService } from 'src/app/shared/services/trancodes.service';

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
    private trancodesService: TrancodesService
  ) {
    this.addTrancodeField();
  }

  ngAfterViewInit(): void {
    this.loadTrancode();
  }

  public displayedColumns: string[] = [
    'id',
    'Label',
    'Transaction',
    'Actions'
  ];

  public headersMap: { columnName: string, columnValue: string }[] = [
    {
      columnName: 'id',
      columnValue: 'id'
    },
    {
      columnName: 'Label',
      columnValue: 'label'
    },
    {
      columnName: 'Transaction',
      columnValue: 'name'
    }
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
    entity.fields = fields.map((field: { name: string, size: number }) => {
      const trancodeField = new TrancodeFieldEntity();
      trancodeField.name = field.name;
      trancodeField.size = field.size;
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


  private loadTrancode(): void {
    const subscription = this.trancodesService.findAll(0, 1000000)
      .pipe(
        tap(data => console.log(data)),
      )
      .subscribe((items: TrancodesEntity[]) => {
        this.data = items;
        subscription.unsubscribe()
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
}
