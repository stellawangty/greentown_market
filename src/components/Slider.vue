<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot name="sliderItem"></slot>
    </div>
    <div class="dots" v-if="this.dots">
        <span :class="`dot ${index === currentPageIndex ? 'active' :'' }`" v-for="(item,index) in newLength" :key="index"></span>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'slider',
  props: {
    width: {
      type: Number,
      default: 300
    },
    loop: {
      type: Boolean,
      default: false
    },
    length: {
      type: Number,
      default: 0
    },
    dots: {
      type: Boolean,
      default: true
    },
    previous_margin: {
      type: Number,
      default: 0
    },
    next_margin: {
      type: Number,
      default: 0
    },
    currentPageIndex: {
      type: Number,
      default: 0
    }
  },
  components: {

  },
  data () {
    return {
      slider: null,
      timer: null,
      newLength: 0
    }
  },
  computed: {

  },
  watch: {
    length: {
      handler (val) {
        this.newLength = val
        const _this = this
        _this.destroy()
        _this.$nextTick(() => {
          _this._initSliderWidth()
          _this._initSlider()
          if (_this.autoPlay) {
            _this._play()
          }
        })
      },
      immediate: true
    }
  },
  methods: {
    // 代理better-scroll的goToPage方法
    goToPage () {
      this.slider && this.slider.goToPage.apply(this.slider, arguments)
    },
    // 代理better-scroll的getCurrentPage方法
    getCurrentPage () {
      return this.slider && this.slider.getCurrentPage()
    },
    // 代理better-scroll的destroy方法
    destroy () {
      if (this.slider) {
        this.slider && this.slider.destroy()
      }
    },
    /**
   * @name _initSliderWidth
   * @description 初始化slider容器Width
   * @author xty
   */
    _initSliderWidth () {
      const itemWidth = this.width + this.previous_margin + this.next_margin
      let sliderWidth = itemWidth * this.newLength
      if (this.loop) {
        // 循环轮播需要添加两个item DOM 的宽度
        sliderWidth += itemWidth * 2
      }
      this.$refs.sliderGroup.style.width = sliderWidth / 16 + 'rem'
    },
    /**
     * @name _initSlider
     * @description 初始化 better-scroll
     * @author xty
     */
    _initSlider () {
      const _this = this
      _this.slider = new BScroll(_this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        click: true,
        snap: {
          loop: this.loop, // 循环
          threshold: 0.1
        }
      })
      // 获取当前页
      _this._getCurrentPageIndex()
      // 滚动之前 清除timer
      _this.slider.on('beforeScrollStart', () => {
        clearInterval(_this.timer)
      })
    },
    /**
     * @name _getCurrentPageIndex
     * @description 获取当前的 pageIndex
     * @author xty
     */
    _getCurrentPageIndex () {
      const _this = this
      _this.slider.on('scrollEnd', () => {
        let index = _this.slider.getCurrentPage().pageX
        _this.$emit('getIndex', index)
        // 如果自动播放 则开启
        if (_this.autoPlay) {
          _this._play()
        }
      })
    },
    /**
     * @name _play
     * @description 控制自动轮播
     * @author postbird
     */
    _play () {
      const _this = this
      let pageIndex = _this.currentPageIndex
      _this.timer = setInterval(() => {
        pageIndex++
        if (pageIndex >= _this.newLength) {
          pageIndex = 0
        }
        _this.slider.goToPage(pageIndex)
      }, this.speed)
    }
  },
  created () {

  },
  mounted () {
    // $nextTick() 是 vue 提供的钩子，主要是确保 DOM 已经全部挂载完在调用下面的方法
    // 还可以通过 setIimeout 来实现
    // 发现使用 this.$nectTick() 存在问题，因此使用了 settimeout 20ms 的方法
  }
}
</script>

<style scoped lang="less" >
.slider {
  position: relative;
  min-height: 420px;
  margin: -60px 0px 20px 0px;
}
.slider .slider-group {
  position: relative;
  overflow: hidden;
  white-space: nowrap;
}
.slider .slider-group .slider-item img {
  display: block;
  width: 100%;
  height: 250px;
}
.slider .dots {
  position: absolute;
  right: 0;
  left: 0;
  bottom: -20px;
  text-align: center;
  font-size: 0;
}
.slider .dot {
  display: inline-block;
  margin: 0 4px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #dfdfdf;
}
.slider .dot.active {
  width: 6px;
  border-radius: 50%;
  background: #F56361;
}
</style>
