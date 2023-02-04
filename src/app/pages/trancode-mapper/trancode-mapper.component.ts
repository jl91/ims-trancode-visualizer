import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-trancode-mapper',
  templateUrl: './trancode-mapper.component.html',
  styleUrls: ['./trancode-mapper.component.scss']
})
export class TrancodeMapperComponent {

  public formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      trancodeName: ['', ''],
      trancodeFields: this.formBuilder.array([])
    });
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
    return this.formGroup.controls['trancodeFields'] as FormArray;
  }

  addTrancodeField(event: MouseEvent): void{
    event.preventDefault();
    event.stopImmediatePropagation();
    event.stopPropagation();

    const newForm = this.formBuilder.group({
      fieldName: ['', ''],
      fieldSize: ['biginteger', '']
    });

    this.trancodeFields.push(newForm);
  }

}
