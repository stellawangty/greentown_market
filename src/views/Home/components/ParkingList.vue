<template>
  <ul>
    <li v-for="(item) in items" :key="item.parkno">
      <section class="parking-view">
        <div class="parking-map">
          <div class="p-m-text">
            <span class="p-m-t-parkingName">{{item.parkname}}<span class="p-m-t-distance">{{item.distance !== '0.0' ? `${item.distance}km` : null}}</span></span>
            <span class="p-m-t-name">{{item.parkaddress}}</span>
          </div>
          <div class="p-m-go" @click="goToMap(item.longitude, item.latitude, item.parkname, item.parkaddress)">
            <img class="p-m-g-img" src="./assets/icon_navigation.png" />
            <span class="p-m-g-text">导航</span>
          </div>
        </div>
        <div class="parking-info">
          <van-image
            width="3.75rem"
            height="3.75rem"
            lazy-load
            :src="item.parkimageurl"
          >
          <template v-slot:error>
            <van-icon name="photo-o" size="2rem"/>
          </template>
          </van-image>
          <section class="p-i-left">
            <div class="p-i-l-view">
              <span class="p-i-l-v-text">剩余空位<span class="p-i-l-v-num">{{item.freelot}}</span></span>
              <span class="p-i-l-v-text">停车计费<span class="p-i-l-v-num">{{item.unitprice}}<span class="p-i-l-v-n-text">元/小时</span></span></span>
            </div>
            <div class="p-i-l-statusView">
              <span v-for="item in item.tags" :key="item" class="text">{{item}}</span>
            </div>
          </section>
        </div>
      </section>
      <section class="parking-status" v-if="item.validstatus === '1'">
        <span @click="cancelOrder(item.id)" class="p-s-order">取消预约</span>
        <span class="p-s-time">{{item.endtime}}前入场</span>
      </section>
      <section class="parking-status" v-else-if="item.validstatus === '3'">
        <span class="p-s-in">已入场</span>
      </section>
      <section class="parking-status" v-else>
        <span @click="order(item.parkno)" class="p-s-order">立即预约</span>
      </section>
    </li>
  </ul>
</template>

<script>

export default {
  props: {
    items: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    }
  },
  components: {

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
    // 导航
    goToMap (longitude, latitude, name, address) {
      this.$emit('goToMap', longitude, latitude, name, address)
    },
    // 取消预约
    cancelOrder (id) {
      this.$emit('cancelOrder', id)
    },
    // 预约
    order (parkNo) {
      this.$emit('order', parkNo)
    }
  },
  created () {

  }
}
</script>

<style scoped lang="less" >
li{
  border: 1px solid #F3F3F3;
  box-shadow: 0 1px 5px 0 rgba(126,135,150,0.30);
  border-radius: 5px;
  margin: 0px 20px 20px 20px;
  padding: 16px 10px 0px 15px;
}
li:first-child{
  margin-top: 10px;
}
.parking-view{
  display: flex;
  flex-direction: column;
  .parking-map{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .p-m-text{
      display: flex;
      flex-direction: column;
      flex: 1;
      .p-m-t-parkingName{
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #333333;
        .p-m-t-distance{
          font-family: PingFangSC-Regular;
          font-size: 11px;
          color: #999999;
          margin-left: 10px;
        }
      }
      .p-m-t-name{
        font-family: PingFangSC-Regular;
        font-size: 11px;
        color: #333333;
      }
    }
    .p-m-go{
      display: flex;
      align-items: center;
      .p-m-g-img{
        width: 13px;
        height: 13px;
      }
      .p-m-g-text{
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #DF3427;
        margin-left: 3px;
      }
    }
  }
  .parking-info{
    display: flex;
    // justify-content: space-between;
    align-items: center;
    margin-top: 17px;
    margin-bottom: 8px;
    .p-i-left{
      display: flex;
      flex-direction: column;
      margin-left: 20px;
      .p-i-l-view{
        display: flex;
        .p-i-l-v-text{
          display: flex;
          flex-direction: column;
          opacity: 0.8;
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #666666;
          .p-i-l-v-num{
            display: flex;
            align-items: flex-end;
            opacity: 0.8;
            font-family: DINAlternate-Bold;
            font-size: 24px;
            color: #000000;
            .p-i-l-v-n-text{
              font-family: PingFangSC-Semibold;
              font-size: 12px;
              margin-left: 3px;
            }
          }
        }
        .p-i-l-v-text:last-child{
          margin-left: 22px;
        }
      }
      .p-i-l-statusView{
        display: flex;
        .text{
          padding: 2px 5px;
          background:rgba(223,52,39,0.1);
          border-radius: 2.5px;
          font-family: PingFangSC-Regular;
          font-size: 10px;
          color: #DF3427;
          margin: 5px 0px 0px 0px;
        }
        .text:last-child{
          margin: 5px 0px 0px 6px;
        }
      }
    }
    .p-i-imgs{
      width: 60px;
      height: 60px;
    }
  }

}
.parking-status{
  display: flex;
  height: 42px;
  align-items: center;
  border-top: 1px solid rgba(204, 204, 204, 0.3);
  .p-s-order{
    font-family: PingFangSC-Semibold;
    font-size: 13px;
    color: #4984F2;
    border: 1px solid #4984F2;
    border-radius: 13px;
    padding: 4px 11px;
  }
  .p-s-time{
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #999999;
    padding: 4px 11px;
  }
  .p-s-in{
    font-family: PingFangSC-Regular;
    font-size: 13px;
    color: #F56361;
    border: 1px solid #F56361;
    border-radius: 13px;
    padding: 4px 11px;
  }
}
</style>
