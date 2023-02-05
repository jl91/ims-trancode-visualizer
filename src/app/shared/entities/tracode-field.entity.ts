
export const tableName = "trancode_fields";
export const fields = ['id unique','fk_trancode', 'name', 'size'];
export class TrancodeFieldEntity {

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
