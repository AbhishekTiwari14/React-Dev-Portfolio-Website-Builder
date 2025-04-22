export function isArrayEmpty(arr: []) {
  if (arr.length === 0) return true
  for (const a of arr) {
    if (!a) continue
    else return false
  }
  return true
}
