
export const tableName = "trancode_fields";
export class TrancodeField {

  id: string | undefined;

  fk_trancode: string | undefined;

  name: string | undefined;

  size: number | undefined;

  toData(): {key: string, value: string | number | undefined}[]{
    return [
      {
        key: "id",
        value: this.id
      },
      {
        key: "fk_trancode",
        value: this.fk_trancode
      },
      {
        key: "name",
        value: this.name
      },
      {
        key: "size",
        value: this.size
      }
    ];

  }

}
