<template>
  <div :class="$style.settings">
    <div :class="$style.header">Settings</div>
    <div :class="$style.content">
      <router-link
        :to="{ path: '/settings/details' }"
        :class="$style.details"
      >
        <img
          v-if="currentUser"
          :src="
          currentUser.pid
          ? currentUser.pid
          : '/img/mocks/inbox_avatar_default.png'
        "/>
        <img v-else src='/img/mocks/inbox_avatar_default.png' />
        User Details
        <i class="icon-right-arrow" />
      </router-link>
      <router-link
        :to="{ path: '/settings/privacy' }"
        :class="$style.privacy"
      >
        <span><i class="icon-pass" /></span>
        Privacy
        <i class="icon-right-arrow" />
      </router-link>
      <router-link
        :to="{ path: '/settings/info' }"
        :class="$style.about"
      >
        <span><i class="icon-info" /></span>
        About
        <i class="icon-right-arrow" />
      </router-link>
      <a
        :class="$style.logout"
        @click.stop.prevent="signOut"
      >
        <span><i class="icon-signout" /></span>
        Logout
        <i class="icon-right-arrow" />
      </a>
    </div>
    <mobile-nav />
  </div>
</template>

<script>
export default {
  components: {
    MobileNav: () => import("@/mobile/components/common/MobileNav")
  },
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    }
  },
  methods: {
    signOut() {
      this.$lib.logout();
    }
  }
};
</script>

<style module lang="stylus">
  .settings
    position relative

    .content
      height calc(100vh - 190px)
      display grid
      grid-gap 10px
      grid-template-rows 70px 70px 70px auto
      padding 0 15px

      a
        display grid
        grid-gap 15px
        grid-template-columns 50px 1fr auto
        align-items center
        height 70px
        border-radius 15px
        background white
        padding-right 15px
        padding-left 10px
        color #111
        font-weight bold
        font-size 18px

        img
          width 100%
          border-radius 40%
          overflow hidden

        span
          display block
          height 50px
          border-radius 40%
          display grid
          align-items center
          text-align center

          i
            color white

        i[class^="icon-right-arrow"]
          color #56b9d6
          background linear-gradient(0deg, #5997dc 0%, #56b9d6 100%)
          -webkit-background-clip text
          -webkit-text-fill-color transparent

    .privacy span, .about span
      background linear-gradient(0deg, #5997dc 0%, #56b9d6 100%)

    .logout
      align-self end

      i[class^="icon-right-arrow"]
        color #E8455F
        background linear-gradient(0deg, #E8455F 0%, #E74B3D 100%)
        -webkit-background-clip text
        -webkit-text-fill-color transparent

      span
        background linear-gradient(0deg, #E8455F 0%, #E74B3D 100%)

  .header
    height 70px
    padding-top 25px
    text-align center
    background-color #f5f7fa
    font-weight 700
    font-size 20px
</style>
