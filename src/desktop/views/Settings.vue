<template>
  <section>
    <div :class="$style.panelBody">
      <settings-wrapper />
      <info-wrapper />
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
    InfoWrapper: () => import("@/desktop/components/settings/InfoWrapper")
  }
};
</script>

<style module lang="stylus" src="@/shared/styles/common/chat.styl" />
