import { TrancodeField } from "./tracode-field.entity";

export const tableName = "tracodes";

export class TrancodesEntity {

  id: string | undefined;

  name: string | undefined;

  label: string | undefined;

  fields: TrancodeField[] | undefined;


  toData(): {key: string, value: string | undefined}[]{
    return [
      {
        key: "id",
        value: this.id
      },
      {
        key: "name",
        value: this.name
      },
      {
        key: "label",
        value: this.label
      },
    ];
  }

}
