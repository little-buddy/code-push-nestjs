/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
declare global {
  export type Uuid = string & { _uuidBrand: undefined };

  export type Todo = unknown & { _todoBrand: undefined };
}
