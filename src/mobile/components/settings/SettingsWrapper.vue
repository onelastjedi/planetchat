<template>
  <div :class="$style.settings">
    <div :class="$style.header">
      <h3>Settings</h3>
    </div>
    <div :class="$style.content" :style="{height: wrapperHeight + 'px'}">
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
        Privacy & Location Sharing
        <i class="icon-right-arrow" />
      </router-link>
      <router-link
        :to="{ path: '/settings/app' }"
        :class="$style.app"
      >
        <span><i class="icon-weather-clear-day" /></span>
        App Settings
        <i class="icon-right-arrow" />
      </router-link>
      <router-link
        :to="{ path: '/settings/satellite' }"
        :class="$style.satellite"
      >
        <span><i class="icon-satellite" /></span>
        Satellite Settings
        <i class="icon-right-arrow" />
      </router-link>
      <router-link
        :to="{ path: '/settings/about' }"
        :class="$style.about"
      >
        <span><i class="icon-info" /></span>
        About
        <i class="icon-right-arrow" />
      </router-link>
      <router-link
        :to="{ path: '/settings/privacy' }"
        :class="$style.privacy"
      >
        <span><i class="icon-privacy-policy" /></span>
        Privacy Policy
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
  </div>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },

    wrapperHeight() {
      return window.innerHeight > 568
        ? window.innerHeight - 140
        : window.innerHeight - 100;
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

    .header
      height 70px
      text-align center
      width 100%
      position fixed
      z-index 1000
      top 0
      background-color #EBF1F5
      font-weight 700
      font-size 20px
      display grid
      grid-template-columns 1fr
      grid-column-gap 15px

      @media (max-height: 568px)
        height 50px

      div
        display grid
        align-items center

      h3
        align-self center
        color #2a2d31
        font-weight 700
        font-size 20px

        @media (max-height: 568px)
          font-size 18px

      i
        margin 0 auto
        color #5997dc
        font-size 24px
        line-height 70px

        @media (max-height: 568px)
          font-size 18px
          line-height 50px

    .content
      // height calc(100vh - 190px)
      // display grid
      // grid-gap 10px
      // grid-template-rows 70px 70px 70px auto
      margin 50px 0 50px
      overflow scroll
      -webkit-overflow-scrolling touch
      // height 570px

      // @media (max-height: 568px)
      //   height calc(100vh - 130px)

      .logout
        align-self end

        i[class^="icon-right-arrow"]
          color #E8455F
          background linear-gradient(0deg, #E8455F 0%, #E74B3D 100%)
          -webkit-background-clip text
          -webkit-text-fill-color transparent

        span
          background #e7465f

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
        margin 10px 0
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

    .privacy span
      background #4eccb3

    .app span
      background #efa471

    .satellite span
      background #6953ac

    .privacy span
      background #57AFD7

    .about span
      background #9dc446
</style>
