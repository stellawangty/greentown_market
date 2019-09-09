<template>
  <div class="header">
    <section class="h-title">
      <span class="h-t-text flex-text">车牌管理</span>
      <div class="h-t-rightView" @click="pushMine">
        <img src="./assets/icon_user.png" class="h-t-img"/>
        <span class="h-t-text">我的</span>
      </div>
    </section>
    <Scroll :scrollX="true" class="wrapper" ref="scroll" :eventPassthrough="eventPassthrough" :pullDownRefresh="false">
      <ul>
        <li v-for="item in cars" :key="item.vehiclelicense" @click="pushEditCar(item.vehiclelicense, item.id, item.isopennosencepay)">
          <img src="./assets/icon_cars.png"/>
          {{item.vehiclelicense}}
        </li>
        <li @click="addCars">
          <img src="./assets/icon_add.png"/>
          添加车辆
        </li>
      </ul>
    </Scroll>
  </div>
</template>

<script>

import Scroll from '@/components/Scroll.vue'
import utils, { isLogin } from '@/utils/util'
export default {
  name: 'home_header',
  props: {
    cars: {
      type: Array
    }
  },
  components: {
    Scroll
  },
  data () {
    return {
      eventPassthrough: 'vertical'
    }
  },
  computed: {

  },
  watch: {

  },
  methods: {
    // 解决better-scroll 横向滑动触发两次的问题
    scrollTwoClick (fuc) {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => fuc(), 0)
    },
    addCars () {
      if (utils.isWeiXinBrowser) {
        this.scrollTwoClick(() => {
          this.$router.push({
            path: 'editCars',
            query: {
              type: 'add'
            }
          })
        })
      } else {
        this.scrollTwoClick(() => {
          isLogin().then(() => {
            this.$router.push({
              path: 'editCars',
              query: {
                type: 'add'
              }
            })
          })
        })
      }
    },
    pushEditCar (vehiclelicense, id, isopennosencepay) {
      if (utils.isWeiXinBrowser) {
        this.scrollTwoClick(() => {
          this.$router.push({
            path: 'editCars',
            query: {
              type: 'edit',
              vehiclelicense,
              id,
              isopennosencepay
            }
          })
        })
      } else {
        this.scrollTwoClick(() => {
          isLogin().then(() => {
            this.$router.push({
              path: 'editCars',
              query: {
                type: 'edit',
                vehiclelicense,
                id,
                isopennosencepay
              }
            })
          })
        })
      }
    },
    checkLogin () {
      this.$store.dispatch('wechat/login')
    },
    pushMine () {
      this.$router.push({ path: 'demo' })
    }
  },
  onLoad () {

  }
}
</script>

<style scoped lang="less" >

.header{
  display: flex;
  flex-direction: column;
  background-image: url("./assets/img_bg.png");
  background-repeat:no-repeat;
  background-size:100% 100%;
  padding: 20px;
  .h-title{
    display: flex;
    justify-content: space-between;
  }
  .h-t-img{
    width: 20px;
    height: 20px;
    padding-right: 5px;
  }
  .h-t-text{
    font-size: 14px;
    color: #FFFFFF;
  }
  .h-t-rightView{
    display: flex;
    align-items: center;
  }
  .flex-text{
    flex: 1;
  }
  .wrapper{
    overflow: hidden;
    margin-top: 20px;
    margin-bottom: 20px;
    display: flex;
    ul{
      display: flex;
      // box-shadow: -20px -2px 15px -13px #cecece inset;
      li{
      display: flex;
      align-items: center;
      justify-content: center;
      background: #FFFFFF;
      border: 1px solid #F3F3F3;
      box-shadow: 0 1px 5px 0 rgba(126,135,150,0.20);
      border-radius: 5px;
      width: 123px;
      height: 65px;
      font-family: DINAlternate-Bold;
      font-size: 14px;
      color: #333333;
      margin-right: 15px;
      img{
        width: 18px;
        height: 15px;
        margin-right: 10px;
      }
    }
    li:last-child{
      font-family: PingFangSC-Regular;
        img{
          height: 18px;
        }
      }
    }
  }
}
</style>
