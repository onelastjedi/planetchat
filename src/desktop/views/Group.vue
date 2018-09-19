<template>
  <section>
    <div :class="$style.panel">
        <app-header />
        <div :class="$style.panelBody">
          <chat-groups-wrapper />
          <chat-messages-wrapper v-if="currentGroup" :group="currentGroup" />
        </div>
    </div>
  </section>
</template>

<script>
/**
 * @file Holds group/chats screen
 * @since 0.1.0
 * @author Anton Komarenko <mi3ta@sent.as>
 */
export default {
  components: {
    /**
     * Resolves components asynchronously
     * @see {@link https://vuejs.org/v2/guide/components-dynamic-async.html|Async Components}
     */
    AppHeader: () => import("@/desktop/components/AppHeader"),
    ChatGroupsWrapper: () =>
      import("@/desktop/components/groups/ChatGroupsWrapper"),
    ChatMessagesWrapper: () =>
      import("@/desktop/components/messages/ChatMessagesWrapper")
  },
  computed: {
    currentGroup() {
      return this.$store.getters.getGroupById(+this.$route.params.id);
    }
  }
};
</script>

<style module lang="stylus" src="@/shared/styles/common/chat.styl" />
