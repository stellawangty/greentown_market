<template>

</template>

<script>
import MapLoader from '@/utils/remoteLoad.js'
import { mapKey } from '@/config.js'
import { Toast } from 'vant'
export default {
  name: 'amap',
  components: {

  },
  data () {
    return {
      amap: null
    }
  },
  computed: {

  },
  watch: {

  },
  methods: {
    initMap () {
      const _this = this
      // eslint-disable-next-line no-unused-vars
      let amap = _this.amap = window.AMap
      // eslint-disable-next-line no-undef
      const mapObj = new AMap.Map('iCenter')
      mapObj.plugin('AMap.Geolocation', function () {
        // eslint-disable-next-line no-undef
        const geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000
        })
        mapObj.addControl(geolocation)
        geolocation.getCurrentPosition()
        // eslint-disable-next-line no-undef
        AMap.event.addListener(geolocation, 'complete', onComplete)
        // eslint-disable-next-line no-undef
        AMap.event.addListener(geolocation, 'error', onError)
        function onComplete (data) {
          // data是具体的定位信息
          _this.$emit('amap_onComplete', data)
          Toast('成功')
        }
        function onError (data) {
          // 定位出错
          Toast('失败')
          console.log('amap error', data)
        }
      })
    }
  },
  async created () {
    // 已载入高德地图API，则直接初始化地图
    if (window.AMap) {
      this.initMap()
    // 未载入高德地图API，则先载入API再初始化
    } else {
      await MapLoader(`https://webapi.amap.com/maps?v=1.4.14&key=${mapKey}`)
      this.initMap()
    }
  }
}
</script>

<style scoped lang="less" >
</style>
