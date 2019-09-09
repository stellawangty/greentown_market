<template>
  <div class="Comment">
  
  <section class = "commentTopBar">
        <section class = "comment">用户评论</section>
        <section class = "pic">
          <img src="../../../assets/btn_edit.png" alt="more.jpg" />
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
        <img src="../../../assets/icon_likes.png" alt="likes.jpg" />
        <section class = "likesNum">{{item.praiseCount}}</section>
      </section>

      <section class = "replyBlock" v-if="item.reply && item.reply.length > 0">
        <section class = "top">
          <img src="../../../assets/icon_reply.png" alt="reply.jpg" />
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
        <img src="../../../assets/icon_time.png" alt="write.jpg" />
        <section class = "noCommentWord">还没有评论，抢首评</section>
      </section>
  </section>
  </div>
</template>

<script>
export default {
  name: 'Comment',
  components: {
  },
  props: {
    aComment:{
      type: Object
    }
  },
  data(){
    return{ 

    }
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
.commentTopBar{
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-top: 20px;
    .comment{
      width:64px;
      height:21px;
      font-size:16px;
      color:rgba(55,60,67,1);
    }
    .pic{
      img{
      width:35px;
      height:35px;
      background:rgba(255,255,255,1);
      border:0.5px solid rgba(152,156,168,1);
      }
    }
  }

  .customerBlock{
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    padding: 0px 0px 20px 0px;
    border-bottom: 1px solid #cecece;
    // margin-left: 20px;
    .customerBar{
      display: flex;
      img{
        width:40px;
        height:40px;
        border:0.5px solid rgba(151,151,151,1);
      }
      .customer{
        margin-left: 5px;
        .name{
          height:20px;
          font-size:14px;
          font-family:PingFangSC-Regular;
          color:rgba(51,51,51,1);
          margin-bottom: 3px;
        }
        .date{
          height:16.5px;
          font-size:12px;
          font-family:PingFangSC-Regular;
          color:rgba(153,153,153,1);
        }
      }
    }
    .specComment{
      width:285px;
      font-size:14px;
      font-family:PingFangSC-Regular;
      color:rgba(51,51,51,1);
      margin-left: 45px;
      margin-top: 10px;
    }
    .commentPic{
      display: flex;
      flex-wrap: wrap;
      margin-left: 45px;
      margin-top: 10px;
      img{
        width:95px;
        height:95.5px;
        margin-right: 3px;
      }
    }
    .likesBar{
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 0px 0px 0px 20px;
      img{
        width:15px;
        height:18px;
      }
      .likesNum{
        width:12px;
        height:14px;
        font-size:12px;
        font-family:PingFangSC-Regular;
        color:rgba(153,153,153,1);    
        margin-left: 5px;  
      }
    }
    .replyBlock{
      display: flex;
      flex-direction: column;
      background:rgba(243,243,243,1);
      margin-left: 45px;
      margin-top: 15px;
      padding: 5px;
      .top{
        display: flex;
        align-items: center;
        margin-left: 5px;
        img{
          width:12px;
          height:11.5px;
        }
        .replyWord{
          width:48px;
          height:16.5px;
          font-size:12px;
          font-family:PingFangSC-Semibold;
          color:rgba(51,51,51,1);
          margin-left: 5px;
        }
      }
      .specReply{
          width:246px;
          font-size:12px;
          font-family:PingFangSC-Regular;
          color:rgba(51,51,51,1);
          margin-left: 5px;
          margin-top: 5px;
      }
    }
  }
  .noComment{
    display: flex;
    justify-content: center;
    margin-top: 10px;  
    margin-bottom: 40px; 
    .bar{
      display: flex;
      justify-content: center;
      align-items: center;
      width:210px;
      height:44px;
      background:rgba(255,255,255,1);
      border-radius:2px;
      border:0.5px solid rgba(153,153,153,1);
      img{
        width:15px;
        height:15px;
      }
      .noCommentWord{
        width:126px;
        height:20px;
        font-size:14px;
        color:rgba(55,60,67,1);
        margin-left: 5px;
      }
    }
  }


</style>
