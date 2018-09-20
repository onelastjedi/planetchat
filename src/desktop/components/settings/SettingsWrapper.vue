<template>
  <div :class="$style.wrapper">
    <div :class="$style.header">Settings</div>
    <div :class="$style.content">
      <router-link
        :to="{path: '/settings/details'}"
        :class="$style.item"
        :exact-active-class="$style['active-link']"
      >
        <img :src="
          currentUser.pid ?
          currentUser.pid :
          '/img/mocks/inbox_avatar_default.png'
        "/>
        User Details
        <i class="icon-right-arrow" />
      </router-link>
      <router-link
        :to="{path: '/settings/privacy'}"
        :class="$style.item"
        :exact-active-class="$style['active-link']"
      >
        <i class="icon-pass" />
        Privacy
        <i class="icon-right-arrow" />
      </router-link>
      <router-link
        :to="{path: '/settings'}"
        :class="$style.item"
        :exact-active-class="$style['active-link']"
      >
        <i class="icon-info" />
        Info
        <i class="icon-right-arrow" />
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    }
  }
};
</script>

<style module lang="stylus">
  .wrapper
    position relative

  .header
    position relative
    background white
    border-top-left-radius 15px
    border-top-right-radius 15px
    padding 17px 15px
    height 50px
    color #2a2d31
    font-weight 700
    border-bottom 1px solid rgba(147, 165, 186, 0.4)

    @media (max-width: 960px)
      border-radius 0

  .content
    background-color white
    border-bottom-left-radius 15px
    border-bottom-right-radius 15px
    overflow hidden

    @media (max-width: 960px)
      border-radius 0

  .item.active-link
    background-color #f3f7f9

  .item
    position relative
    display grid
    grid-template-columns 15px 1fr auto
    grid-gap 10px
    align-items center
    padding 10px 15px
    color #2a2d31

    img
      width 100%
      border-radius 40%
      overflow hidden

    i
      color #57abd8

    i[class^="icon-right-arrow"]
      font-size 10px

    i[class^="icon-info"]
      font-size 14px
</style>
