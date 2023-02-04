import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-trancode-mapper',
  templateUrl: './trancode-mapper.component.html',
  styleUrls: ['./trancode-mapper.component.scss']
})
export class TrancodeMapperComponent {

  public baseForm: FormGroup = this.formBuilder.group({
    trancodeName: new FormControl('', []),
    trancodeFields: this.formBuilder.array([])
  });

  constructor(
    private formBuilder: FormBuilder
  ) {
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
    return (<FormArray> this.baseForm.controls['trancodeFields']);
  }

  addTrancodeField(event: MouseEvent): void{
    event.preventDefault();
    event.stopImmediatePropagation();
    event.stopPropagation();
    this.trancodeFields.push(
      this.formBuilder.group({
        fieldName: new FormControl('', []),
        fieldSize: new FormControl('', []),
      })
    );
  }

}
