<template>
   <div class="cartcontrol">
     <transition name="move">
     <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decrease">
       <span class="inner icon-remove_circle_outline"></span>
     </div>
     </transition>
     <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
     <div class="cart-add icon-add_circle" @click.stop.prevent="addcart"></div>

   </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  export default {
    props: ['food'],
    methods: {
      addcart(event) {
        if (!event._constructed) {
          return;
        }
        if (!this.food.count) {
          // 动态给food增加count属性
          Vue.set(this.food,'count',1);
          this.food.count = 1;
        } else {
          this.food.count++;
        }
        // 派发事件 参数为DOM对象
        this.$parent.$emit('cart-add',event.target);
      },
      decrease(event) {
        if (!event._constructed) {
          return;
        }
        this.food.count--;
      }
    }

  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size 0
    .cart-decrease
       display inline-block
       padding 6px
       &.move-enter-active, &.move-leave-active
         transition all .4s linear
         transform translate3D(0,0,0)
         .inner
             transition all .3s linear
             transform rotate(0deg)
       &.move-enter, &.move-leave-active
         transform translate3D(24px,0,0)
         opacity 0
         .inner
           transition all 0.4s linear
           transform rotate(180deg)
       .inner
         display inline-block
         line-height 24px
         font-size 24px
         color rgb(0,160,220)
    .cart-count
       display inline-block
       vertical-align top
       width 12px
       padding-top 6px
       line-height 24px
       text-align center
       font-size 10px
       color rgb(147,153,159)
    .cart-add
       display inline-block
       padding 6px
       line-height 24px
       font-size 24px
       color rgb(0,160,220)

</style>
