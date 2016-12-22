<template>
  <div class="shopcart-warpper">
  <div class="shopcart">
    <div class="content" @click="toggleList">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight':totalCount>0}">
            <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
          </div>
          <div class="num" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'highlight':totalCount>0}">¥ {{totalPrice}}</div>
        <div class="desc">另需配送费¥ {{deliveryPrice}}元</div>
      </div>
      <div class="content-right" @click.stop.prevent="pay">
        <div class="pay" :class="payClass">{{payDesc}}</div>
      </div>

    </div>
    <div class="ball-container">
    <transition
      name="drop"
      @before-enter="drop_beforeEnter"
      @enter="drop_enter"
      @afterEnter="drop_afterEnter" v-for="(ball,index) in balls" key="index">
      <div class="ball"  v-show="ball.show">
        <div class="inner inner-hook"></div>
      </div>
    </transition>
    </div>
    <transition name="fold">
    <div class="showcart-list" v-show="listShow">
      <div class="list-header">
        <h1 class="titles">购物车</h1>
        <span class="empty" @click="empty">清空</span>
      </div>
      <div class="list-content" ref="listContent">
        <ul>
          <li class="food" v-for="food in selectFoods">
            <span class="name">{{food.name}}</span>
            <div class="price">
              <span>¥ {{food.price*food.count}}</span>
            </div>
            <div class="cartcontrol-wrapper">
              <cartcontrol :food="food"></cartcontrol>
            </div>
          </li>
        </ul>
      </div>
    </div>
    </transition>
  </div>
  <transition name="fade">
  <div class="list-mask" v-show="listShow" @click="toggleList"></div>
  </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import cartcontrol from 'components/cartcontrol/cartcontrol';
  import BScroll from 'better-scroll';
  export default {
    props: ['deliveryPrice', 'minPrice', 'selectFoods'],
    data() {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBall: [],
        fold: true
      };
    },
    computed: {
      totalPrice() {
         let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count;
        });
        return total;
      },
      totalCount() {
        let count = 0;
        this.selectFoods.forEach((food) => {
           count += food.count;
        });
        return count;
      },
      payDesc() {
        if (this.totalPrice === 0) {
          return '¥' + this.minPrice + '元起送';
        } else if (this.totalPrice < this.minPrice) {
         let diff = this.minPrice - this.totalPrice;
          return '还差 ¥ ' + diff + '元起送';
        } else {
          return '去结算';
        }
      },
      payClass() {
        if (this.totalPrice < this.minPrice) {
          return 'not-enough';
        } else {
          return 'enough';
        }
      },
      listShow() {
          if (!this.totalCount) {
            this.fold = true;
            return false;
          }
        let show = !this.fold;
        if (show) {
          this.$nextTick(function() {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent,{
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
        }
          return show;
      }
    },
    methods: {
      drop(el) {
        for (let i=0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBall.push(ball);
            return;
          }
        }
      },
      drop_beforeEnter(el) {
          let count = this.balls.length;
           while (count--) {
             let ball = this.balls[count];
             if (ball.show) {
               // 获得元素相当于屏幕的位置
               let rect = ball.el.getBoundingClientRect();
               let x = rect.left - 32;
               let y = -(window.innerHeight - rect.top -22);
               el.style.display = '';
               el.style.webkitTransform = `translate3D(0,${y}px,0)`;
               el.style.transform = `translate3D(0,${y}px,0)`;
               let inner = el.getElementsByClassName('inner-hook')[0];
               inner.style.webkitTransform = `translate3D(${x}px,0,0)`;
               inner.style.transform = `translate3D(${x}px,0,0)`;
               console.log('drop_beforeEnter');
              }
           }
      },
      drop_enter(el) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight; // 触发浏览器重新绘制
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3D(0,0,0)';
          el.style.transform = 'translate3D(0,0,0)';

          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = 'translate3D(0,0,0)';
          inner.style.transform = 'translate3D(0,0,0)';

          console.log('drop_enter');
        });
      },
      drop_afterEnter(el) {
        // dropBall重置  shift()删除第一个数组元素并返回这个元素
        let ball = this.dropBall.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
          console.log('drop_afterEnter');
        }
      },
      toggleList() {
        if (!this.totalCount) {
          return;
        }
        this.fold = !this.fold;
      },
      empty() {
        this.selectFoods.forEach(function(food) {
          food.count = 0;
        });
      },
      pay() {
             if (this.totalPrice < this.minPrice) {
               return;
             }
      }
    },
    components: {
      cartcontrol
    }
   };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/style/minxin.styl";

  .shopcart
     position fixed
     left 0
     bottom 0
     z-index 50
     width 100%
     height 48px
     background #000
     .content
       display flex
       background #141d27
       font-size 0
       .content-left
         flex 1
         .logo-wrapper
           display inline-block
           position relative
           top -10px
           margin 0 12px
           padding 6px
           width 56px
           height 56px
           box-sizing: border-box
           -webkit-box-sizing: border-box
           -moz-box-sizing: border-box
           vertical-align top
           border-radius 50%
           background #141d27
           .logo
             width 100%
             height 100%
             border-radius 50%
             background #2b343c
             text-align center
             &.highlight
                background rgb(0,160,220)
             .icon-shopping_cart
                line-height 44px
                font-size 24px
                color #88858a
                &.highlight
                  color white
           .num
             position absolute
             top 0
             right 0
             width 24px
             height 16px
             line-height 16px
             text-align center
             border-radius 16px
             font-size 9px
             font-weight 700px
             color white
             background rgb(240,20,20)
             box-shadow 0 4px 8px 0 rgb(0,0,0,.4)
         .price
           display inline-block
           vertical-align top
           margin-top 12px
           line-height 24px
           padding-right 12px
           box-sizing border-box
           border-right 1px solid rgba(255,255,255,0.1)
           font-size 16px
           font-weight 700
           color rgba(255,255,255,.4)
           &.highlight
             color #fff
         .desc
           display inline-block
           vertical-align top
           line-height 24px
           margin  12px 0 0 12px
           font-size 10px
           font-weight 700
           color rgba(255,255,255,.4)
       .content-right
         flex 0 0 105px
         width 105px
         .pay
           height 48px
           line-height 48px
           text-align center
           font-size 12px
           color rgba(255,255,255,.4)
           font-weight 700
           &.not-enough
             background #2b333b
           &.enough
             background #00b43c
             color white
     .ball-container
       .ball
         position fixed
         left 32px
         bottom 22px
         z-index: 200
         &.drop-enter-active, &.drop-leave-active
           transition all 0.4s cubic-bezier(.49, -0.29, .75, .41)
           transform translate3D(0,0,0)
         .inner
             width 16px
             height 16px
             border-radius 50%
             background rgb(0,160,220)
             transition all .4s linear;
     .showcart-list
       position absolute
       bottom 100%
       left 0
       z-index -1
       width 100%

       &.fold-enter-active, &.fold-leave-active
           transition all .5s ease
           transform translate3D(0, 0, 0)
       &.fold-enter, &.fold-leave-active
           transform translate3D(0, 100%, 0)
       .list-header
         height 40px
         line-height 40px
         padding 0 18px
         background #f3f5f7
         border-bottom 1px solid rgba(7,17,27,.1)
         .titles
           float left
           font-size 14px
           color rgb(7,17,27)
         .empty
           float right
           font-size 12px
           color rgb(0,160,220)

       .list-content
         padding 0 18px
         max-height 217px
         background #fff
         overflow hidden
         .food
           position relative
           padding 12px 0
           box-sizing border-box
           border-1px(rgba(7,17,27,0.1))
           .name
              line-height 24px
              font-size 14px
              color rgb(7,17,27)
           .price
              position absolute
              right 90px
              bottom 12px
              line-height 24px
              font-size 14px
              font-weight 700
              color rgb(240,20,20)
           .cartcontrol-wrapper
              position absolute
              right 0
              bottom 6px
  .list-mask
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    z-index 40
    background: rgba(7,17,27,.6);
    opacity 1
    -webkit-backdrop-filter blur(10px)

    &.fade-enter-active,&.fade-leave-active
      transition: all .5s ease;
    &.fade-enter,&.fade-leave-active
      opacity 0
</style>
