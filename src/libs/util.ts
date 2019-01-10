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