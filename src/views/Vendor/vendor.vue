
<template>
<div class = "Vendor"> <!-- 页面大小 = 用户页面大小 -->
  
  <div class="forALine"></div>

  <div class="topBlock">
    
    <section class = "shop" >
      <img class = "shopImg" :src="aVendor.shopImg" alt="shopImg.jpg" />     
        <span class = "VendorWord">               
          <section class = "sName" >{{aVendor.shopName}}</section>  
          <section class = "stickers">     
            <section class = "sticLeft">  
              <section class = "sticker1Bar"> 
                <section class = "sticker1">{{aVendor.shopType}}</section> 
              </section>
              <section class = "sticker2Bar">  
                <section class = "sticker2">活动</section>  
              </section>  
            </section>
            <section :class="[aVendor.isFollower && aVendor.isFollower !== 0 ? null : activeClass, follow]" >         
              {{aVendor.isFollower && aVendor.isFollower !== 0 ? '已关注' : '关注商家'}}
            </section>           
          </section>
         </span>
    </section>
    
    <section class = "introWord">店铺介绍</section>

    <section class = "introduction">{{aVendor.shopIntroduce}}</section>

    <section class = "time">
      <img src="../../assets/icon_time.png" alt="clock.jpg" />
      <section class = "openTime" >
        {{getWeekDate}} {{getStartEndTime && getStartEndTime.editStartTime}}-{{getStartEndTime && getStartEndTime.editEndTime}}
      </section>
    </section>

    <section class = "location">
      <section class = "locLeft">    
        <img src="../../assets/icon_address.png" alt="loc.jpg" />
        <section class = "specLoc">    
          {{getAddress && getAddress.editAdress}}{{getAddress && getAddress.editDetailAdress}}
        </section> 
      </section> 
      <section class = "locRight">    
        <section class = "verticalLine"></section>
        <section class = "call">
          <img src="../../assets/icon_tel.png" alt="call.jpg" />
        </section>
      </section> 
    </section>

    <Activity :aVendor="aVendor"/>

  </div>

    <section class = "forALine2" ></section>  

    <section class = "nextBlock">

    <section class = "album" >店铺相册</section>

    <section class = "albumBar" >
      <img :src="item" alt="album.jpg" v-for="item in aVendor.imgs" :key="item.id"/>
    </section>


    <section class = "coupon">优惠信息</section>

    <!-- <section class = "couponInfo" style="text-align:center">
      <section class = "noCoupon" >暂无优惠信息</section>
    </section> -->

    <section class = "couponHaveInfo" >
      <section class = "aCoupon" >
        <section class = "left" >
          <section class = "priceBar" >
            <section class = "pricetag" >¥</section>
            <section class = "price" >9</section>
          </section>
          <section class = "date" >满60可用 有效期至2019.06.27</section>
        </section>                      
        <section class = "line" ></section>
        <section class = "right" >
          <section class = "word" >领取</section>
        </section>
      </section>
    </section>

    
  <!-- <section class = "commentTopBar">
        <section class = "comment">用户评论</section>
        <section class = "pic">
          <img src="../../assets/btn_edit.png" alt="more.jpg" />
        </section>
  </section>

  <section class = "hasComment" v-if="aComment.mapList && aComment.mapList.length !== 0">
    <section class = "customerBlock" v-for="item in aComment.mapList" :key="item.id">
      <section class = "customerBar">
        <img :src="item.userImg" alt="userImg.jpg" />
        <section class = "customer"> 
          <section class = "name">{{item.userName}}</section>
          <section class = "date">{{item.time}}</section>
        </section>
      </section>

      <section class = "specComment" >{{item.comment}}</section>

      <section class = "commentPic" v-if="item.imgs && item.imgs.length > 0" >
        <section class = "justForLoop" v-for="(item,index) in item.imgs" :key="index">
          <img :src="item" alt="commentPic.jpg" />
        </section>
      </section>

      <section class = "likesBar">
        <img src="../../assets/icon_likes.png" alt="likes.jpg" />
        <section class = "likesNum">{{item.praiseCount}}</section>
      </section>

      <section class = "replyBlock" v-if="item.reply && item.reply.length > 0">
        <section class = "top">
          <img src="../../assets/icon_reply.png" alt="reply.jpg" />
          <section class = "replyWord">商家回复</section>
        </section>
        <section class = "specReply" v-for="(item,index) in item.reply" :key="index">
          {{item}}
        </section>
      </section>
    </section>
  </section>

  <section class = "noComment" v-else>
      <section class = "bar">
        <img src="../../assets/icon_time.png" alt="write.jpg" />
        <section class = "noCommentWord">还没有评论，抢首评</section>
      </section>
    </section>
  </section> -->

  <Comment :aComment="aComment" />
  </section>

  </div>

</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import Comment from './components/comment.vue'
import Activity from './components/activity.vue'



export default {
  name: 'vendor',
  data () {
    return {
      value: '',
      id: this.$route.query.id,         //接受market里的goToShop的id
      follow: 'follow',
      activeClass: 'activeClass',
    }
  },
  components: {
    Comment,
    Activity,
  },
  computed:{
    ...mapState({
          aVendor: state => state.vendor.aVendor,
          aComment: state => state.vendor.aComment,
          // aCoupon: state => state.vendor.aCoupon,
        }),
    ...mapGetters('vendor', ['getStartEndTime', 'getAddress','getWeekDate'])
  },
  methods:{
  ...mapActions('vendor', ['getAVendor', 'getComment', 'getCoupon']), 
   
  // goToFold(){
  //   this.loadMore = !this.loadMore
  // },

    getNetwork(){
      this.getAVendor({
        id: parseInt(this.id)           //把id从string转成int
      }) // 调用Icon action, 触发icon接口请求
      this.getComment({
        id: parseInt(this.id),
        page: 1
      })
      // this.getCoupon({
      //   id: parseInt(this.id),
      // })



    }
  },

  created(){
    this.getNetwork()
  }
}
</script>

<style lang="scss" scoped>
// .downImg{                         //load动画
//   transform: rotate(0deg);
//   translate: 0.5s;
// }
// .upImg{                           //load动画
//   transform: rotate(180deg);
//   translate: 0.5s
// }
.topBlock{
  padding: 0px 20px;
}
.forALine{
  padding: 10px 0px;
  border-bottom:0.5px solid rgba(151,151,151,1);
}
.detail{
  // padding: 0px 20px;
}
.Vendor{
  display: flex;
  flex-direction: column;
  .topView{
    display: flex;
    align-items: center;
    justify-content:space-between;
      img{
        width:22px;
        height:22px;
      }
    .backWord{
      width:32px;
      height:22.5px;
      font-size:16px;
      color:rgba(152,156,168,1);
      line-height:22.5px;   
    }
      .topWord{
        width:72px;
        height:25px;
        font-size:18px;
        color:rgba(0,0,0,1);
        margin-left: 85px;
        margin-right: 105px;
      }
      img{
        width:19px;
        height:17.5px;
        background:rgba(51,51,51,1);
    }

    
  }

  .line1{
    margin-top: 10px;
    height:0.5px;
    background:rgba(234,235,237,1);
  }

  .shop{                                       //一个商家
      display: flex;
      width: 335px;
      justify-content: space-between;
      margin-top: 15px;
      .shopImg{                                 //商家图片
         width: 71px;
         height: 71px;
      }
      .VendorWord{                              //商家文字区域 
         display: flex;
         flex-direction: column;
         margin-left: 20px;
         padding-bottom: 20px;
         margin-top: 10px;
         .sName{                                //商家名字
            width: 245px;
            font-size:16px;
            margin-bottom: 10px;
         }
         .stickers{                             //商家介绍
            display: flex;
            justify-content: space-between;
            align-items: center; 
            .sticLeft{
              display: flex; 
              .sticker1Bar{
                display: flex;
                justify-content: center;
                align-items: center;
                height:16px;
                background:rgba(244,237,231,1);
                border-radius:2px;
                margin-right: 5px;
                .sticker1{                          //商家类别
                  font-size:10px;
                  color:rgba(175,133,103,1);
                  margin-left: 2px;
                  margin-right: 2px;
                }
              }
              .sticker2Bar{
                display: flex;
                justify-content: center;
                align-items: center;
                height:16px;
                background:rgba(223,52,39,0.1);
                border-radius:2px;
                .sticker2{                           
                  width:20px;
                  height:14px;
                  font-size:10px;
                  color:rgba(223,52,39,1);
                  margin-left: 2px;
                  margin-right: 2px;
                }
              }
            }
            .follow{
              width:55px;
              height:20px;
              border-radius:10px;
              border:0.5px solid rgba(220,220,220,1);
              font-size:10px;
              color:rgba(220,220,220,1);
              text-align: center;
              line-height: 20px;
            }
            .activeClass{
              border:1px solid rgba(223,52,39,1);
              color:rgba(223,52,39,1);
            }
         }  
      }
   }
  .introWord{
    width:56px;
    height:21px;
    font-size:14px;
    margin-bottom: 5px;
  }
  .introduction{
    width:335px;
    font-size:11px;
    color:rgba(102,102,102,1);
  }

  .time{
    display: flex;
    align-items: center;
    margin-top: 15px;
    margin-bottom: 15px;
    margin-left: 5px;
    img{
      width:15px;
      height:15px;
      margin-right: 10px;
    }
    .openTime{
      height:21px;
      font-size:14px;
      color:rgba(55,60,67,1);
    }
  }

  .location{
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 20px;
    margin-left: 5px;
    .locLeft{
      display: flex;
      align-items: center;
      img{
        width:15px;
        height:15px;
        margin-right: 10px;
      }
      .specLoc{
        height:21px;
        font-size:14px;
        color:rgba(55,60,67,1);
      }
    }
    .locRight{
      display: flex;
      .verticalLine{
        width:0.5px;
        height:20px;
        // background:rgba(220,220,220,1);
      }
      .call{
          width:20px;
          height:19.5px;
          margin-left: 10px;
        img{
          width:100%;
        }
      }
    }
  }
  

  .forALine2{
    border-bottom:0.5px solid rgba(151,151,151,1);
    padding:5px 0px;
  }
 
  .album{
    width:64px;
    height:21px;
    font-size:16px;
    color:rgba(55,60,67,1);
    margin-top: 15px;
    margin-bottom: 15px;
  }
  .nextBlock{
    padding: 0px 20px;
  }
  .albumBar{
    display: flex;
    margin-top: 10px;
    img{
      width:130px;
      height:97.5px;
      background:rgba(155,136,45,1);
      border-radius:5px;
      margin-right: 8px;
    }
  }
  .coupon{
    width:64px;
    height:21px;
    font-size:16px;
    color:rgba(55,60,67,1);
    margin-top: 10px;
  }
  .couponInfo{
    .noCoupon{
      font-size:14px;
      color:rgba(153,153,153,1);
    }
  }
  .couponHaveInfo{
    .aCoupon{
      display: flex;
      width:162.5px;
      height:80px;
      background:rgba(255,255,255,0.1);
      border-radius:3px;
      border:0.5px solid rgba(220,220,220,1);
      margin-top: 10px;
      margin-right: 10px;
      .left{
        display: flex;
        flex-direction: column;
        width: 107px;
        .priceBar{
          display: flex;
          align-items: flex-end;
          .pricetag{
            width:6px;
            height:10px;
            font-size:10px;
            font-family:PingFangSC-Regular;
            color:rgba(223,52,39,1);
            margin-left: 8px;
          }
          .price{
            width:14.5px;
            height:24px;
            font-size:24px;
            color:rgba(223,52,39,1);
            font-family:PingFangSC-Semibold;
            margin-top: 8px;
          }
        }
        .date{
          width:91px;
          height:28px;
          font-size:10px;
          color:rgba(223,52,39,1);
          margin-top: 8px;
          margin-left: 8px;

        }
      }
      .line{
        width:0.5px;
        height:80px;
        border:0.5px solid rgba(220,220,220,1);
      }
      .right{
        display: flex;
        justify-content:center;
        width:55px;
        .word{
          width:24px;
          height:16.5px;
          font-size:12px;
          color:rgba(223,52,39,1);
          margin-top: 32px;
        }
      }
    }
  }


}
</style>