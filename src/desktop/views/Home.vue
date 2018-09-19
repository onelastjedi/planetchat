<template>
  <section>
    <div :class="$style.panelBody">
      <chat-groups-wrapper />
      <chat-messages-empty />
    </div>
  </section>
</template>

<script>
/**
 * @file Holds main chat window
 * @since 0.1.0
 * @author Anton Komarenko <mi3ta@sent.as>
 */
export default {
  components: {
    /**
     * Resolves components asynchronously
     * @see {@link https://vuejs.org/v2/guide/components-dynamic-async.html|Async Components}
     */
    ChatGroupsWrapper: () =>
      import("@/desktop/components/groups/ChatGroupsWrapper"),
    ChatMessagesEmpty: () =>
      import("@/desktop/components/messages/ChatMessagesEmpty")
  },
  mounted() {
    this.$store.dispatch("init");
  }
};
</script>

<style module lang="stylus" src="@/shared/styles/common/chat.styl" />
