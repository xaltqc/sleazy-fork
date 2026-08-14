import type { AnyFunction } from '../../types';

export interface MemoizedFunction<T extends AnyFunction> extends CallableFunction {
  (...args: Parameters<T>): ReturnType<T>;
  clear: () => void;
}

export function memoize<T extends AnyFunction>(fn: T): MemoizedFunction<T> {
  const cache = new Map<string, ReturnType<T>>();

  const memoizedFunction = ((...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);
    return cache.getOrInsertComputed(key, () => fn(...args));
  }) as MemoizedFunction<T>;

  return memoizedFunction;
}
