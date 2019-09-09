<template>
  <BaseView class="Introduction">

    <section class = "shop" >
      <img class = "shopImg" :src="aVendor.shopImg" alt="shopImg.jpg" />      <!-- 商家图片 -->
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
      <img src="../../../assets/icon_time.png" alt="clock.jpg" />
      <section class = "openTime" >
        {{getWeekDate}} {{getStartEndTime && getStartEndTime.editStartTime}}-{{getStartEndTime && getStartEndTime.editEndTime}}
      </section>
    </section>

    <section class = "location">
      <section class = "locLeft">    
        <img src="../../../assets/icon_address.png" alt="loc.jpg" />
        <section class = "specLoc">    
          {{getAddress && getAddress.editAdress}}{{getAddress && getAddress.editDetailAdress}}
        </section> 
      </section> 
      <section class = "locRight">    
        <section class = "verticalLine"></section>
        <section class = "call">
          <img src="../../../assets/icon_tel.png" alt="call.jpg" />
        </section>
      </section> 
    </section>

  </BaseView>
</template>

<script>

export default {
  name: 'Introduction',
  components: {
  },
  data(){
    return{ 
      follow: 'follow',
      activeClass: 'activeClass',
    }
  },
  props: {
    aVendor:{
      type: Object
    },
    getWeekDate:{
      type: String
    },
    getStartEndTime:{
      type: String
    },
    getAddress:{
      type: String
    },
  },
  computed: {

  },
  watch: {

  },
  methods: {

  },
  created() {

  },
}
</script>

<style scoped lang="less" >
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
</style>
