<template>
  <section>
    <div :class="$style.panelBody">
      <settings-wrapper />
      <component v-bind:is="currentComponent"></component>
    </div>
  </section>
</template>

<script>
/**
 * @file Holds settings screen
 * @since 0.1.0
 * @author Anton Komarenko <mi3ta@sent.as>
 */
export default {
  components: {
    /**
     * Resolves components asynchronously
     * @see {@link https://vuejs.org/v2/guide/components-dynamic-async.html|Async Components}
     */
    SettingsWrapper: () =>
      import("@/desktop/components/settings/SettingsWrapper"),
    InfoWrapper: () => import("@/desktop/components/settings/InfoWrapper"),
    PrivacyWrapper: () =>
      import("@/desktop/components/settings/PrivacyWrapper"),
    DetailsWrapper: () => import("@/desktop/components/settings/DetailsWrapper")
  },
  computed: {
    currentComponent() {
      switch (this.$route.path) {
        case "/settings":
          return "info-wrapper";
        case "/settings/privacy":
          return "privacy-wrapper";
        case "/settings/details":
          return "details-wrapper";
      }
    }
  }
};
</script>

<style module lang="stylus" src="@/shared/styles/common/chat.styl" />
