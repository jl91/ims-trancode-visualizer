import { TrancodeFieldEntity } from "./tracode-field.entity";

export const tableName = "tracodes";

export const fields = ['id unique', 'name', 'label'];

export class TrancodesEntity {

  id: string | undefined;

  name: string | undefined;

  label: string | undefined;

  fields: TrancodeFieldEntity[] = [];


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
