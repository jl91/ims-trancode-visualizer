import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { map, Observable, Subscription, switchMap, tap } from 'rxjs';
import { ImportDatabaseModalComponent } from 'src/app/pages/trancode-mapper/import-database-modal/import-database-modal.component';
import { environment } from 'src/environments/environment';
import { TrancodesEntity, tableName as trancodeTableName } from '../entities/trancodes.entity';

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

  findAll(page: number = 0, pageSize: number = 10): Observable<TrancodesEntity[]> {
    return this.databaseService
    .getAll(trancodeTableName)
    .pipe(
      map(data => {
        const properlyPage = page ;
        const start = page * pageSize;
        const end = start + pageSize;
        return data.slice(start, end) as TrancodesEntity[];
      })
    );
  }

  delete(tracode: TrancodesEntity): Observable<any> {
    return this.databaseService.delete(trancodeTableName, tracode.id as number);
  }

  countTotalDatabaseItems(): Observable<number> {
    return this.databaseService.count(trancodeTableName);
  }

  importDatabase(database: string): boolean {

    const json: TrancodesEntity[] = JSON.parse(database);

    json.forEach(item => {
      const subscription: Subscription = this.save(item).subscribe(() => subscription.unsubscribe());
    });

    return true;
  }


}
