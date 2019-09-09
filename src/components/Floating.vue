<!--
 * @Description: 浮窗
 * @Author: xty
 * @Date: 2019-05-13 19:05:54
 * @LastEditTime: 2019-05-23 15:00:42
 * @LastEditors: Please set LastEditors
 * @reservation: v-pressMove="{methods: pressMove, arg: {index:5,item:'pressMove'}}" //是否给浮标添加move
 * @tap: v-tap="{methods: tap, arg: {index:1,item:'tap'}}"
 -->

<template>
  <a
  :style="floatStyle"
  class="floating"
  ref="floating"
  @click="tap"
  />
</template>

<script>

export default {
  name: 'floating',
  props: {

  },
  components: {

  },
  data () {
    return {
      left: 0,
      top: 0,
      scale: 1,
      angle: 0,
      initScale: 1,
      msg: '',
      arg: { index: 10, item: 'pinch' },
      widthScreen: document.documentElement.clientWidth,
      heightScreen: document.documentElement.clientHeight,
      setLeft: 0,
      setTop: 0,
      setRight: 0,
      setBottom: 0,
      phone: 10086
    }
  },
  computed: {
    floatStyle () {
      var self = this
      var tempObj = {
        transform: 'translate3d(' + self.left + 'px, ' + self.top + 'px, 0) scale(' + self.scale + ') rotate(' + self.angle + 'deg)'
      }
      return tempObj
    }
  },
  watch: {

  },
  methods: {
    pressMove (e, args) {
      var self = this
      console.log(self.setLeft, self.setTop, self.setRight, self.setBottom)
      console.log('self.left==', self.left)
      console.log('self.top==', self.top)
      if ((self.left - 1) < -(self.setLeft)) {
        self.left = -(self.setLeft)
        return
      }
      if ((self.left - 1) > (self.setRight)) {
        self.left = self.setRight
        return
      }
      if ((self.top - 1) < -(self.setTop)) {
        self.top = -(self.setTop)
        return
      }
      if ((self.top - 1) > (self.setBottom)) {
        self.top = self.setBottom
        return
      }
      console.log('1')
      self.msg = 'pressMove'
      self.left += e.deltaX
      self.top += e.deltaY
    },
    tap () {
      var self = this
      window.location.href = `tel:${self.phone}`
      self.msg = 'tap'
    }
  },
  mounted () {
    const self = this
    self.setLeft = self.$refs.floating.offsetLeft
    self.setTop = self.$refs.floating.offsetTop
    const a = self.$refs.floating.getBoundingClientRect()
    self.setRight = document.documentElement.clientWidth - self.$refs.floating.offsetWidth - self.setLeft
    self.setBottom = document.documentElement.clientHeight - self.$refs.floating.offsetWidth - self.setTop
  },
  created () {

  }
}
</script>

<style scoped lang="less" >
.floating{
  position: fixed;
  right: 20px;
  bottom: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background-image: url('./assets/icon_callin.png');
  background-size: cover;
  z-index: 2;
}
</style>
