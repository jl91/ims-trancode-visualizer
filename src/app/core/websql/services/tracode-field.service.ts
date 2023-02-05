import { Injectable } from "@angular/core";
import { WebsqlService } from "./websql.service";
import { TrancodeFieldEntity, fields as tableFiels, tableName as trancodeFieldsTableName } from "../entities/tracode-field.entity";
import * as uuid from 'uuid';
import { map, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TrancodeFieldService {

  constructor(
    private websqlService: WebsqlService
  ) {
    this.websqlService.createTable(trancodeFieldsTableName, tableFiels);
  }

  saveAll(collection: TrancodeFieldEntity[]): any {
    if(collection.length < 0){
      throw new Error("colection cannot be empty");
    }

    collection.forEach(trancodeField => this.save(trancodeField));
  }

  save(entity: TrancodeFieldEntity){
    entity.id = uuid.v4();
    this.websqlService.save(
      trancodeFieldsTableName,
      entity.toData()
    );
  }

  findAllByTrancodeId(
    trancodeId: string | number
  ): Observable<TrancodeFieldEntity[]> {
    return this.websqlService.findAll(
      trancodeFieldsTableName,
      0,
      10000000,
      [],
      [
        {
          key: "fk_trancode",
          value: trancodeId
        }
      ]
    )
    .pipe(
      map((items: SQLResultSetRowList) => {
        const itemsLength = items.length;
        const collection = new Array<TrancodeFieldEntity>();

        for (let i = 0; i < itemsLength; i++) {
          const item = items.item(i);
          const entity = new TrancodeFieldEntity();
          entity.id = item.id;
          entity.fk_trancode = item.fk_trancode;
          entity.name = item.name;
          entity.size = item.size;
          collection.push(entity);
        }

        return collection;
      }),
    )
  }

}

