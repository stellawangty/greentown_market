<template>
  <BaseView>
      <!-- <Amap v-if="!isWeiXinBrowser" @amap_onComplete="amap_onComplete"/> -->
      <Floating />
      <Scroll
        ref="scroll"
        class="scroll-home"
        :probeType="3"
        :pullUpLoad="true"
        @pullingDown="onRefresh"
        @pullingUp="onLoad"
      >
          <div class="contantView">
            <Header :cars="userInfo.uservehiclesList"></Header>
            <span class="c-parkingText">停车场</span>
            <ParkingList :items="listData" @goToMap="goToMap" @cancelOrder="cancelOrder" @order="order"></ParkingList>
          </div>
          <template v-slot:pullup>
            <Content :name="'home'" />
          </template>
      </Scroll>
  </BaseView>
</template>

<script>
// @ is an alias to /src
import BaseView from '@/components/BaseView.vue'
import { mapState, mapGetters, mapActions } from 'vuex'
import Content from '@/components/ContentLoader.vue'
import Header from './components/Header.vue'
import ParkingList from './components/ParkingList.vue'
// import Amap from '@/components/Amap.vue'
import Floating from '@/components/Floating.vue'
import Scroll from '@/components/Scroll.vue'
import utils, { isLogin } from '@/utils/util'
import JSBridge from 'gtjsbridge'

export default {
  name: 'home',
  components: {
    BaseView,
    Header,
    ParkingList,
    Content,
    // Amap,
    Floating,
    Scroll
  },
  data () {
    return {
      show: false,
      // isWeiXinBrowser: utils.isWeiXinBrowser,
      latitudeInfo: 0, // to latitude
      longitudeInfo: 0, // to longitude
      // scrollbar: {
      //   fade: true,
      //   interactive: false // 1.8.0 新增 better-scroll 滚动条
      // },
      h5_lat: 0, // h5定位当前纬度
      h5_lng: 0 // h5定位当前经度
    }
  },
  computed: {
    // Getting Vuex State from store/modules/home
    ...mapState({
      listData: state => state.home.listData,
      page: state => state.home.page,
      pageNumber: state => state.home.pageNumber,
      latitude: state => state.wechat.latitude, // 微信当前定位
      longitude: state => state.wechat.longitude, // 微信当前定位
      userInfo: state => state.home.userInfo,
      loading: state => state['@@loading'].effects['home/loadMore']
    }),

    ...mapGetters({

    })
  },
  watch: {
    loading (val) {
      if (val) {
        this.$toast.loading({
          duration: 0,
          forbidClick: true,
          message: '加载中...'
        })
      } else {
        this.$toast.clear()
      }
    }
  },
  methods: {
    ...mapActions('home', ['getUserInfo', 'cancelReservation', 'cancelQuery']),
    ...mapActions('wechat', ['getWechatUserInfo', 'initSdk', 'openLocation']),
    // onLoad 加载数据
    onLoad () {
      this.requestData('loadMore')
    },
    requestData (type) {
      return new Promise((resolve, reject) => {
        const { page, longitude, latitude } = this
        this.$store.dispatch('home/loadMore', {
          type,
          page: type === 'refresh' ? 1 : page,
          longitude: utils.isWeiXinBrowser ? (longitude !== 0 ? longitude.toString() : null) : (this.h5_lng !== 0 ? this.h5_lng.toString() : null),
          latitude: utils.isWeiXinBrowser ? (latitude !== 0 ? latitude.toString() : null) : (this.h5_lat !== 0 ? this.h5_lat.toString() : null),
          rows: '10'
        }).then(() => {
          if (this.page > this.pageNumber) {
            this.$refs.scroll.forceUpdate(false)
            return
          }
          this.$refs.scroll.forceUpdate(true)
        }).catch(() => {
          this.$refs.scroll.forceUpdate(true)
        })
      })
    },
    onRefresh () {
      this.requestData('refresh')
    },
    cancelOrder (id) {
      this.cancelQuery({ id }).then((res) => {
        this.$dialog.confirm({
          title: '取消预约',
          message: `您已预约${res.data.time}分钟，本次预约收取${res.data.money}元，将从预约费用中扣除，剩余金额原路返回`
        }).then(() => {
          this.cancelReservation({ id }).then(() => {
            this.initView()
          })
        }).catch(() => {
          console.log('取消')
        })
      })
    },
    order (parkNo) {
      if (utils.isWeiXinBrowser) {
        this.$router.push({ path: 'reservation', query: { parkNo } })
      } else {
        isLogin().then(() => {
          this.$router.push({ path: 'reservation', query: { parkNo } })
        })
      }
    },
    goToMap (longitude, latitude, name, address) {
      // 验证是否在微信中
      if (utils.isWeiXinBrowser) {
        this.openLocation({ longitude, latitude, name, address })
        return
      }
      // 终点位置坐标
      const params = {
        dlat: latitude,
        dlon: longitude,
        dname: address
      }
      const bridge = new JSBridge()
      const callGaoDeMap = bridge.invokeNative('', 'callGaoDeMap')
      callGaoDeMap({ ...params }, (res) => {
        window.location.href = `http://uri.amap.com/navigation?from=${this.h5_lng},${this.h5_lat},startpoint&to=${longitude},${latitude},endpoint&mode=car&policy=1&src=mypage&coordinate=gaode&callnative=0`
      })
    },
    getLocation () {
      const bridge = new JSBridge()
      const getAppLocation = bridge.invokeNative('', 'getAppLocation')
      getAppLocation({}, (long, lat) => {
        this.h5_lng = long
        this.h5_lat = lat
        this.onRefresh()
      })
    },
    initView () {
      this.onRefresh()
      // 在微信中
      this.getWechatUserInfo().then(() => {
        this.onRefresh()
        this.getUserInfo()
      })
      // 在微信中
      if (utils.isWeiXinBrowser) {
        this.initSdk({ type: 'home' }).then(() => {
          this.onRefresh()
        })
      } else {
        // 在app中 通过token获取customerId, 并进行登录操作
        isLogin().then((res) => {
          // 获取车牌信息
          this.getUserInfo()
        })
        // 获取定位信息 并请求onRefresh
        this.getLocation()
      }
    }
  },
  mounted () {
    this.initView()
  }
}
</script>
<style scoped lang="scss">
.animation{
  position:relative
}
.scroll-home{
  height: 100%;
  overflow: hidden;
  .contantView{
    display: flex;
    flex-direction: column;
    .c-parkingText{
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #333333;
        margin-left: 20px;
        margin-top: 20px;
    }
    .parking-list{
      display: flex;
      flex-direction: column;
    }
  }
}

</style>
<style lang="scss">
  // .van-action-sheet__cancel{
  //   color: red !important
  // }
</style>
