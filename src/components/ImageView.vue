/*
 components: ImageView
  parameter:{
    imgUrlProps: 图片url
    width: 图片宽度
    height: 图片高度
    preView: 是否添加预览功能
    preViewImgData: 预览图片数组(应与preview绑定使用)
  }
 */
<template>
  <div v-if="width">
    <img :src="imgUrlProps" :style="{background:'#cecece',width: imgWidth/16 + 'rem' , height: imgHeight/16 + 'rem'}" alt="img" v-lazy="imgUrlProps" @click="onPreView()"/>
  </div>
  <div v-else>
    <img :src="imgUrlProps" :style="{background:'#cecece',width: '100%',}" alt="img" v-lazy="imgUrlProps" />
  </div>
</template>

<script>
// @ is an alias to /src
// import { mapState } from 'vuex'
import { ImagePreview } from 'vant'

export default {
  name: 'imageView',
  props: {
    imgUrlProps: String,
    width: Number,
    height: Number,
    preView: Boolean,
    preViewImgData: Array
  },
  components: {

  },
  data () {
    return {
      imgUrl: this.imgUrlProps,
      imgWidth: this.width,
      imgHeight: this.height,
      isPreView: this.preView,
      preViewData: this.preViewImgData
    }
  },
  computed: {

  },
  watch: {
    imgUrlProps (val) {
      this.imgUrl = val
    },
    width (val) {
      this.imgWidth = val
    },
    height (val) {
      this.imgHeight = val
    },
    preView (val) {
      this.isPreView = val
    },
    preViewImgData (val) {
      this.preViewData = val
    }
  },
  methods: {
    onPreView () {
      const { isPreView, preViewData } = this
      if (!isPreView || !preViewData) {
        return
      }
      ImagePreview({
        images: preViewData,
        startPosition: 0,
        showIndicators: true,
        loop: false,
        showIndex: false,
        onClose () {
          // do something
        }
      })
    }
  },
  created () {

  }
}
</script>
<style scoped lang="scss">

</style>
