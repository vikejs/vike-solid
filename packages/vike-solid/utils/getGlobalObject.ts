export function getGlobalObject<T extends Record<string, unknown> = never>(
  // We use the filename as key; each `getGlobalObject()` call should live inside a file with a unique filename.
  key: `${string}.ts`,
  defaultValue: T,
): T {
  // @ts-expect-error Property '_vike_solid' does not exist on type 'typeof globalThis'
  const globalObjectsAll = (globalThis[projectKey] = globalThis[projectKey] || {});
  const globalObject = (globalObjectsAll[key] = globalObjectsAll[key] || defaultValue);
  return globalObject;
}
const projectKey = "_vike_solid";
