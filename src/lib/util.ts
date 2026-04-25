export function mapRecord<K extends string, V1, V2>(
  input: Record<K, V1>,
  mapper: (value: V1, key: K) => V2,
): Record<K, V2> {
  const entries = Object.entries(input).map(([key, value]) => [key, mapper(value as V1, key as K)]);
  return Object.fromEntries(entries);
}
