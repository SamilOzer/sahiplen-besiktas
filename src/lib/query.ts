export type QueryValue = string | string[] | undefined;

export function getQueryValue(value: QueryValue): string {
  return Array.isArray(value) ? (value[0] ?? "") : (value ?? "");
}
