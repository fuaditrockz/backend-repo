export function isObjEmpty(obj: any | null) {
  if (obj !== null || null) {
    return Object.keys(obj ?? {}).length === 0;
  } else {
    return true;
  }
}
