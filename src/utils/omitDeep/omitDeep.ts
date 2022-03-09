import { isPlainObject, omit, transform } from "lodash";

// https://stackoverflow.com/questions/55539387/deep-omit-with-typescript
type Primitive =
  | string
  | Function
  | number
  | boolean
  | Symbol
  | undefined
  | null;

export type DeepOmitArray<T extends any[], K> = {
  [P in keyof T]: DeepOmit<T[P], K>;
};

export type DeepOmit<T, K> = T extends Primitive
  ? T
  : {
      [P in Exclude<keyof T, K>]: T[P] extends infer TP
        ? TP extends Primitive
          ? TP
          : TP extends any[]
          ? DeepOmitArray<TP, K>
          : DeepOmit<TP, K>
        : never;
    };

type Input = Record<string, unknown> | unknown[];

const omitDeep = (input: Input, ...paths: string[]) => {
  if (Array.isArray(input)) {
    const result: unknown[] = input.map((element) => {
      if (Array.isArray(element) || isPlainObject(element))
        return omitDeep(element as Input, ...paths);

      return element;
    });

    return result;
  }

  if (isPlainObject(input)) {
    const result = transform<typeof input, typeof input>(
      input,
      (acc, value, key) => {
        if (Array.isArray(value) || isPlainObject(value)) {
          acc[key] = omitDeep(value as Input, ...paths);
        } else {
          acc[key] = value;
        }
      },
      {}
    );

    return omit(result, ...paths);
  }

  return input;
};

export default omitDeep;
