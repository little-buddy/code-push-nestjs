import 'source-map-support/register';

declare global {
  // ***************************************
  export type ResBody = { hash: string };
  export type ResInfo = { statusCode: number };
  export type ResError = { message: string };
  // ***************************************

  export type ObjectValue<T> = Record<string, T>;

  export type JSONValue =
    | string
    | number
    | boolean
    | null
    | JSONObject
    | JSONArray;

  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions, @typescript-eslint/consistent-indexed-object-style
  export type JSONObject = {
    [key: string]: JSONValue;
  };
  export type JSONArray = JSONObject[];

  export type Uuid = string & { _uuidBrand: undefined };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-redundant-type-constituents
  export type Todo = any & { _todoBrand: undefined };
}
