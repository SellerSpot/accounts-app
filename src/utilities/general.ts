import { ArgumentsType } from 'typings/common.types';
import { isEqual } from 'lodash';

/**
 *
 * @param delay in seconds
 * @default
 * 4000
 */
export const introduceDelay = async (delay = 4000): Promise<boolean> =>
    new Promise((resolve) =>
        setTimeout(() => {
            resolve(true);
        }, delay),
    );

/**
 * simple memoizer which memoize the function of args up to depth 1
 */

export const simpleMemoize = <T extends (...args: unknown[]) => ReturnType<T>>(
    fn: T,
): ((...args: ArgumentsType<T>) => ReturnType<T>) => {
    let lastArgs: ArgumentsType<T>;
    let lastResult: ReturnType<T>;
    return (...args: ArgumentsType<T>) => {
        if (!isEqual(args, lastArgs)) {
            lastArgs = args;
            lastResult = fn(...args);
        }
        return lastResult;
    };
};

/**
 * regex sanitizer
 */

export const regexSanitizer = (regex: RegExp, value: string): string => {
    return value.replace(regex, '');
};
