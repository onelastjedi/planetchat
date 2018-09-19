<template>
  <header :class="$style.header">
    <div :class="$style.row">
      <router-link
        :to="{ path: '/' }"
        :class="$style.logo"
      >
        <img src="@/shared/assets/logo.svg" />
        <h1>Planet<span>Chat</span></h1>
      </router-link>
      <div :class="$style.controls">
        <styled-button @click="showWeatherPopup" type="transparent-icon">Weather<i class="icon-weather" /></styled-button>
        <styled-button @click="goSettings" type="transparent-icon">Settings<i class="icon-settings" /></styled-button>
        <styled-button @click="signOut" type="transparent-icon">Sign out<i class="icon-signout" /></styled-button>
      </div>
    </div>
  </header>
</template>

<script>
/**
 * @file Holds app's header
 * @since 0.1.0
 * @author Anton Komarenko <mi3ta@sent.as>
 */
import { logout } from "@/shared/utils/auth";

export default {
  components: {
    /**
     * Resolves components asynchronously
     * @see {@link https://vuejs.org/v2/guide/components-dynamic-async.html|Async Components}
     */
    StyledButton: () => import("@/shared/components/StyledButton")
  },
  methods: {
    /* Performs '/settings' redirect */
    goSettings() {
      this.$router.push({ path: "/settings" });
    },

    /* Performs signout */
    signOut() {
      logout();
    },

    /* Opens weather popup */
    showWeatherPopup() {
      this.$store.commit("SET_POPUPS_VISIBILITY", [{ Weather: true }]);
    }
  }
};
</script>

<style module lang="stylus">
  .header
    position relative
    width 100%
    min-width 740px
    height 80px
    background linear-gradient(0deg, #5997dc 0%, #56b9d6 100%)
    line-height 80px

    .row
      width 80%
      margin 0 auto
      display grid
      grid-template-columns 1fr auto

      @media (max-width: 960px)
        width 100%
        padding 0 15px

    .logo
      position relative
      color white
      display grid
      grid-template-columns 65px 1fr
      align-items center

      img
        width 50px

      h1
        font-size 28px
        font-weight bold

        span
          color #8AC9E4

    .controls
      position relative
      display grid
      grid-template-columns auto auto auto
      grid-gap 10px
      align-items center
</style>
