function get (key: any): void {
  let result: any = localStorage.getItem(key)
  try {
    result = JSON.parse(result)
  } catch (e) {}
  return result
}
function set (key: any, value: any): void {
  let toString: any = Object.prototype.toString
  if (toString.call(value) === '[object Array]' || toString.call(value) === '[object Object]') {
    value = JSON.stringify(value)
  }
  return localStorage.setItem(key, value)
}
function remove (key: any): void {
  return localStorage.removeItem(key)
}
function clear (): void {
  return localStorage.clear()
}
export { get, set, remove, clear }
