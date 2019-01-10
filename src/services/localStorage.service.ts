export default {
  get (key: any) {
    let result: any = localStorage.getItem(key)
    try {
      result = JSON.parse(result)
    } catch (e) {}
    return result
  },
  set (key: any, value: any) {
    let toString: any = Object.prototype.toString
    if (toString.call(value) === '[object Array]' || toString.call(value) === '[object Object]') {
      value = JSON.stringify(value)
    }
    return localStorage.setItem(key, value)
  },
  remove (key: any) {
    return localStorage.removeItem(key)
  },
  clear () {
    return localStorage.clear()
  }
}