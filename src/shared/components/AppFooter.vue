<template>
  <footer :class="$style.footer">
    &copy; PlanetChat {{ currentYear }}.&nbsp;&nbsp;<a href="/">View our Data Policy and Terms</a>
  </footer>
</template>

<script>
/**
 * @file Holds app's footer
 * @since 0.1.0
 * @author Anton Komarenko <mi3ta@sent.as>
 */
export default {
  data: () => ({
    /* Returns current year */
    currentYear: new Date().getFullYear()
  })
};
</script>

<style module lang="stylus">
  .footer
    position relative
    padding 20px 0
    text-align center
    color #2A2E31
    background white

    a
      border-bottom 1px solid #578fc057
</style>
