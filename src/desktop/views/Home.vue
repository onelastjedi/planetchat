<template>
  <section>
    <div :class="$style.panel">
      <app-header />
      <!-- <div :class="$style.panelBody">
        <chat-groups-wrapper />
        <chat-messages-empty />
      </div> -->
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
    AppHeader: () => import("@/desktop/components/AppHeader"),
    // ChatGroupsWrapper: () => import("@/components/groups/ChatGroupsWrapper"),
    // ChatMessagesEmpty: () => import("@/components/messages/ChatMessagesEmpty"),
  }
};
</script>

<style module lang="stylus" src="@/shared/styles/common/chat.styl" />
