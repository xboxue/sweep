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

export type DeepOmit<T, K> = T extends Primitive
  ? T
  : {
      [P in Exclude<keyof T, K>]: T[P] extends infer TP
        ? TP extends Primitive
          ? TP
          : DeepOmit<TP, K>
        : never;
    };

const omitDeep = (input: Record<string, unknown>, ...paths: string[]) => {
  const result = transform<typeof input, typeof input>(
    input,
    (acc, value, key) => {
      acc[key] = isPlainObject(value)
        ? omitDeep(value as Record<string, unknown>, ...paths)
        : value;
    },
    {}
  );

  return omit(result, ...paths);
};

export default omitDeep;
