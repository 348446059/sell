<template>
   <div class="ratingselect">
     <div class="rating-type border-1px">
       <span @click="select(2, $event)"  class="block positive" :class="{'active':selectType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
       <span @click="select(0, $event)"  class="block positive" :class="{'active':selectType===0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
       <span @click="select(1, $event)"  class="block negative" :class="{'active': selectType===1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>

     </div>
     <div @click="toggleContent(onlyContent,$event)" class="switch" :class="{'on':onlyContent}">
       <span class="icon-check_circle"></span>
       <span class="text">只看有内容的评价</span>
     </div>
   </div>
</template>

<script type="text/ecmascript-6">
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;
  export default {
    props: {
      ratings: {
        type: Array,
        default() {
          return [];
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default() {
          return {all: '全部', positive: '满意', negative: '不满意'};
        }
      }
    },
    computed: {
      positives() {
      return this.ratings.filter(function (rating) {
          return rating.rateType === POSITIVE;
        });
      },
      negatives() {
      return this.ratings.filter(function (rating) {
          return rating.rateType === NEGATIVE;
        });
      }
    },
    methods: {
      select(type,event) {
        if (!event._constructed) {
          return;
        }
        // $memit触发当前实例上的事件。附加参数都会传给监听器回调。
        this.$parent.$emit('custom', type);
      },
      toggleContent(onlyContent,event) {
        if (!event._constructed) {
          return;
        }
        this.$parent.$emit('content.toggle',!this.onlyContent);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/style/minxin.styl";
   .ratingselect
     .rating-type
        padding 18px 0
        margin 0 18px
        font-size 0
        border-1px(rgba(7,17,27,.1))
        .block
          display inline-block
          padding 8px 12px
          font-size 12px
          margin-right 8px
          line-height 16px
          border-radius 1px
          color rgb(77,85,93)
          &.active
            color white
          .count
             margin-left 2px
             font-size 8px
          &.positive
             background rgba(0,160,220,0.2)
             &.active
               background rgb(0,160,220)
          &.negative
             background rgba(77,85,93,0.2)
             &.active
               background rgb(77,85,93)
     .switch
      padding 12px 18px
      line-height 24px
      border-bottom 1px solid rgba(7,17,27,.1)
      color rgb(147,153,159)
      font-size 0
      &.on
        .icon-check_circle
          color #00c850
      .icon-check_circle
         display inline-block
         vertical-align top
         margin-right 4px
         font-size 24px
      .text
         display inline-block
         vertical-align top
         font-size 12px


</style>
