import { Injectable } from '@angular/core';
import { filter, map, Observable, of, switchMap, tap } from 'rxjs';
import { TrancodeFieldService } from './tracode-field.service';
import { WebsqlService } from './websql.service';
import * as uuid from 'uuid';
import {
  TrancodesEntity,
  tableName as trancodeTableName,
  fields as tableFields,
} from '../entities/trancodes.entity';
import { TrancodeFieldEntity } from '../entities/tracode-field.entity';

@Injectable({
  providedIn: 'root',
})
export class TrancodesService {
  constructor(
    private websqlService: WebsqlService,
    private trancodeFieldService: TrancodeFieldService
  ) {
    this.websqlService.createTable(trancodeTableName, tableFields);
  }

  save(trancode: TrancodesEntity): Observable<any> {
    trancode.id = uuid.v4();
    return this.websqlService.save(trancodeTableName, trancode.toData()).pipe(
      map((result) => result.insertId > 0),
      filter((result) => result),
      map(() =>
        trancode.fields.map((field) => {
          const entity = new TrancodeFieldEntity();
          entity.fk_trancode = trancode.id;
          entity.name = field.name;
          entity.size = field.size;

          return entity;
        })
      ),
      switchMap((entities) => this.trancodeFieldService.saveAll(entities))
    );
  }

  listAll(page: number = 1, pageSize: number = 10): Observable<TrancodesEntity[]> {
    return this.websqlService.findAll(trancodeTableName, page, pageSize, [], []).pipe(
      map((items: SQLResultSetRowList) => {
        const collection = [];
        const itemsLength = items.length;

        for (let i = 0; i < itemsLength; i++) {
          const entity = new TrancodesEntity();
          const currentItem = items.item(i);

          entity.id = currentItem.id;
          entity.name = currentItem.name;
          entity.label = currentItem.label;

          const trancodeFields = this.trancodeFieldService
            .findAllByTrancodeId(entity.id as string)
            .forEach((trancodeFields: TrancodeFieldEntity[]) => {
              entity.fields = trancodeFields;
            });

          collection.push(entity);
        }
        return collection;
      })
    );

  }
}
