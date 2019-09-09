<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive :include="data">
          <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      transitionName: ''
    }
  },
  computed: {
    // 数据存放在vuex里面
    ...mapState({
      data: state => {
        return state.global.data
      }
    })
  },
  methods: {
    // 设置Keep_alive路由
    setKeep_alive (to) {
      if (to.meta.keepAlive) {
        this.$store.dispatch({
          type: 'global/setData',
          payload: to.name
        })
      }
    }
  },
  watch: {
    '$route' (to, from) {
      // 此时从from页面跳转到to页面
      this.setKeep_alive(to)
      const routeDeep = ['/', '/list', '/detail', '/reservation', '/editCars', '/addSuccess', '/cardView', '/mine', '/carManage', '/feeRecord', '/feeDetail', '/scanQRCode', '/quickCar']
      const toDepth = routeDeep.indexOf(to.path)
      const fromDepth = routeDeep.indexOf(from.path)
      if (!from.name) {
        this.transitionName = 'fold'
        return
      }
      this.transitionName = toDepth > fromDepth ? 'fold-left' : 'fold-right'
    }
  },
  created () {

  }
}
</script>
>
<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #fff;
  -webkit-user-select: none;
 -moz-user-select: none;
 -khtml-user-select: none;
  user-select: none;
}
*{
  margin:0;
  padding:0;
}
html,body{
  width:100%;
  height:100%;
}
ul{list-style:none}
a{text-decoration: none;}
img{vertical-align:top;border:none}

.clearf:after,
.clearf:before{
    content:"";
    display:block;
    clear:both;
}
.fold-left-enter-active {
  animation-name: fold-left-in;
  animation-duration: .2s;
}
.fold-left-leave-active {
  animation-name: fold-left-out;
  animation-duration: .2s;
}
.fold-right-enter-active {
  animation-name: fold-right-in;
  animation-duration: .2s;
}
.fold-right-leave-active {
  animation-name: fold-right-out;
  animation-duration: .2s;
}
@keyframes fold-left-in {
    0% {
      transform: translate3d(100%, 0, 0);
    }
    100% {
      transform: translate3d(0, 0, 0);
    }
  }
  @keyframes fold-left-out {
    0% {
      transform: translate3d(0, 0, 0);
    }
    100% {
      transform: translate3d(-100%, 0, 0);
    }
  }
  @keyframes fold-right-in {
    0% {
      transform: translate3d(-100%, 0, 0);
    }
    100% {
      transform: translate3d(0, 0, 0);
    }
  }
  @keyframes fold-right-out {
    0% {
      transform: translate3d(0, 0, 0);
    }
    100% {
      transform: translate3d(100%, 0, 0);
    }
  }
</style>
