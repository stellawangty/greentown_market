<template>
  <div class="Activity">
     <section class = "activity">
      <section class = "leftBar" >
        <div v-if="loadMore">
          <section class = "actWord" v-for="item in aVendor.activityList" :key="item.id">
            <section class = "wordBar" >
              <section class = "word" align=center>活动</section>
            </section>
            <section class = "specAct" >{{item.activityName}}</section>
          </section>
        </div>
        <div v-else>
          <section class = "actWord">
            <section class = "wordBar" >
              <section class = "word" align=center>活动</section>
            </section>
            <section class = "specAct" >{{aVendor.activityList && aVendor.activityList[0].activityName}}</section>
          </section>
        </div>
      </section>
      <section class = "actNum" align=right @click = "goToFold" v-if=" aVendor.activityList && aVendor.activityList.length">
        <section class = "actnum">{{aVendor.activityList && aVendor.activityList.length}}个活动</section>
        <img src="../../../assets/icon_fold.png" alt="more.jpg" :class="[!loadMore ? downImg : upImg]"/>
      </section>
    </section>

  </div>
</template>

<script>
export default {
  name: 'Activity',
  components: {
  },
  data(){
    return{ 
      loadMore: false,
      upImg: 'upImg',
      downImg:  'downImg',
    }
  },
  props: {
    aVendor:{
      type: Object
    }
  },
  computed: {

  },
  watch: {

  },
  methods: {
  goToFold(){
      this.loadMore = !this.loadMore
    },
  },
  created() {

  },
}
</script>

<style scoped lang="less" >
.downImg{                         //load动画
  transform: rotate(0deg);
  translate: 0.5s;
}
.upImg{                           //load动画
  transform: rotate(180deg);
  translate: 0.5s
}
.activity{
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    margin-bottom: 10px;
    align-items: flex-start;
    .leftBar{
      display: flex;
      flex-direction: column;
      .actWord{
        display: flex;
        align-items: center;
        margin-top: 10px;
        .wordBar{
          display: flex;
          align-items: center;
          width:26px;
          height:16px;
          background:rgba(223,52,39,0.1);
          border-radius:2px;
          margin-right: 5px;
          .word{
            width:20px;
            height:14px;
            font-size:10px;
            color:rgba(223,52,39,1);
            margin-left: 3px;
          }
        }
        .specAct{
          height:21px;
          font-size:14px;
          color:rgba(55,60,67,1);
        }
      }
    }
    .actNum{
      display: flex;
      align-items: center;
      margin-top: 10px;
      .actnum{
        width:36px;
        height:14px;
        font-size:10px;
        color:rgba(153,153,153,1);
      }
      img{
        width:6px;
        height:4px;
        margin-left: 5px;
      }
    }
  }
</style>
