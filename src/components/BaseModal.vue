/*
  components: CardModal
  show: 是否显示modal
 */
<template>
  <transition name="modal-fade">
    <div class="modal-backdrop" v-show="isShow" @touchmove.prevent>
      <div class="modal"> 
        <!-- <div class="modal-header"> 
          <slot name="header"></slot> 
        </div>  -->
        <div class="modal-body"> 
          <slot name="body">
          </slot> 
        </div> 
        <!-- <div class="modal-footer"> 
          <slot name="footer"></slot> 
        </div>  -->
      </div>
        <div class="closeView">
          <img src='./assets/close.png' class="closeImg" @click="onCloseModal()"/>
        </div> 
    </div>
  </transition>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'

export default {
  name: 'cardModal',
  props: {
    show: {
      type: Boolean
    },
  },
  components: {
    
  },
  data (){
    return {
      isShow: this.show,
    }
  },
  computed: {
    
  },
  watch: {
      show(val) {
          this.isShow = val;//②监听外部对props属性show的变更，并同步到组件内的data属性isShow中
      },
    },
  methods: {
    onCloseModal(){
      this.$emit('onCloseModal', false);
    }
  },
  created () {
    console.log('show', this.show)
  },
}
</script>
<style scoped lang="scss">
.modal-fade-enter, .modal-fade-leave-active {
    opacity: 0;
}

.modal-fade-enter-active, .modal-fade-leave-active {
    transition: opacity .5s ease
}
.modal-backdrop { 
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0; 
  background-color: #FF4C3A; 
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center; 
  z-index: 1001;
} 
.modal { 
  overflow-x:auto; 
  display: flex; 
  flex-direction: column; 
  width: 300px;
} 
.modal-header, .modal-footer { 
  padding: 15px; 
  display: flex; 
} 
.modal-header { 
  border-bottom: 1px solid #eee; 
  color: #4aae9b; 
  justify-content: space-between; 
} 
.modal-footer { 
  border-top: 1px solid #eee; 
  justify-content: flex-end; 
} 
.modal-body { 
  position: relative; 
  padding: 20px 10px; 
  overflow-y: scroll;
   -webkit-overflow-scrolling: touch;
}
.closeView{
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.closeImg{
  width: 30px;
  height: 30px;
}
</style>