import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { map, Observable, switchMap } from 'rxjs';
import { TrancodesEntity, tableName as trancodeTableName} from '../entities/trancodes.entity';

@Injectable({
  providedIn: 'root',
})
export class TrancodesService {
  constructor(
    private databaseService: NgxIndexedDBService
  ) {
  }

  save(trancode: TrancodesEntity): Observable<TrancodesEntity> {
    return this.databaseService.add(trancodeTableName, trancode);
  }

  update(trancode: TrancodesEntity): Observable<TrancodesEntity> {
    return this.databaseService.update(trancodeTableName, trancode);
  }

  findAll(page: number = 0, pageSize: number = 10): Observable<any> {
    return this.databaseService.getAll(trancodeTableName);
  }

  delete(tracode: TrancodesEntity): Observable<any> {
    return this.databaseService.delete(trancodeTableName, tracode.id as number);
  }
}
