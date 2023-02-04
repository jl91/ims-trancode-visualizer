import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { tableName, TrancodesEntity } from "../entities/trancodes.entity";
import { TrancodeFieldService } from "./tracode-field.service";
import { WebsqlService } from "./websql.service";
const uuidv4 = require('uuid/v4');

@Injectable({
  providedIn: 'root'
})
export class TrancodesService {

  constructor(
    private websqlService: WebsqlService,
    private trancodeFieldService: TrancodeFieldService
  ) {
    const tableName = 'tracodes';
    const fields = ['id unique', 'name', 'label'];
    this.websqlService.createTable(tableName, fields);
  }

  save(trancode: TrancodesEntity): Observable<number> {

    trancode.id  = uuidv4();
    return this.websqlService
    .save(
      tableName,
      trancode.toData()
    )
    .pipe(
      map(result => result.insertId)
    );

  }


  listAll(
    page: number = 1,
    pageSize: number = 10
  ): void {
    this.websqlService.findAll(
      tableName,
      page,
      pageSize,
      [],
      []
    )
  }

}

