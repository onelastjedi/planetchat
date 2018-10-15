<template>
  <component v-bind:is="currentComponent" v-bind="currentProps" />
</template>

<script>
export default {
  components: {
    /**
     * Resolves components asynchronously
     * @see {@link https://vuejs.org/v2/guide/components-dynamic-async.html|Async Components}
     */
    ChatGroupsWrapper: () =>
      import("@/mobile/components/groups/ChatGroupsWrapper"),
    ChatMessagesWrapper: () =>
      import("@/mobile/components/messages/ChatMessagesWrapper")
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
      if (this.$route.path === "/") return "chat-groups-wrapper";
      return "chat-messages-wrapper";
    }
  }
};
</script>
