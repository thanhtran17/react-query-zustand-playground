export function isEmpty(obj: Record<any, any> | undefined) {
  for (const x in obj) {
    return false;
  }
  return true;
}
