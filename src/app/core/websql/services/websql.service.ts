import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EnvConfig, SqliteJs } from 'websql-orm';

const databaseName: string = environment.webSql.database.name + "-database" as string;
@Injectable({
  providedIn: 'root'
})
export class WebsqlService {

  public static databaseConnectionInstance: Database;

  static WebsqlService: Observable<unknown>;

  constructor() {
    EnvConfig.enableDebugLog = true;
    EnvConfig.dateFormatRemoveMillisecond = true;
   }

   get databaseConnection(): Database {
    return WebsqlService.databaseConnectionInstance;
   }

  queryExecutor(
    query: string,
    values: any[],
    queryType: "select" | "other"
  ): Promise<SQLResultSet | SQLResultSetRowList> {

    console.info(`executing query: ${query} with values: `, values);

    return new Promise(
      (resolve, reject) => WebsqlService.databaseConnectionInstance.transaction((transaction: SQLTransaction) => {
        transaction.executeSql(
          query,
          values,
          // Success callback
          (internalTransaction: SQLTransaction, results: SQLResultSet) => {
            console.log("results of transaction", internalTransaction);
            console.log("results of transaction", results);
            return queryType == "select" ? resolve(results.rows): resolve(results);
          },
          // Error callback
          (transaction: SQLTransaction, error:  SQLError) => {
            console.error("error on execute transaction", transaction);
            console.error("error:", error);
            reject(error)
            return true;
          }
        );
      })
    );
  }

  createTable(tableName: string, fieldsNames: string[]): Observable<SQLResultSet> {
    const fields = fieldsNames.join(', ')
    const tableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (${fields})`;
   return from(this.queryExecutor(tableQuery, [], "other")) as Observable<SQLResultSet>;
  }

  save(
    tableName: string,
    data: {
      key: string,
      value: any
    }[]
   ): Observable<SQLResultSet> {

    const keys = data.map(element => element.key).join( ', ');
    const values = data.map(element => element.value);
    const preparedStatements = data.map(() => '?').join( ', ');
    const query = `INSERT INTO ${tableName} (${keys}) values (${preparedStatements})`;
    const promise = this.queryExecutor(query, values, "other");
    return from(promise) as Observable<SQLResultSet>;
  }

  findAll(
    tableName: string,
    page: number = 1,
    pageSize: number = 10,
    fields: string[],
    filters: {
      key: string,
      value: string | number
    }[]
  ): Observable<SQLResultSetRowList> {

    const fieldsData = fields.length > 0 ? fields.join( ', '): '*';

    const filtersQuery = filters.length > 0
    ? " WHERE " + filters.map(element => `${element.key} = ?`).join(' and ')
    : '';

    const values = [pageSize, page];

    const filtersValues = filters.length > 0 ? filters.map(element => element.value): [];

    const finalValues = [
      ...filtersValues,
      ...values
    ];

    const query = `SELECT ${fieldsData} FROM ${tableName} ${filtersQuery} LIMIT ? OFFSET ?`;

    const promise = this.queryExecutor(query, finalValues, "select");
    return from(promise) as Observable<SQLResultSetRowList>;
  }


}
