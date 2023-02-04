import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-trancode-mapper',
  templateUrl: './trancode-mapper.component.html',
  styleUrls: ['./trancode-mapper.component.scss']
})
export class TrancodeMapperComponent {

  public baseForm: FormGroup = this.formBuilder.group({
    trancodeName: new FormControl('', []),
    fields: this.formBuilder.array([])
  });

  constructor(
    private formBuilder: FormBuilder
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

    this.trancodeFields.removeAt(currentIndex);
    this.trancodeFields.removeAt(previousIndex);

    this.trancodeFields.insert(currentIndex, previousControl);
    this.trancodeFields.insert(previousIndex, currentControl);

  }

}
