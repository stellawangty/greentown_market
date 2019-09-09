<template>
<div class = "market">
   <van-popup v-model="show">
      <Search @cancel="cancel" @onSearch="onSearch"/>
   </van-popup>
   <!-- 第一区：搜索+地图 -->
   <div class = "searchView">
      <div class="searchBox">      <!-- 整个搜索框 -->
         <section class = "search" @click="goToSearch">  <!-- 灰框 --> <!-- goToSearch -->
            <img src="../../assets/img_search.png" alt="search.jpg" />  <!-- 搜索图标 -->
            <section class = "word">大家都在搜：长峙岛美食</section>    <!-- 文字 -->
         </section>
         <img src="../../assets/icon_map.png" alt="map.jpg" />    <!-- 地图图片 -->
      </div>
   </div>
   <BaseView>              <!-- 首页下滑效果：在view1和view2间 -->
      <Scroll
        ref="scroll"
        class="scroll-market"
        :probeType="3"
        @pullingDown="onRefresh"
        >
   <div class="contentView">        <!-- 能下滑的所有区域 -->
   <!-- 第二区：滑动广告_bannerList -->
      <div class = "bannerView">
         <van-swipe :autoplay="3000" indicator-color="white" v-if="bannerList.length > 0">
            <van-swipe-item v-for="item in bannerList" :key="item.bannerImg">
               <img v-lazy="item.bannerImg" />     <!-- 广告图片 -->
            </van-swipe-item>
         </van-swipe>
      </div>

       <Icon :iconListGetter="iconListGetter"/>

      
      <!-- 第四区：优惠券广告 -->
      <div class = "adView">
         <img src="../../assets/img_couponbanner.png" alt="couponbanner.jpg" />  <!-- 优惠券图片 -->
      </div>

      <!-- 第五区："推荐商家" -->
      <div class = "wordView">
         <span>推荐商家</span>
      </div>

      <!-- 第六区：商家列表 -->
      <div class = "vendorView">
         <!-- 一个商家 -->
         <section class="shop" v-for="item in shopList" :key="item.id" @click="goToShop(item.id)">
            <img class = "shopImg" :src="item.shopImg" alt="shopImg.jpg" />      <!-- 商家图片 -->
            <span class = "VendorWord">               <!-- 商家文字区域 -->
               <section class = "sName">{{item.shopName}}</section>  <!-- 商家名字 -->
               <section class = "stickers">     <!-- 商家介绍 -->
                  <section class = "sticker1">{{item.shopType}}</section>  <!-- 商家类别 -->
                  <section class = "sticker2">活动</section>   <!-- “活动” -->
               </section>
               <section class = "coupon" v-if="item.couponsList && item.couponsList.length > 0">   <!-- 优惠券区 -->
                  <section class = "coupon1">优惠</section>    <!-- “优惠” -->
                     <section class = "coupon2">   <!-- 优惠券 -->
                        <section class = "aCoupon" v-for="aitem in item.couponsList" :key="aitem.id">
                           ¥{{aitem.preferential}}优惠券；</section>       <!-- 优惠券文字 -->
                     </section>
                  </section>
            </span>
         </section>
      </div>
   </div>
   </Scroll>
  </BaseView>
</div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import BaseView from '../../components/BaseView.vue'
import Scroll from '../../components/Scroll.vue'
import Search from './components/search.vue'
import Icon from './components/icon.vue'
// import Vendor from './components/vendor.vue' //vendor是另外一个页面



export default {
  name: 'market',
  data () {
    return {
      value: '',
      show: false
    }
  },
  components: {
    Search,
    BaseView,
    Scroll,
    Icon
  },
  computed: {
    ...mapState({
      bannerList: state => state.market.bannerList,
      iconList: state => state.market.iconList,
      shopList: state => state.market.shopList
    }),
    ...mapGetters('market', ['iconListGetter'])
  },
  methods: {
    ...mapActions('market', ['getBannerList', 'getIconList', 'getShopList']), // market actions
    onRefresh () {
       this.getShopList().then(()=>{
          this.$refs.scroll.forceUpdate(true)
       })
    },
    
    goToMap () {},
    goToShop (shopId) {             //跳转到vendor.vue, 接受参数是id
       this.$router.push({
         path: '/vendor',
         query: {
            id: shopId,
         }
       })
    },
    onSearch(){
    },
    onIcon(){},
    goToSearch () {              //点击后显示搜索页面
      this.show = true
    },
    cancel () {                  //点击后不显示搜索页面
      this.show = false
    },
    getNetwork(){
      this.getBannerList() // 调用action
      this.getIconList() // 调用Icon action, 触发icon接口请求
      this.getShopList()
    }

  },
  created () {
    this.getNetwork()
  }
}
</script>

<style lang="scss" scoped>
.scroll-market{
   height: calc(100% - 70px);
   overflow: hidden;
   margin-top: 70px;
}
.contentView{
   display: flex;
   flex-direction: column;
   padding: 0px 20px;
}
.searchView{                 //第一区：搜索+地图
   position: fixed;
   top: 0px;
   left: 0px;
   height: 60px;
   z-index: 2;
      .searchBox{                                    //整个搜索框
         display: flex;
         justify-content: space-between;
         align-items: center;
         padding:20px;
         .search{                                  //灰框
            display: flex;
            width: 300px;
            height: 30px;
            background:rgba(243,243,243,1);
            border-radius:15px;
            justify-content: center;
         img{                                      //搜索图标
            width: 14px;
            height: 14px;
            margin-top: 9px;
            margin-right: 5px;
         }
      .word{                                       //文字：大家都在搜
         height: 16.5px;;
         color:rgba(153,153,153,1);
         line-height:33px;
         font-size: 12px;
         }
      }
   }
      img{                                     //地图图片
         width: 16px;
         height: 27px;
         margin-left: 15px;
      }
}
.bannerView{                                        //第二区：滑动广告_bannerList
   margin-bottom: 20px
}

.adView{                                      //第四区：优惠券广告
   display: flex;
   height: 81.5px;
   margin-top: 10px;
   img{                                       //优惠券图片
      width: 100%
   }
}
.wordView{                                       //“推荐商家”
   width: 73px;
   height: 25px;
   margin-top: 20px;
   margin-bottom: 15px;
   font-family: PingFangSC-Medium;
   font-weight: 500;
   font-size: 18px;
   color: rgba(71,71,71,1);
}

.vendorView{                                         //第六区：商家列表
   display: flex;
   flex-direction: column;
   .shop{                                       //一个商家
      display: flex;
      width: 335px;
      justify-content: space-between;
      margin-bottom: 15px;
      .shopImg{                                 //商家图片
         width: 70px;
         height: 70px;
      }
      .VendorWord{                              //商家文字区域 
         display: flex;
         flex-direction: column;
         margin-left: 20px;
         padding-bottom: 15px;
         border-bottom: 1px solid #cecece;
         .sName{                                //商家名字
            width: 245px;
            height: 22.5px;
            font-size:16px;
            margin-bottom: 5px;
         }
         .stickers{                             //商家介绍
            display: flex;
            justify-content: flex-start;
            margin-bottom: 5px;
            .sticker1{                          //商家类别
               height: 14px;
               font-size: 10px;
               color: hsla(25, 31%, 55%, 1);
               margin-right: 3px;
            }
            .sticker2{                           //“活动”
               width: 20px;
               height: 14px;
               font-size: 10px;
               color: hsla(4, 74%, 51%, 1);
            }
         }
         .coupon{                               //优惠券区
            display: flex;
            width: 245px;
            .coupon1{                          //“优惠”
               width: 20px;
               height: 14px;
               font-size: 10px;
               color: hsla(1, 88%, 67%, 1);
               margin-right: 5px;
               margin-top: 2px;
            }
            .coupon2{                           //优惠券
            display: flex;
            width: 213px;
            flex-wrap: wrap;
            .aCoupon{                           //优惠券文字
               font-size: 12px;
               }
            }
         }
      }
   }
}

</style>

<style lang="scss">
.iconView{                             //手动把图标滑动点改色
   .van-swipe__indicator--active{
      background-color: red !important;
   }
}
.market{
   .van-overlay{                    //防止顶端出黑线
      background-color: unset !important;
   }
}
</style>
