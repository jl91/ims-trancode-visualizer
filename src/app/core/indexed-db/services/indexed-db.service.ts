import { Injectable } from '@angular/core';
import { NgxIndexedDBService, ObjectStoreMeta } from 'ngx-indexed-db';
import { tableName as trancodeTableName} from 'src/app/shared/entities/trancodes.entity';
@Injectable({
  providedIn: 'root'
})
export class IndexcedDBService {

  constructor(
    private ngxIndexedDBService: NgxIndexedDBService
  ) {
  }

  public configureDatabase() {
    const storeSchema: ObjectStoreMeta = {
      store: trancodeTableName,
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'name', keypath: 'name', options: { unique: false } },
        { name: 'label', keypath: 'label', options: { unique: false } },
        { name: 'fields', keypath: 'fields', options: { unique: false } },
      ]
    };

    this.ngxIndexedDBService.createObjectStore(storeSchema);
  }

}
