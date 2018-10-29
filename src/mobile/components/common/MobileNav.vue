<template>
  <nav :class="$style.nav">
    <template v-for="(link, index) in links">
      <router-link
        :to="{path: link.to}"
        :key="`links-${index}`"
        :exact-active-class="$style['active-link']"
      >
        <i :class="link.icon" />
      </router-link>
    </template>
  </nav>
</template>

<script>
/**
 * @file Holds mobile navigation
 * @since 0.1.0
 * @author Anton Komarenko <mi3ta@sent.as>
 */
export default {
  data: () => ({
    /* Provides data for router-link */
    links: [
      { to: "/", icon: "icon-chat" },
      { to: "/location", icon: "icon-compass" },
      { to: "/weather", icon: "icon-weather" },
      { to: "/settings", icon: "icon-settings" }
    ]
  })
};
</script>

<style module lang="stylus">
  .nav
    position fixed
    bottom 0
    width 100%
    height 80px
    background white
    height 80px
    display grid
    grid-template-columns auto auto auto auto
    text-align center
    box-shadow 0 -8px 15px rgba(0,0,0,.1)

    @media (max-height: 568px)
      height 50px

    .active-link
      color #5997dc

    a
      display grid
      align-items center
      color #93A5BB

    i
      align-content center
      font-size 32px

      @media (max-height: 568px)
        font-size 22px
</style>
