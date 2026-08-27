export function parseFavoriteIds(value: string): readonly string[] {
  try {
    const parsed: unknown = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    return [...new Set(parsed.filter((item): item is string => typeof item === "string" && /^[a-z0-9-]{1,100}$/i.test(item)))].slice(0, 500);
  } catch {
    return [];
  }
}
