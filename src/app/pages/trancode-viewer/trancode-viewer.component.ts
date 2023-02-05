import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { TrancodeFieldEntity } from 'src/app/shared/entities/tracode-field.entity';
import { TrancodesEntity } from 'src/app/shared/entities/trancodes.entity';
import { TrancodesService } from 'src/app/shared/services/trancodes.service';

@Component({
  selector: 'app-trancode-viewer',
  templateUrl: './trancode-viewer.component.html',
  styleUrls: ['./trancode-viewer.component.scss']
})
export class TrancodeViewerComponent implements OnInit, AfterViewInit {

  public data: TrancodesEntity[] = []

  public selectedTrancodesEntity: TrancodesEntity | undefined;

  public totalTrancodeSize: number = 0;

  public currentTrancodeTextSize: number = 0;

  public currentClassOver: number = -1;

  public currentTrancodeFields: {
    fieldName: string,
    fieldValue: string,
    fieldSize: number,
  }[] = [];

  public form: FormGroup = this.formBuilder.group({
    trancodeText: new FormControl(null, [])
  });

  constructor(
    private trancoesService: TrancodesService,
    private formBuilder: FormBuilder
  ) {

  }
  ngAfterViewInit(): void {

    if (!this.form) {
      return;
    }

    (this.form.get("trancodeText") as FormControl).valueChanges
      .subscribe(value => {
        const valueLength = value.length;
        this.currentTrancodeTextSize = valueLength;
        this.currentTrancodeFields = [];

        if (this.totalTrancodeSize != this.currentTrancodeTextSize) {
          return;
        }

        if (!this.selectedTrancodesEntity) {
          return;
        }

        let valueCopy: string = value;

        this.selectedTrancodesEntity.fields.forEach(item => {
          const sizeAt = (item.size as number);
          const slice = valueCopy.slice(0, sizeAt);
          valueCopy = valueCopy.slice(sizeAt, valueCopy.length);

          console.log("slice: " + valueCopy + "\n");

          this.currentTrancodeFields.push({
            fieldName: item.name as string,
            fieldValue: slice,
            fieldSize: item.size as number
          });

        });

      });
  }


  ngOnInit(): void {
    this.loadTrancodes();


  }


  private loadTrancodes(): void {
    this.trancoesService.findAll().subscribe(data => this.data = data);
  }

  public onSelectionChange(trancode: TrancodesEntity) {
    console.log(trancode);
    this.selectedTrancodesEntity = trancode;
    this.totalTrancodeSize = trancode.fields.reduce(
      (accumulator: number, current: TrancodeFieldEntity) => accumulator + (current.size as number), 0);
  }

  onFieldMouseOver(index: number): void {
    this.currentClassOver = index;
  }

}
