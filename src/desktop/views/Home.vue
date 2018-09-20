<template>
  <section>
    <div :class="$style.panelBody">
      <chat-groups-wrapper :groups="groups"/>
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
      import("@/desktop/components/messages/ChatMessagesWrapper"),
    NewChat: () => import("@/desktop/components/messages/NewChat")
  },
  watch: {
    "groups.length"(val, oldVal) {
      /* Group deleted */
      if (val < oldVal) this.$router.push("/");

      /* Group added */
      if (val - oldVal === 1) this.$router.push(`/groups/${this.lastGroupId}`);
    }
  },
  computed: {
    groupId() {
      return +this.$route.params.id;
    },

    groups() {
      return this.$store.state.groups;
    },

    lastGroupId() {
      return this.groups[this.groups.length - 1].gid;
    },

    group() {
      return this.$store.getters.getGroupById(this.groupId);
    },

    currentProps() {
      if (this.currentComponent === "chat-messages-wrapper")
        return { group: this.group };
    },

    currentComponent() {
      if (this.$route.path === "/") return "chat-messages-empty";
      if (this.$route.path === "/create") return "new-chat";
      return "chat-messages-wrapper";
    }
  },
  updated() {
    if (this.groupId && this.group) {
      if (this.group.mmx && !this.group.synced) {
        this.$store.commit("SET_LOADING_STATE", true);
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
