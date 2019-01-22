/**
 * @param {String} url
 * @description 从URL中解析参数
 */
export const getParams = (url: any) => {
  const keyValueArr = url.split('?')[1].split('&')
  let paramObj: any = {}
  keyValueArr.forEach((item: any) => {
    const keyValue = item.split('=')
    paramObj[keyValue[0]] = keyValue[1]
  })
  return paramObj
}

// 获取url后面的参数
export function getQueryString (name:String) {
  let reg:any = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  let r:any = window.location.search.substr(1).match(reg)
  if (r != null) {
      return (r[2])
  } else {
      return null
  }
}
