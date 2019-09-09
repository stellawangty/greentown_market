<template>
<div class = "Search" :style="{height: clientHeight + 'px'}"> <!-- 页面大小 = 用户页面大小 -->
    
    <!-- 第一区：搜索商家 + 取消 -->
    <div class = "searchView">   
      <section class = "search">
        <form action="/">
            <van-search v-model="value" placeholder="搜索商家"
            @search="onSearch" />   <!-- 搜索商家 --> <!-- onSearch -->
        </form>
      </section>
      <section class = "cancel" @click = "goToCancel">取消</section>  <!-- 取消 --> <!-- goToCancel -->
    </div>

    <!-- 第二区：“历史搜索” + 删除图片 -->
    <div class = "bannerView">
        <section class = "history">历史搜索</section>   <!-- “历史搜索” -->
        <section class = "delete">
            <img src="@/assets/icon_delete.png" alt="delete.jpg" /> <!-- 删除图片 -->
        </section>
    </div>

    <!-- 第三区：用户搜索记录 -->
    <div class = "iconView" v-if="dataList && dataList.length > 0">
        <section class = "yourHistory" v-for="item in dataList" :key="item">
            {{item}}</section>    <!-- 一条记录（带循环） -->
    </div>
</div>
</template>

<script>
export default {
  name: 'search',
  data () {
    return {
      value: '',
      clientHeight: document.documentElement.clientHeight,
      dataList: []        //用户搜索记录
    }
  },
  methods: {
    goToCancel () {                         //回到market来执行cancel
      this.$emit('cancel')
    },
    printData () {                    
      const aData = localStorage.getItem('yourSearch')    //读取localStorage里数据
      if (aData) {
        this.dataList = aData.split(',')    //通过逗号来分割
      }
    },
    onSearch () {
      this.$emit('onSearch', this.value)    //回到market来执行onSearch
      const history = localStorage.getItem('yourSearch')
      if (history) {
        const listString = this.filterArray(this.dataList, this.value)
        localStorage.setItem('yourSearch', listString)
      } else {
        localStorage.setItem('yourSearch', this.value)    //第一次搜索时走这条
      }
      this.printData()
    },
    filterArray (list, value) {     //function: 搜索记录显示限制
      if (list.length > 10) {       //超过十条记录：删掉最老一条
        list.pop()
      }
      const index = list.indexOf(value)   //判断value是否已经在list里
      if (index > -1) {
        list.splice(index, 1)             //若是：删掉这条
      }
      list.unshift(value)                 //在开头加上最新这条value
      return list.join(',')          //返回一个逗号拼接的字符串
    },
  },
  created () {              //最开始执行：读取localStorage里数据
    this.printData()
  }
}
</script>

<style lang="scss" scoped>
.Search{
   display: flex;
   flex-direction: column;
}
.searchView{                           //第一区：搜索商家 + 取消
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
    margin-top: 20px;
    .search{                      //搜索商家
        flex: 1;
        width: 297.5px;
        height: 30px;
        background:rgba(243,243,243,1);
        border-radius:15px;
    }
    .cancel{                        //取消
         width: 28px;
         height: 20px;
         font-size: 14px;
         margin-left: 15px;
      }
}

.bannerView{                             //第二区：“历史搜索” + 删除图片
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    .history{                       //“历史搜索”
        width: 56px;
        height: 21px;
        font-size: 14px;
        color: rgba(51,51,51,1);
    }
    .delete{                        //删除图片
        display: flex;
        width: 15px;
        height: 15px;
        img{
        width: 100%;
        }
    }
}
.iconView{                                //第三区：用户搜索记录
    display: flex;
    flex-wrap: wrap;
    .yourHistory{                       //一条记录
        height: 26px;
        background:#f3f3f3;
        border-radius:27px;
        padding: 3px 8px;
        margin-right: 8px;
        margin-bottom: 8px;
    }
}
</style>

<style lang="scss">
.search{                                  //手动改搜索框样式
   .van-search{
      padding: 0 !important
   }
   .van-search__content{
      border-radius: 50px !important;     //搜索框圆角
   }
}
</style>
