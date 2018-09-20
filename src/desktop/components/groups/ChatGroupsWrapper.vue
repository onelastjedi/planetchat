<template>
  <div :class="$style.chatGroups" v-if="groups">
    <chat-groups-header />
    <chat-groups-search @search="handleSearchString" />
    <div :class="$style.chatGroupsWrapper">
      <chat-groups-item
        v-for="(group, index) in searched(groups, searchString)"
        :key="`contacts-${index}`"
        :last-message-id="group.mmx"
        :unread-messages-count="group.new"
        :group-id="group.gid"
      />
    </div>
  </div>
</template>

<script>
export default {
  components: {
    ChatGroupsHeader: () =>
      import("@/desktop/components/groups/ChatGroupsHeader"),
    ChatGroupsSearch: () =>
      import("@/desktop/components/groups/ChatGroupsSearch"),
    ChatGroupsItem: () => import("@/desktop/components/groups/ChatGroupsItem")
  },
  props: {
    groups: {
      type: Array,
      default: null
    }
  },
  data: () => ({
    searchString: ""
  }),
  methods: {
    handleSearchString(event) {
      this.searchString = event;
    },
    searched(groups, searchString) {
      return this.$_.orderBy(
        groups,
        ["messages", "messages.0.sd"],
        ["desc", "desc"]
      ).filter(
        group =>
          group.name && searchString
            ? group.name.toLowerCase().includes(searchString.toLowerCase())
            : group
      );
    }
  }
};
</script>

<style module lang="stylus">
  .chatGroups
    position relative
    display grid
    grid-template-rows 50px 60px auto
    height calc(100vh - 100px)

    @media (max-width: 960px)
      height calc(100vh - 80px)

    .chatGroupsWrapper
      overflow auto
      align-items baseline
      background white
</style>
