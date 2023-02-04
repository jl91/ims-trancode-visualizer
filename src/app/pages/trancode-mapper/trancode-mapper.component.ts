import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TrancodeField } from 'src/app/core/websql/entities/tracode-field.entity';
import { TrancodesEntity } from 'src/app/core/websql/entities/trancodes.entity';
import { TrancodesService } from 'src/app/core/websql/services/trancodes.service';
import { stringify } from 'uuid';

@Component({
  selector: 'app-trancode-mapper',
  templateUrl: './trancode-mapper.component.html',
  styleUrls: ['./trancode-mapper.component.scss']
})
export class TrancodeMapperComponent implements OnInit {

  public baseForm: FormGroup = this.formBuilder.group({
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

  public displayedColumns: string[] = [
    'test'
  ];

  public data: {
      columnName: string,
      columnValue: string
  }[] = [
    {
      columnName: 'test',
      columnValue: 'teste'
    }
  ];

  get trancodeFields(): FormArray {
    return (<FormArray> this.baseForm.controls['fields']);
  }

  addTrancodeField(event?: MouseEvent): void{
    if(event){
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

  public onSubmit(event: SubmitEvent): void{
    console.log(event);

    const {name, label, fields } = this.baseForm.value;

    const entity = new TrancodesEntity();

    entity.name = name;
    entity.label = label;
    entity.fields = fields.map((field: {name: string, size: number}) => {
      const trancodeField = new TrancodeField();
      field.name = field.name;
      field.size = field.size;
      return trancodeField;
    });

    this.trancodesService.save(entity).subscribe(result => {
      console.log(result);
    });
  }

  public onRemove(index: number): void{
    this.trancodeFields.removeAt(index);
  }

  onDrop(event: CdkDragDrop<string[]>): void{
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
    // this.baseForm.value = this.data;
  }

}
