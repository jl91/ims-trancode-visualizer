import { TrancodeFieldEntity } from "./tracode-field.entity";

export const tableName = "trancodes";

export class TrancodesEntity {

  id: number | undefined;

  name: string | undefined;

  label: string | undefined;

  fields: TrancodeFieldEntity[] = [];

}
