<template>
  <div class="contentLoader">
    <div class="content">
      <ContentLoader :height="250">
        <rect x="14" y="19.8" rx="0" ry="0" width="96.2" height="21" />
        <rect x="12" y="48.8" rx="0" ry="0" width="172.57" height="28" />
        <rect x="127" y="19.8" rx="0" ry="0" width="55.5" height="21" />
        <rect x="298" y="33.8" rx="0" ry="0" width="74" height="26.25" />
        <rect x="12" y="94.8" rx="0" ry="0" width="88.8" height="89.25" />
        <rect x="127" y="94.8" rx="0" ry="0" width="55.5" height="21" />
        <rect x="126" y="128.8" rx="0" ry="0" width="55.5" height="21" />
        <rect x="194" y="94.8" rx="0" ry="0" width="55.5" height="21" />
        <rect x="193" y="130.8" rx="0" ry="0" width="55.5" height="21" />
        <rect x="126" y="164.8" rx="0" ry="0" width="31.63" height="21" />
        <rect x="178" y="164.8" rx="0" ry="0" width="31.63" height="21" />
        <rect x="11" y="196.8" rx="0" ry="0" width="96.2" height="25.83" />
      </ContentLoader>
    </div>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'

export default {
  name: 'contentLoader',
  props: {
    name: {
      type: String
    }
  },
  components: {
    ContentLoader
  },
  data () {
    return {

    }
  },
  computed: {

  },
  watch: {

  },
  methods: {

  },
  onLoad () {

  }
}
</script>

<style scoped lang="less" >
.contentLoader{

}
.content{
  margin: 10px 20px 20px 20px;
  box-shadow: 0 1px 5px 0 rgba(126,135,150,0.30);
}
</style>
