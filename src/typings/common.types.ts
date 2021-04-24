export type TPrimitiveType = string | number;

// export const infertTypesFromObject = <T = { [key: string]: string }>(arg: T): T => arg; // Infering types from Route object with autocomplete support.
export const infertTypesFromObject = <T extends { [key: string]: RegExp }>(arg: T): T => arg; // Infering types from Route object with autocomplete support.

export type TUnknownFucntion = (...args: unknown[]) => unknown;

export type ArgumentsType<T extends (...args: unknown[]) => unknown> = T extends (
    ...args: infer A
) => unknown
    ? A
    : never;
