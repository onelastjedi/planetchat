<template>
  <button :class="[type, { isMobile: isMobile }]" @click="handleClick"><slot /></button>
</template>

<script>
/**
 * @file Holds button component
 * @since 0.1.0
 * @author Anton Komarenko <mi3ta@sent.as>
 */
export default {
  props: {
    /* Button style type */
    type: {
      type: String,
      default: "filled-blue"
    },

    isMobile: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    /* Emits click event to parent */
    handleClick() {
      this.$emit("click");
    }
  }
};
</script>

<style scoped lang="stylus">
  button
    border none
    display block
    border-radius 15px
    width 100%
    height 45px
    text-transform uppercase
    font-weight 700

    &:disabled
      background #ebf1f5
      color #93a5ba
      cursor not-allowed

  .isMobile
    height 65px!important
    border-radius 25px!important
    font-size 19px!important

  .filled-white
    background white
    color #578FC0

  .filled-white-sm
    border 2px solid white
    background transparent
    color #94A5BD
    font-size 12px
    padding 10px 20px
    height auto

  .gradient-red
    background linear-gradient(0deg, #e74c3c 0%, #e74560 100%)
    color white
    font-size 14px

  .filled-white-red
    background white
    color #d83a46
    font-size 14px
    border 1px solid #d4dbe3

  .transparent
    border 2px solid white
    background transparent
    color white

  .transparent-icon
    color white
    text-transform uppercase
    background transparent
    padding 10px 20px
    border 1px solid white
    border-radius 20px
    font-size 14px

    i
      padding-left 5px

  .filled-blue
    background linear-gradient(0deg, #5997dc 0%, #56b9d6 100%)
    border-radius 15px
    font-size 14px
    color white

    &:disabled
      border 1px solid #d4dbe3

  .filled-blue-sm
    background linear-gradient(0deg, #5997dc 0%, #56b9d6 100%)
    border-radius 20px
    font-size 12px
    padding 12px 20px
    color white
    height auto

  .bordered-red-sm
    background transparent
    font-size 12px
    border 2px solid #EE6557
    padding 10px 20px
    height auto
    border-radius 20px

  .bordered-blue-sm
    background transparent
    font-size 12px
    border 2px solid #69A1E4
    padding 10px 20px
    height auto
    border-radius 20px

</style>
