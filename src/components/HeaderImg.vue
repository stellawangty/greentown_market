<template>
  <section class="c-v-topImg">
    <div class="user-icon" v-if="showMine" @click="pushMine">
      <img class="h-t-img" src="../views/Home/components/assets/icon_user.png" />
      <span class="h-t-text">我的</span>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'headerImg',
  props: {
    showMine: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapActions('wechat', ['checkUserInfoComplete'])
  },
  components: {

  },
  data () {
    return {

    }
  },
  watch: {

  },
  methods: {
    pushMine () {
      this.$store.dispatch('wechat/checkUserInfoComplete')
      this.$router.push({ path: 'mine' })
    }
  },
  created () {

  }
}
</script>

<style scoped lang="less" >
.c-v-topImg{
  background-image: url('../views/Reservation/assets/img_samllbg.png');
  background-size: cover;
  width: 100%;
  height: 164px;
  .user-icon{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 20px 0px 20px;
    .h-t-img{
      width: 20px;
      height: 20px;
      padding-right: 5px;
    }
    .h-t-text{
      font-size: 14px;
      color: #FFFFFF;
    }
  }
  .user-icon::before{
    content: '';
    flex: 1;
  }
}
</style>
