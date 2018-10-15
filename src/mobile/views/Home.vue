<template>
  <component v-bind:is="currentComponent" />
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
    currentComponent() {
      if (this.$route.path === "/") return "chat-groups-wrapper";
      return "chat-messages-wrapper";
    }
  }
};
</script>
