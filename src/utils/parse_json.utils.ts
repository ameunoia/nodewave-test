export function parseJsonQuery<T>(value?: unknown): T | undefined {
  if (!value) return undefined;
  if (typeof value !== "string") return undefined;

  try {
    return JSON.parse(value) as T;
  } catch {
    throw new Error("Invalid JSON query parameter");
  }
}
