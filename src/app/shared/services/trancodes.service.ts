import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { map, Observable, Subscription, switchMap } from 'rxjs';
import { ImportDatabaseModalComponent } from 'src/app/pages/trancode-mapper/import-database-modal/import-database-modal.component';
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

  importDatabase(database: string): boolean {

    const json: TrancodesEntity[] = JSON.parse(database);

    json.forEach(item => {
      const subscription: Subscription = this.save(item).subscribe(() => subscription.unsubscribe());
    });

    return true;
  }


}
