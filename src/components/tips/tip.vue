<template>
  <div class="title">
    <div class="line"></div>
    <div class="text">{{content}}</div>
    <div class="line"></div>
  </div>
</template>

<script type="text/ecmascript-6">
 export default {
   props: ['content']
 };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .title
    display flex
    width 80%
    margin 28px auto 24px auto
    .line
      flex 1
      position relative
      top -6px
      border-bottom 1px solid rgba(255,255,255,.2)
    .text
      padding 0 12px
      font-size 14px
      font-weight 700
</style>
