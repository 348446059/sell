<template>
 <div class="ratings" ref="ratings">
   <div class="ratings-content">
     <div class="overview">
       <div class="overview-left">
         <h1 class="score">{{seller.score}}</h1>
         <div class="titles">综合评分</div>
         <div class="rank">高于周边商家{{seller.rankRate}}%</div>
       </div>
       <div class="overview-right">
         <div class="score-wrapper">
           <span class="titles">服务态度</span>
           <star :size="36" :score="seller.serviceScore"></star>
           <span class="score">{{seller.serviceScore}}</span>
         </div>
         <div class="score-wrapper">
           <span class="titles">商品评分</span>
           <star :size="36" :score="seller.foodScore"></star>
           <span class="score">{{seller.foodScore}}</span>
         </div>
         <div class="delivery-wrapper">
           <span class="titles">送达时间</span>
           <span class="delivery">{{seller.deliveryTime}}分钟</span>
         </div>
       </div>
     </div>
     <split></split>
     <ratingselect :selectType="selectType" :onlyContent="onlyContent" :ratings="ratings"></ratingselect>
     <div class="rating-wrapper">
       <ul>
         <li v-for="rating in ratings" v-show="needShow(rating.rateType,rating.text)" class="rating-item">
           <div class="avatar">
             <img width="28" height="28" :src="rating.avatar">
           </div>
           <div class="content">
             <h1 class="name">{{rating.username}}</h1>
             <div class="star-wrapper">
               <star :size="24" :score="rating.score"></star>
               <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
             </div>
             <p class="text">{{rating.text}}</p>
             <div class="recommend" v-show="rating.recommend && rating.recommend.length">
               <span class="icon-thumb_up"></span>
               <span class="item" v-for="item in rating.recommend">{{item}}</span>
             </div>
             <div class="time">
               {{rating.rateTime | formatData }}
             </div>
           </div>
         </li>
       </ul>
     </div>
   </div>
 </div>
</template>

<script type="text/ecmascript-6">
   import BScroll from 'better-scroll';
   import star from 'components/star/star';
   import ratingselect from 'components/ratingselect/ratingselect';
   import split from 'components/split/split.vue';
   import {formatDate} from 'common/js/data';
   const ERR_OK = 0;
   const POSITIVE = 0;
   const NEGATIVE = 1;
   const ALL = 2;
    export default {
      props: {
        seller: {
          type: Object
        }
      },
      created() {
        this.selectType = ALL;
        this.$http.get('/api/ratings').then(function(res) {
          res = res.body;
          if (res.errno === ERR_OK) {
            this.ratings = res.data;
            this.$nextTick(function() {
              this.scroll = new BScroll(this.$refs.ratings,{
                click: true
              });
            });
          }
        });
        this.$on('custom',function(type) {
          this.selectType = type;
          this.$nextTick(function() {
            this.scroll.refresh();
          });
        });
        this.$on('content.toggle',function(onlyContent) {
            this.onlyContent = onlyContent;
          this.$nextTick(function() {
            this.scroll.refresh();
          });
        });
      },
      data() {
         return {
           ratings: [],
           selectType: ALL,
           onlyContent: true
         };
      },
      methods: {
        needShow(type,text) {
          if (this.onlyContent && !text) {
            return false;
          }
          if (this.selectType === ALL) {
            return true;
          } else {
            return type === this.selectType;
          }
        }
      },
      filters: {
        // 格式化时间戳
        formatData(time) {
          let date = new Date(time);
          // 模块化编程
          return formatDate(date,'yyyy-MM-dd hh:mm');
        }
      },
      components:{
        star,split,ratingselect
      }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/style/minxin.styl";
  .ratings
     position absolute
     top 174px
     bottom 0
     width 100%
     left 0
     overflow hidden
     .overview
       display flex
       padding 18px 0
       .overview-left
         flex 0 0 130
         width 130px
         padding 6px 0
         border-right 1px solid rgba(7,17,27,.1)
         text-align center
         @media only screen and (max-width 320px)
          flex 0 0 120px
          width 120px
         .score
           margin-bottom 6px
           line-height 28px
           font-size 24px
           color rgb(255,153,0)
         .titles
           margin-bottom  8px
           line-height 12px
           font-size 12px
           color rgb(7,17,27)
         .rank
            line-height 10px
            font-size 10px
            color rgb(147,153,159)
       .overview-right
         flex 1
         padding 6px 0 6px 24px
         @media only screen and (max-width 320px)
           padding-left 6px
         .score-wrapper
          margin-bottom 8px
          font-size 0
          .titles
            line-height 18px
            display inline-block
            vertical-align top
            font-size 12px
            color rgb(7,17,27)
          .star
            display inline-block
            margin 0 12px
            vertical-align top
          .score
            display inline-block
            vertical-align top
            font-size 12px
            line-height 18px
            color rgb(255,153,0)
       .delivery-wrapper
           font-size 0
         .titles
           line-height 18px
           font-size 12px
           color rgb(7,17,27)
         .delivery
           margin-left 12px
           font-size 12px
           color rgb(147,153,159)
     .rating-wrapper
        padding 0 18px
        .rating-item
          padding 18px 0
          display flex
          border-1px(rgb(7,17,27,.1))
          .avatar
             flex 0 0 28px
             margin-right 12px
             img
               border-radius 50%
          .content
             position relative
             flex 1
             .name
               margin-bottom 4px
               line-height 12px
               font-size 10px
               color rgb(7,17,27)
             .star-wrapper
                margin-bottom 6px
                font-size 0
                .star
                   display inline-block
                   vertical-align top
                   margin-right 6px
                .delivery
                   display inline-block
                   vertical-align top
                   font-size 10px
                   color rgb(147,153,159)
             .text
               margin-bottom 8px
               line-height 18px
               color rgb(7,17,27)
               font-size 12px
             .recommend
                 line-height 16px
                 font-size 0
                 .icon-thumb_up,.item
                    display inline-block
                    margin 0 8px 4px 0
                    font-size 9px
                 .icon-thumb_up
                    color rgb(0,160,220)
                 .item
                    padding 0 6px
                    border 1px solid rgba(7,17,27,.1)
                    border-radius 1px
                    color rgb(147,153,159)
                    background white
             .time
               position absolute
               top 0
               right 0
               line-height 12px
               font-size 10px
               color rgb(147,153,159)
</style>
