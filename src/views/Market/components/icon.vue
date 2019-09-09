<template>
<!-- 第三区：图标（带滑动)_iconListGetter -->
      <div class = "iconView">
         <van-swipe indicator-color="white">
            <van-swipe-item class="icon1" v-for="item in iconListGetter" :key="item.id"> <!-- 滑动：每页8个图标 -->
               <section class = "icon2" v-for="aIcon in item" :key="aIcon.id" @click = "goToDiner"> <!-- 每个独立图标 -->
                  <img :src="aIcon.iconImg" alt="img.jpg" />      <!-- 图标图片 -->
                  <span>{{aIcon.iconName}}</span>     <!-- 图标文字 -->
               </section>
            </van-swipe-item>
         </van-swipe>
      </div>
</template>

<script>
export default {
  name: 'icon',
  props: {
    iconListGetter:{
      type: Array
    }
  },
  methods:{
    goToDiner(){}
  }
}
</script>


<style lang="scss" scoped>
.iconView{                                         //第三区：图标（带滑动)_iconListGetter
   .icon1{                                   //滑动：每页8个图标
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
   }
   .icon2{                                   //每个独立图标
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-left: 15px;
      margin-right: 15px;
      width: 45px;
      height: 80px;
      img{                                   //图标图片
         width: 45px;
         height: 45px;
      }
      span{                                  //图标文字
         font-size:11px;
         color:rgba(51,51,51,1);
      }
   }
}
</style>