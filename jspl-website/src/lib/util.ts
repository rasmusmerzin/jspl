export function mapRecord<K extends string, V1, V2>(
  input: Record<K, V1>,
  mapper: (value: V1, key: K) => V2,
): Record<K, V2> {
  const entries = Object.entries(input).map(([key, value]) => [key, mapper(value as V1, key as K)]);
  return Object.fromEntries(entries);
}

export function throttle<A extends any[], T>(
  fn: (...args: A) => T,
  ms: number,
): (...args: A) => T | void {
  let last = 0;
  let timeout: any;
  return function throttled(...args: A): T | void {
    const now = Date.now();
    const elapsed = now - last;
    if (elapsed < ms) {
      clearTimeout(timeout);
      timeout = setTimeout(throttled, ms - elapsed, ...args);
      return;
    }
    last = now;
    return fn(...args);
  };
}
