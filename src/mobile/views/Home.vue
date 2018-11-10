<template>
  <div>
    <component v-bind:is="currentComponent" v-bind="currentProps" />
    <mobile-nav v-if="isNav"/>
  </div>
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
      import("@/mobile/components/messages/ChatMessagesWrapper"),
    SettingsWrapper: () =>
      import("@/mobile/components/settings/SettingsWrapper"),
    MobileNav: () => import("@/mobile/components/common/MobileNav")
  },
  computed: {
    isNav() {
      return this.$route.meta.isNav;
    },

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
      if (this.$route.path === "/settings") return "settings-wrapper";
      return "chat-messages-wrapper";
    }
  }
};
</script>
