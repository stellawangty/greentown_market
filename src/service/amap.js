import { get } from './index'

// 高德地图逆编码
const getLocationInfo = `${process.env.VUE_APP_API_WECHAT_ENV}/api/weiXinAuth/getAddressInfo`
export const getLocationInfoApi = function (json) {
  return get(`${getLocationInfo}`, json)
}
