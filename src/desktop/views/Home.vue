<template>
  <section>
    <div :class="$style.panelBody">
      <chat-groups-wrapper />
      <component v-bind:is="currentComponent" v-bind="currentProps"></component>
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
      import("@/desktop/components/messages/ChatMessagesEmpty"),
    ChatMessagesWrapper: () =>
      import("@/desktop/components/messages/ChatMessagesWrapper")
  },
  computed: {
    groupId() {
      return +this.$route.params.id;
    },

    group() {
      return this.$store.getters.getGroupById(this.groupId);
    },

    currentProps() {
      if (this.currentComponent === "chat-messages-wrapper")
        return { group: this.group };
    },

    currentComponent() {
      if (!this.groupId) return "chat-messages-empty";
      return "chat-messages-wrapper";
    }
  },
  updated() {
    if (this.groupId && this.group) {
      if (this.group.mmx && !this.group.synced) {
        this.$store.commit("UPDATE_GROUP", { gid: this.groupId, synced: true });
        this.$socket.emit("getBefore", {
          count: 20,
          group_id: this.groupId,
          message_id: 4294967295
        });
      }
    }
  },
  mounted() {
    this.$store.dispatch("init");
  }
};
</script>

<style module lang="stylus" src="@/shared/styles/common/chat.styl" />
