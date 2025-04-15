export function IsObjectEmpty(obj: { [key: string]: unknown }) {
  for (const key in obj) {
    const value = obj[key]
    if (
      value === null ||
      value === undefined ||
      value === "" ||
      (Array.isArray(value) && value.length === 0)
    )
      continue
    else return false
  }
  return true
}
